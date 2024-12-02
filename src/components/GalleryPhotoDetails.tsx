import { kebabCase } from "lodash/fp";
import { DateTime } from "luxon";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { SEPARATOR } from "../consts/text";
import { useGalleryPhoto } from "../context/galleryPhoto";
import { useGalleryPhotoSlugs } from "../context/galleryPhotoSlugs";
import { allTripsDict } from "../data/trips";
import { dateFromString } from "../functions/date";
import { stripSlugDateSuffix } from "../functions/slug";
import { pluralise } from "../functions/title";
import { MarkdownLocations } from "./MarkdownLocations";
import { MarkdownTags } from "./MarkdownTags";
import { Pill } from "./Pill";

const Row = ({ children, label }: { label: string } & PropsWithChildren) => (
  <tr className="odd:bg-mono-800 dark:odd:bg-mono-100">
    <td className="p-2 pr-6 font-sans-bold font-bold md:pr-10">{label}</td>
    <td className="p-2">{children}</td>
  </tr>
);

const renderSetting = (
  setting: number | undefined,
  transform: (value: number) => string
): string | undefined => {
  if (setting === undefined) return undefined;
  return transform(setting);
};

export const GalleryPhotoDetails = () => {
  const galleryPhotoSlugs = useGalleryPhotoSlugs();
  const { exif, meta, title } = useGalleryPhoto();
  const { camera } = exif;

  const date = dateFromString(exif.date);

  const photoSlugPrefix = kebabCase(title);
  const matchingTitlesCount =
    galleryPhotoSlugs.filter(
      (eachSlug) => stripSlugDateSuffix(eachSlug) === photoSlugPrefix
    ).length - 1;

  const trip = meta.trip && allTripsDict[meta.trip];

  return (
    <>
      <table className="mx-[-8px] md:mx-0">
        <tbody>
          {date && (
            <Row label="Taken">
              {date.toLocaleString({
                ...DateTime.DATETIME_FULL,
                timeZoneName: undefined,
              })}
            </Row>
          )}
          {meta.gps && (
            <Row label="GPS">
              <Link
                href={`https://google.com/maps/search/${meta.gps.lat},${meta.gps.long}`}
                target="_blank"
                rel="noopener"
              >
                Google Maps
              </Link>
            </Row>
          )}
          {meta.location && (
            <Row label="Location">
              <MarkdownLocations location={meta.location} />
            </Row>
          )}
          {meta.tags.length > 1 && (
            <Row label="Tags">
              <MarkdownTags tags={meta.tags} />
            </Row>
          )}
          {trip && (
            <Row label="Trip">
              <Pill
                emoji={trip.emoji}
                href={`/gallery?trip=${trip.slug}`}
                title={trip.title}
              />
            </Row>
          )}
          <Row label="Camera">{camera.name}</Row>
          {camera.lens && <Row label="Lens">{camera.lens}</Row>}
          {camera.settings && (
            <Row label="Settings">
              {[
                renderSetting(
                  camera.settings.focalLength,
                  (value) => `${value} mm`
                ),
                renderSetting(camera.settings.exposureTime, (value) =>
                  value < 1 ? `1/${Math.round(1 / value)} s` : `${value} s`
                ),
                renderSetting(camera.settings.fStop, (value) => `ƒ${value}`),
                renderSetting(
                  camera.settings.exposureBias,
                  (value) => `${value} ev`
                ),
                renderSetting(camera.settings.ISO, (value) => `ISO ${value}`),
              ]
                .filter((setting) => setting)
                .join(SEPARATOR)}
            </Row>
          )}
        </tbody>
      </table>
      {matchingTitlesCount > 0 && (
        <p>
          <Pill
            href={`/gallery?title=${photoSlugPrefix}`}
            title={`${matchingTitlesCount} other ${pluralise(
              "photo",
              "photos",
              matchingTitlesCount
            )} with this title`}
          />
        </p>
      )}
    </>
  );
};
