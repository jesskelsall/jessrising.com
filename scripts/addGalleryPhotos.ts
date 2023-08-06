/* eslint-disable security/detect-non-literal-fs-filename,no-restricted-syntax,no-await-in-loop */

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  checkbox as inquirerCheckbox,
  input as inquirerInput,
} from "@inquirer/prompts";
import ExifReader from "exifreader";
import fs from "fs";
import { convert } from "imagemagick";
import { cloneDeep } from "lodash/fp";
import path from "path";
import util from "util";
import { DIR_CONTENT, S3_BUCKET_NAME } from "../src/consts/app";
import { cameras } from "../src/data/cameras";
import { allTags } from "../src/data/tags";
import { parsePhoto, parsePhotoFileName } from "../src/functions/photo";
import { GalleryPhotoData } from "../src/types/galleryPhoto";
import { Location } from "../src/types/location";
import { Tag, TagId } from "../src/types/tag";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);
const writeFile = util.promisify(fs.writeFile);

const s3Client = new S3Client({ region: "eu-west-2" });

interface ImageSize {
  maxDimension?: number;
  suffix: string;
}

const GALLERY_PHOTO_OVERWRITE = true; // Allows reupload to S3 without touching MD file
const GALLERY_IMAGE_SIZES: ImageSize[] = [
  {
    maxDimension: 500,
    suffix: "-sm",
  },
  {
    maxDimension: 1200,
    suffix: "-lg",
  },
  {
    suffix: "-og",
  },
];

const DRY_RUN = false;

const fileFromPath = (filePath: string): string =>
  filePath.split("/").slice(-1)[0];

// Create a resized version of the given image
const resizeImage = (
  inputPath: string,
  outputPath: string,
  maxWidth?: number
) =>
  new Promise((resolve, reject) => {
    const args = [
      inputPath,
      ...(maxWidth ? ["-resize", maxWidth] : []),
      outputPath,
    ];

    convert(args, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });

// Check if a file already exists
const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    const fileStats = await stat(filePath);
    return Boolean(fileStats);
  } catch {
    return false;
  }
};

// Write a file to the S3 bucket. Returns whether it was successful
const writeFileToBucket = async (
  file: Buffer,
  fileName: string
): Promise<boolean> => {
  try {
    const command = new PutObjectCommand({
      Key: fileName,
      Bucket: S3_BUCKET_NAME,
      Body: file,
    });
    const response = await s3Client.send(command);
    return response.$metadata.httpStatusCode === 200;
  } catch (error) {
    return false;
  }
};

// Ask CLI questions about the photo and modify the gallery photo data
const enrichGalleryPhoto = async (
  data: GalleryPhotoData,
  previousData?: GalleryPhotoData
) => {
  const updatedData: GalleryPhotoData = cloneDeep(data);

  // GPS coordinates

  const coordsFromString = (coords: string): number[] =>
    coords.split(",").map((part) => parseFloat(part));
  const coordsString = await inquirerInput({
    message: "GPS Coordinates",
    validate: (input: string) => {
      if (!input) return true;
      const coords = coordsFromString(input);
      return (
        (coords.length === 2 &&
          coords.every((coord) => !Number.isNaN(coord))) ||
        "Invalid coordinate string."
      );
    },
  });
  if (coordsString) {
    const coords = coordsFromString(coordsString);
    updatedData.meta.gps = { lat: coords[0], long: coords[1] };
  }

  // Location

  const locationString = await inquirerInput({
    message: "Location",
    default: previousData?.meta.location || undefined,
    validate: (input: string) => Boolean(input) || "Location is required.",
  });
  updatedData.meta.location = Location.parse(locationString);

  // Tags

  const tagDefaults: TagId[] = previousData?.meta.tags.includes(
    TagId.parse("New")
  )
    ? previousData.meta.tags
    : [TagId.parse("Landscape")];
  const selectedTags = await inquirerCheckbox({
    message: "Tags",
    choices: allTags
      .sort((a, b) => {
        const priority = ["Landscape", "New"];
        const prefixPriority = (tag: Tag) =>
          (priority.includes(tag.id) ? priority.indexOf(tag.id) : "") + tag.id;
        const aString = prefixPriority(a);
        const bString = prefixPriority(b);

        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
      })
      .map((tag) => ({
        value: tag.id,
        checked: tagDefaults.includes(tag.id),
      })),
  });
  updatedData.meta.tags = selectedTags;
  if (selectedTags.includes(TagId.parse("New"))) {
    updatedData.settings = { downloadOriginal: true };
  }

  return updatedData;
};

