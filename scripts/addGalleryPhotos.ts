/* eslint-disable security/detect-non-literal-fs-filename,no-restricted-syntax,no-await-in-loop */

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  checkbox as inquirerCheckbox,
  confirm as inquirerConfirm,
  input as inquirerInput,
} from "@inquirer/prompts";
import ExifReader from "exifreader";
import fs from "fs";
import { convert } from "imagemagick";
import { cloneDeep, orderBy, uniq } from "lodash/fp";
import path from "path";
import util from "util";
import { DIR_CONTENT, S3_BUCKET_NAME } from "../src/consts/app";
import { cameras } from "../src/data/cameras";
import galleryPhotosJSON from "../src/data/galleryPhotos.json";
import { allTags } from "../src/data/tags";
import {
  parsePhoto,
  parsePhotoSlug,
  parsePhotoTitle,
} from "../src/functions/photo";
import { GalleryPhotoSlug } from "../src/types/brand";
import { GalleryPhotoData } from "../src/types/galleryPhoto";
import { LocationTitle } from "../src/types/location";
import { TagTitle } from "../src/types/tag";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const writeFile = util.promisify(fs.writeFile);

const s3Client = new S3Client({ region: "eu-west-2" });

interface ImageSize {
  maxDimension?: number;
  suffix: string;
}

type GalleryPhotoDetails = {
  fileName: string;
  slug: GalleryPhotoSlug;
  data: GalleryPhotoData;
};

const allGalleryPhotoSlugs = galleryPhotosJSON.map((galleryPhoto) =>
  GalleryPhotoSlug.parse(galleryPhoto.slug)
);

const hiddenTagTitles = allTags
  .filter((tag) => tag.hidePhotos && tag.title !== "For You")
  .map((tag) => tag.title);

/* CONFIG */

const DRY_RUN = false;
const GALLERY_PHOTO_OVERWRITE = false; // Allows reupload to S3 without touching MD file
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

/* HELPERS */

const stop = (...warn: string[]) => {
  console.warn(...warn);
  process.exit(1);
};

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

const getFiles = async (directory: string): Promise<[string, string[]]> => {
  const newPhotosDirectory = path.resolve(__dirname, "newPhotos");
  const directoryPath = path.join(newPhotosDirectory, directory);
  const directoryFiles = await readdir(directoryPath);
  const photoFiles = directoryFiles.filter((file) => file.endsWith(".jpeg"));

  return [directoryPath, photoFiles];
};

/* GALLERY */

