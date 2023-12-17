/* eslint-disable security/detect-non-literal-fs-filename,no-restricted-syntax,no-await-in-loop,no-continue */

import { input as inquirerInput } from "@inquirer/prompts";
import fs from "fs";
import { kebabCase } from "lodash/fp";
import { DateTime } from "luxon";
import path from "path";
import util from "util";
import { DIR_CONTENT } from "../src/consts/app";
import { GalleryPhotoSlug, TripSlug } from "../src/types/brand";
import { GalleryPhotoData } from "../src/types/galleryPhoto";
import { TagTitle } from "../src/types/tag";
import { TripData } from "../src/types/trip";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const addTrip = async (): Promise<void> => {
  // Input details

  const tripName = await inquirerInput({
    message: "Trip name",
    validate: (input: string) => Boolean(input) || "Trip name is required.",
  });

  const fromString = await inquirerInput({
    message: "From date",
    validate: (input: string) => Boolean(input) || "From date is required.",
  });

  const toString = await inquirerInput({
    message: "To date (optional)",
  });

  const tripDescription = await inquirerInput({
    message: "Description",
  });

  const thumbnail = await inquirerInput({
    message: "Thumbnail (gallery photo slug)",
    validate: (input: string) => Boolean(input) || "Thumbnail is required.",
  });

  const icon = await inquirerInput({
    message: "Icon (emoji)",
  });

  // Create trip

  const tripSlug = TripSlug.parse(`${fromString}-${kebabCase(tripName)}`);
  const trip: TripData = {
    title: tripName,
    description: tripDescription || null,
    thumbnail: GalleryPhotoSlug.parse(thumbnail),
    icon,
    dates: {
      from: fromString,
      to: toString || undefined,
    },
  };

  const tripsFileName = `${tripSlug}.json`;
  const tripsPath = path.resolve(DIR_CONTENT, "trips", tripsFileName);
  await writeFile(tripsPath, JSON.stringify(trip, null, 2));
  console.info("[Trip]", "Wrote", tripsFileName);

  // Apply trip to gallery photos

  const fromDate = DateTime.fromISO(fromString);
  const toDate = DateTime.fromISO(`${toString || fromString}T23:59:59`);

  const photosDir = path.resolve(DIR_CONTENT, "photos");
  const photoFileNames = (await readdir(photosDir)).filter((file) =>
    file.endsWith(".json")
  );

  for (const fileName of photoFileNames) {
    // Read photo

    const filePath = path.join(photosDir, fileName);
    const buffer = await readFile(filePath);
    const galleryPhotoData = GalleryPhotoData.parse(
      JSON.parse(buffer.toString())
    );

    // Exclude photos tagged with For You

    if (galleryPhotoData.meta.tags.includes(TagTitle.parse("For You")))
      continue;

    // Determine if in range

    if (!galleryPhotoData.exif.date) continue;

    const photoDate = DateTime.fromISO(galleryPhotoData.exif.date);
    const photoInRange = photoDate >= fromDate && photoDate <= toDate;

    if (!photoInRange) continue;

    // Modify photo

    if (galleryPhotoData.meta.trip) {
      console.warn(
        "[Trip]",
        "Photo already has trip",
        fileName,
        galleryPhotoData.meta.trip
      );
    }
    galleryPhotoData.meta.trip = tripSlug;
    await writeFile(filePath, JSON.stringify(galleryPhotoData, null, 2));
    console.info("[Trip]", "Updated", fileName);
  }
};

addTrip();