// Add the given photo to the gallery
const addGalleryPhoto = async (
  directory: string,
  fileName: string,
  previousGalleryPhoto?: GalleryPhotoData
): Promise<GalleryPhotoData | undefined> => {
  console.info(`\n\x1b[33m${fileName}\x1b[0m`);

  const { slug: photoSlug, title } = parsePhotoFileName(fileName);

  // Check if this photo name has already been used

  const jsonFilePath = path.resolve(DIR_CONTENT, "photos", `${photoSlug}.json`);

  const jsonAlreadyExists = await fileExists(jsonFilePath);
  if (!DRY_RUN && jsonAlreadyExists && !GALLERY_PHOTO_OVERWRITE) {
    console.warn("[Gallery]", "Photo already exists", photoSlug);
    return undefined;
  }

  // Extract EXIF data from file

  const filePath = path.join(directory, fileName);
  const fileBuffer = await readFile(filePath);
  const exif = await ExifReader.load(fileBuffer);

  // Write gallery photo data file

  let galleryPhotoData: GalleryPhotoData | undefined;

  if (DRY_RUN || !jsonAlreadyExists) {
    const parsedData = parsePhoto({ cameras, title, exif });
    galleryPhotoData = await enrichGalleryPhoto(
      parsedData,
      previousGalleryPhoto
    );
    const json = JSON.stringify(galleryPhotoData, null, 2);

    if (DRY_RUN) {
      console.info(json);
    } else {
      await writeFile(jsonFilePath, json);
      console.info("[Gallery]", "Wrote", fileFromPath(jsonFilePath));
    }
  }

  // Render photo at different sizes

  if (!DRY_RUN) {
    const images = GALLERY_IMAGE_SIZES.slice(
      0,
      galleryPhotoData?.meta.tags.includes(TagId.parse("New")) ? undefined : -1
    ).map(({ maxDimension, suffix }) => ({
      fileName: `${photoSlug}${suffix}.jpeg`,
      maxDimension,
    }));

    for (const image of images) {
      const resizedFilePath = path.resolve(directory, image.fileName);

      try {
        await resizeImage(
          path.resolve(directory, fileName),
          resizedFilePath,
          image.maxDimension
        );
      } catch {
        console.warn(
          "[Gallery]",
          "Failed to render a resized image",
          photoSlug
        );
        return undefined;
      }

      // Write photo to AWS S3 bucket

      const imageBuffer = await readFile(resizedFilePath);
      const writeSuccess = await writeFileToBucket(imageBuffer, image.fileName);
      if (writeSuccess) {
        console.info("[Gallery]", "Uploaded", fileFromPath(image.fileName));
      } else {
        console.warn(
          "[Gallery]",
          "Failed to write file to S3 bucket",
          image.fileName
        );
        return undefined;
      }

      // Delete the rendered image

      try {
        await unlink(resizedFilePath);
      } catch {
        console.warn(
          "[Gallery]",
          "Failed to delete resized image",
          image.fileName
        );
        return undefined;
      }
    }
  }

  // Delete the original photo

  if (!DRY_RUN) {
    try {
      await unlink(filePath);
      console.info("[Gallery]", "Deleted", fileFromPath(filePath));
    } catch {
      console.warn(
        "[Gallery]",
        "Failed to delete photo file",
        fileFromPath(filePath)
      );
    }
  }

  return galleryPhotoData;
};

const addBlogPhoto = async (
  directory: string,
  photoName: string
): Promise<void> => {
  const photoSlug = photoName.replace(".jpeg", "");

  const filePath = path.join(directory, photoName);
  const fileBuffer = await readFile(filePath);

  // Write photo to AWS S3 bucket

  const writeSuccess = await writeFileToBucket(fileBuffer, `${photoSlug}.jpeg`);
  if (!writeSuccess) {
    console.warn("Failed to write file to S3 bucket", photoSlug);
  }

  // Delete the original photo

  try {
    await unlink(filePath);
  } catch {
    console.warn("Failed to delete photo file", photoSlug);
    return;
  }

  console.info("Success (blog)", photoSlug);
};

// Add all new photos, whether they are for the gallery or not
const addAllPhotos = async (): Promise<void> => {
  console.info("DRY_RUN", DRY_RUN);

  const newPhotosDirectory = path.resolve(__dirname, "newPhotos");

  const getFiles = async (directory: string): Promise<[string, string[]]> => {
    const directoryPath = path.join(newPhotosDirectory, directory);
    const directoryFiles = await readdir(directoryPath);
    const photoFiles = directoryFiles.filter((file) => file.endsWith(".jpeg"));

    return [directoryPath, photoFiles];
  };

  // Blog

  const [blogDir, blogFiles] = await getFiles("blog");
  for (const blogFile of blogFiles) {
    await addBlogPhoto(blogDir, blogFile);
  }

  // Gallery

  const [photoDir, photoFiles] = await getFiles("gallery");
  let lastData: GalleryPhotoData | undefined;
  for (const photoFile of photoFiles) {
    lastData = await addGalleryPhoto(photoDir, photoFile, lastData);
  }
};

addAllPhotos();