// Get all new gallery photos, ordered by date taken
const getGalleryPhotos = async (
  photoDir: string,
  photoFiles: string[]
): Promise<GalleryPhotoDetails[]> => {
  const getGalleryPhotoDetails = async (
    photoFile: string
  ): Promise<GalleryPhotoDetails> => {
    const title = parsePhotoTitle(photoFile);

    // Extract EXIF data from file

    const filePath = path.join(photoDir, photoFile);
    const fileBuffer = await readFile(filePath);
    const exif = await ExifReader.load(fileBuffer);

    // Create gallery photo data

    const data = parsePhoto({ cameras, title, exif });
    const slug = parsePhotoSlug(data.title, data.exif.date);

    return { fileName: photoFile, slug, data };
  };

  // Get gallery photo data for all photos

  const allGalleryPhotoDetails = await Promise.all(
    photoFiles.map(getGalleryPhotoDetails)
  );
  const orderedDetails = orderBy(
    ["data.exif.date"],
    ["asc"],
    allGalleryPhotoDetails
  );

  // Apply slug suffix lettering if needed

  const galleryPhotoDetails: GalleryPhotoDetails[] = [];

  const slugsFromDetails = (
    allDetails: GalleryPhotoDetails[]
  ): GalleryPhotoSlug[] => allDetails.map((details) => details.slug);

  while (orderedDetails.length > 0) {
    const details = orderedDetails.shift();
    if (!details) break;

    const matchingSlugs: number[] = [
      [...allGalleryPhotoSlugs, ...slugsFromDetails(galleryPhotoDetails)],
      slugsFromDetails(orderedDetails),
    ].map(
      (slugs) => slugs.filter((slug) => slug.startsWith(details.slug)).length
    );
    const matchCount = matchingSlugs.reduce((prev, cur) => prev + cur, 0);

    if (matchCount > 0) {
      const countSuffix = "abcdefghijklmnopqrstuvwxyz".charAt(matchingSlugs[0]);
      galleryPhotoDetails.push({
        ...details,
        slug: GalleryPhotoSlug.parse(`${details.slug}${countSuffix}`),
      });
    } else {
      galleryPhotoDetails.push(details);
    }
  }

  // Warn if there are matching legacy slugs that need renaming

  const slugsToRename = uniq(
    galleryPhotoDetails.map((details) => details.data.title)
  )
    .sort()
    .reduce((prev, title) => {
      const photoSlug = parsePhotoSlug(title);
      const legacySlugs = allGalleryPhotoSlugs.filter(
        (slug) => slug.startsWith(photoSlug) && !/\d{6}[a-z]{0,1}$/.test(slug)
      );

      return [...prev, ...legacySlugs];
    }, [] as GalleryPhotoSlug[]);

  if (slugsToRename.length) {
    console.warn("WARNING: The following photos need their slugs renaming:");
    slugsToRename.forEach((slug) => console.warn(` - ${slug}`));
  }

  return galleryPhotoDetails;
};

// Ask CLI questions about the photo and modify the gallery photo data
const enrichGalleryPhoto = async (
  data: GalleryPhotoData,
  previousData?: GalleryPhotoData
) => {
  const updatedData: GalleryPhotoData = cloneDeep(data);

  // GPS coordinates

  if (updatedData.meta.gps) {
    console.info("GPS Coordinates:", JSON.stringify(updatedData.meta.gps));
  } else {
    // DISABLED: Prompt for coordinates
    // const coordsFromString = (coords: string): number[] =>
    //   coords.split(",").map((part) => parseFloat(part));
    // const coordsString = await inquirerInput({
    //   message: "GPS Coordinates",
    //   validate: (input: string) => {
    //     if (!input) return true;
    //     const coords = coordsFromString(input);
    //     return (
    //       (coords.length === 2 &&
    //         coords.every((coord) => !Number.isNaN(coord))) ||
    //       "Invalid coordinate string."
    //     );
    //   },
    // });
    // if (coordsString) {
    //   const coords = coordsFromString(coordsString);
    //   updatedData.meta.gps = { lat: coords[0], long: coords[1] };
    // }
  }

  // Location

  const locationString = await inquirerInput({
    message: "Location",
    default: previousData?.meta.location || undefined,
  });
  updatedData.meta.location = locationString
    ? LocationTitle.parse(locationString)
    : null;

  // Tags

  const tagDefaults: TagTitle[] = previousData
    ? previousData.meta.tags
    : [TagTitle.parse("Landscape")];
  const selectedTags = await inquirerCheckbox({
    message: `Tags [${tagDefaults.join(", ")}]`,
    choices: allTags.map((tag) => ({
      value: tag.title,
      checked: tagDefaults.includes(TagTitle.parse(tag.title)),
    })),
  });
  updatedData.meta.tags = selectedTags.map((tag) => TagTitle.parse(tag));
  if (selectedTags.includes(TagTitle.parse("For You"))) {
    updatedData.settings = { downloadOriginal: true };
  }

  const hasHiddenTags = selectedTags.some((tag) =>
    hiddenTagTitles.includes(tag)
  );
  if (hasHiddenTags) {
    const showPhoto = await inquirerConfirm({
      message: "Show this photo (override hidden tags)?",
      default: false,
    });
    if (showPhoto) {
      updatedData.settings = {
        showPhoto: true,
      };
    }
  }

  return updatedData;
};

