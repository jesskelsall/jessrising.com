/* eslint-disable security/detect-non-literal-fs-filename,no-restricted-syntax,no-await-in-loop */

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import ExifReader from "exifreader";
import fs from "fs";
import { convert } from "imagemagick";
import path from "path";
import util from "util";
import { DIR_CONTENT, S3_BUCKET_NAME } from "../src/consts/app";
import { cameras } from "../src/data/cameras";
import { parsePhoto, parsePhotoFileName } from "../src/functions/photo";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const stat = util.promisify(fs.stat);
const unlink = util.promisify(fs.unlink);
const writeFile = util.promisify(fs.writeFile);

const s3Client = new S3Client({ region: "eu-west-2" });

interface ImageSize {
  maxDimension: number;
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
];

const DRY_RUN = false;

// Create a resized version of the given image
const resizeImage = (inputPath: string, outputPath: string, maxWidth: number) =>
  new Promise((resolve, reject) => {
    const args = [inputPath, "-resize", maxWidth, outputPath];

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

// Add the given photo to the gallery
const addGalleryPhoto = async (
  directory: string,
  fileName: string
): Promise<void> => {
  const { slug: photoSlug, title } = parsePhotoFileName(fileName);

  // Check if this photo name has already been used

  const jsonFilePath = path.resolve(DIR_CONTENT, "photos", `${photoSlug}.json`);

  const jsonAlreadyExists = await fileExists(jsonFilePath);
  if (!DRY_RUN && jsonAlreadyExists && !GALLERY_PHOTO_OVERWRITE) {
    console.warn("Photo already exists", photoSlug);
    return;
  }

  // Extract EXIF data from file

  const filePath = path.join(directory, fileName);
  const fileBuffer = await readFile(filePath);
  const exif = await ExifReader.load(fileBuffer);

  const images = GALLERY_IMAGE_SIZES.map(({ maxDimension, suffix }) => ({
    fileName: `${photoSlug}${suffix}.jpeg`,
    maxDimension,
  }));

  for (const image of images) {
    // Render photo at different size

    if (!DRY_RUN) {
      const resizedFilePath = path.resolve(directory, image.fileName);

      try {
        await resizeImage(
          path.resolve(directory, fileName),
          resizedFilePath,
          image.maxDimension
        );
      } catch {
        console.warn("Failed to render a resized image", photoSlug);
        return;
      }

      // Write photo to AWS S3 bucket

      const imageBuffer = await readFile(resizedFilePath);
      const writeSuccess = await writeFileToBucket(imageBuffer, image.fileName);
      if (!writeSuccess) {
        console.warn("Failed to write file to S3 bucket", image.fileName);
        return;
      }

      // Delete the rendered image

      try {
        await unlink(resizedFilePath);
      } catch {
        console.warn("Failed to delete resized image", image.fileName);
        return;
      }
    }
  }

  // Write gallery photo data file

  if (DRY_RUN || !jsonAlreadyExists) {
    const galleryPhotoData = parsePhoto({ cameras, title, exif });
    const json = JSON.stringify(galleryPhotoData, null, 2);

    if (DRY_RUN) {
      console.info(json);
    } else {
      await writeFile(jsonFilePath, json);
    }
  }

  // Delete the original photo

  if (!DRY_RUN) {
    try {
      await unlink(filePath);
      console.info("Success (gallery)", photoSlug);
    } catch {
      console.warn("Failed to delete photo file", photoSlug);
    }
  }
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

  const addPhotos = async (
    directory: string,
    method: (dir: string, pn: string) => Promise<unknown>
  ) => {
    // Get all new photos
    const directoryPath = path.join(newPhotosDirectory, directory);
    const directoryFiles = await readdir(directoryPath);
    const photoFiles = directoryFiles.filter((file) => file.endsWith(".jpeg"));

    // Add each photo
    for (const photoFile of photoFiles) {
      await method(directoryPath, photoFile);
    }
  };

  await addPhotos("blog", addBlogPhoto);
  await addPhotos("gallery", addGalleryPhoto);
};

addAllPhotos();
