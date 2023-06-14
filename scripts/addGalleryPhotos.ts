/* eslint-disable security/detect-non-literal-fs-filename,no-restricted-syntax,no-await-in-loop */

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import ExifReader from "exifreader";
import fs from "fs";
import { convert } from "imagemagick";
import _ from "lodash/fp";
import path from "path";
import util from "util";
import { DIR_CONTENT, S3_BUCKET_NAME } from "../src/consts/app";
import { dateFromEXIFString } from "../src/functions/date";
import { IEXIF } from "../src/types/gallery";

const GALLERY_PHOTO_SUFFIX_SEPARATOR = " = ";

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

const galleryImageSizes: ImageSize[] = [
  {
    maxDimension: 500,
    suffix: "-sm",
  },
  {
    maxDimension: 1200,
    suffix: "-lg",
  },
];

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

// Read EXIF data from a photo file
const readPhotoEXIF = async (fileBuffer: Buffer): Promise<IEXIF> => {
  const {
    DateTime: Date,
    "Image Height": Height,
    "Image Width": Width,
    Make,
    Model,
  } = await ExifReader.load(fileBuffer);

  // Apply EXIF tag data if present
  const exifData: IEXIF = {};

  if (Make?.value[0] && Model?.value[0]) {
    exifData.camera = `${Make.value[0]} ${Model.value[0]}`;
  }

  if (Date?.value[0]) {
    const isoDate = dateFromEXIFString(Date.value[0]);
    if (isoDate?.isValid) exifData.date = isoDate.toISO();
  }

  if (Height.value && Width.value) {
    exifData.dimensions = {
      height: parseInt(Height.value, 10),
      width: parseInt(Width.value, 10),
    };
  }

  return exifData;
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
  const [photoName, fileSuffix] = fileName
    .replace(".jpeg", "")
    .split(GALLERY_PHOTO_SUFFIX_SEPARATOR);
  const photoSlug = [
    _.kebabCase(photoName),
    ...(fileSuffix ? [fileSuffix] : []),
  ].join("-");

  // Check if this photo name has already been used

  const markdownFilePath = path.resolve(
    DIR_CONTENT,
    "photos",
    `${photoSlug}.md`
  );

  const markdownAlreadyExists = await fileExists(markdownFilePath);
  if (markdownAlreadyExists) {
    console.warn("Photo already exists", photoSlug);
    return;
  }

  // Extract EXIF data from file

  const filePath = path.join(directory, fileName);
  const fileBuffer = await readFile(filePath);
  const exifData = await readPhotoEXIF(fileBuffer);

  const images = galleryImageSizes.map(({ maxDimension, suffix }) => ({
    fileName: `${photoSlug}${suffix}.jpeg`,
    maxDimension,
  }));

  for (const image of images) {
    // Render photo at different size

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

  // Write gallery photo data file

  const markdownContent: string[] = [
    `# ${photoName}`,
    "",
    "- GPS: ",
    "- Location: ",
    "- Tags: Landscape",
  ];
  if (exifData.camera) markdownContent.push(`- Camera: ${exifData.camera}`);
  if (exifData.date) markdownContent.push(`- Date: ${exifData.date}`);
  if (exifData.dimensions)
    markdownContent.push(
      `- Dimensions: ${exifData.dimensions.width}x${exifData.dimensions.height}`
    );

  await writeFile(markdownFilePath, markdownContent.join("\n").concat("\n"));

  // Delete the original photo

  try {
    await unlink(filePath);
  } catch {
    console.warn("Failed to delete photo file", photoSlug);
    return;
  }

  console.info("Success (gallery)", photoSlug);
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
  const newPhotosDirectory = path.resolve(__dirname, "newPhotos");

  const addPhotos = async (
    directory: string,
    method: (dir: string, pn: string) => Promise<any>
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