// Write the gallery photo's data, upload files to S3, delete original
const writeGalleryPhoto = async (
  photoDir: string,
  photoFile: string,
  photoData: GalleryPhotoData,
  photoSlug: GalleryPhotoSlug,
  lastData?: GalleryPhotoData
): Promise<GalleryPhotoData | undefined> => {
  console.info(`\n\x1b[33m${photoData.title} (${photoSlug})\x1b[0m`);

  // Write gallery photo data file

  let galleryPhotoData: GalleryPhotoData | undefined;

  if (!GALLERY_PHOTO_OVERWRITE) {
    if (DRY_RUN) {
      galleryPhotoData = photoData;
    } else {
      galleryPhotoData = await enrichGalleryPhoto(photoData, lastData);
    }

    const json = JSON.stringify(galleryPhotoData, null, 2);

    if (DRY_RUN) {
      console.info(json);
    } else {
      const jsonFilePath = path.resolve(
        DIR_CONTENT,
        "photos",
        `${photoSlug}.json`
      );
      await writeFile(jsonFilePath, json);
      console.info("[Gallery]", "Wrote", fileFromPath(jsonFilePath));
    }
  }

  // Render photo at different sizes

  if (!DRY_RUN) {
    const images = GALLERY_IMAGE_SIZES.slice(
      0,
      galleryPhotoData?.meta.tags.includes(TagTitle.parse("For You"))
        ? undefined
        : -1
    ).map(({ maxDimension, suffix }) => ({
      fileName: `${photoSlug}${suffix}.jpeg`,
      maxDimension,
    }));

    for (const image of images) {
      const resizedFilePath = path.resolve(photoDir, image.fileName);

      try {
        await resizeImage(
          path.resolve(photoDir, photoFile),
          resizedFilePath,
          image.maxDimension
        );
      } catch {
        stop("[Gallery]", "Failed to render a resized image", photoSlug);
      }

      // Write photo to AWS S3 bucket

      const imageBuffer = await readFile(resizedFilePath);
      const writeSuccess = await writeFileToBucket(imageBuffer, image.fileName);
      if (writeSuccess) {
        console.info("[Gallery]", "Uploaded", fileFromPath(image.fileName));
      } else {
        stop("[Gallery]", "Failed to write file to S3 bucket", image.fileName);
      }

      // Delete the rendered image

      try {
        await unlink(resizedFilePath);
      } catch {
        stop("[Gallery]", "Failed to delete resized image", image.fileName);
      }
    }
  }

  // Delete the original photo

  if (!DRY_RUN) {
    const filePath = path.join(photoDir, photoFile);

    try {
      await unlink(filePath);
      console.info("[Gallery]", "Deleted", fileFromPath(filePath));
    } catch {
      stop("[Gallery]", "Failed to delete photo file", fileFromPath(filePath));
    }
  }

  return galleryPhotoData;
};

const addGalleryPhotos = async (): Promise<void> => {
  const [photoDir, photoFiles] = await getFiles("gallery");
  const allGalleryPhotoDetails = await getGalleryPhotos(photoDir, photoFiles);

  let lastData: GalleryPhotoData | undefined;
  for (const photoDetails of allGalleryPhotoDetails) {
    lastData = await writeGalleryPhoto(
      photoDir,
      photoDetails.fileName,
      photoDetails.data,
      photoDetails.slug,
      lastData
    );
  }
};

/* BLOG */

// Add an individual blog photo
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

// Add all new blog photos
const addBlogPhotos = async (): Promise<void> => {
  const [blogDir, blogFiles] = await getFiles("blog");

  for (const blogFile of blogFiles) {
    await addBlogPhoto(blogDir, blogFile);
  }
};

// Add all new gallery and blog photos
const addAllPhotos = async (): Promise<void> => {
  console.info("DRY_RUN", DRY_RUN);

  await addGalleryPhotos();
  await addBlogPhotos();
};

addAllPhotos();
