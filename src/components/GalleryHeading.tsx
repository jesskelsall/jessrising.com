import { DateTime } from "luxon";
import Link from "next/link";
import { APP_AUTHOR } from "../consts/app";
import { PHOTO_SIZE_SUFFIX } from "../consts/photo";
import { SEPARATOR } from "../consts/text";
import { useGalleryPhoto } from "../context/galleryPhoto";
import { useGalleryPhotoSlugs } from "../context/galleryPhotoSlugs";
import { allTripsDict } from "../data/trips";
import { dateFromString } from "../functions/date";
import { getImageSrcFromSlug } from "../functions/image";
import { getLocationHierarchy } from "../functions/locationsDict";
import { parsePhotoSlug } from "../functions/photo";
import { stripSlugDateSuffix } from "../functions/slug";
import { pluralise } from "../functions/title";
import { TagTitle } from "../types/tag";
import { MarkdownGPS } from "./MarkdownGPS";
import { MarkdownLocations } from "./MarkdownLocations";
import { MarkdownTags } from "./MarkdownTags";
import { MarkdownTrip } from "./MarkdownTrip";
import { Pill } from "./Pill";

const renderSetting = (
  setting: number | undefined,
  transform: (value: number) => string
): string | undefined => {
  if (setting === undefined) return undefined;
  return transform(setting);
};

export const GalleryHeading = () => {
  const galleryPhotoSlugs = useGalleryPhotoSlugs();
  const { exif, meta, settings, slug, title } = useGalleryPhoto();
  const { camera } = exif;

  const date = dateFromString(exif.date);
  const originalImagePath = getImageSrcFromSlug(
    slug,
    PHOTO_SIZE_SUFFIX.ORIGINAL
  );

  const hasForYouTag = meta.tags.includes(TagTitle.parse("For You"));

  const photoSlugPrefix = parsePhotoSlug(title);
  const matchingTitlesCount =
    galleryPhotoSlugs.filter(
      (eachSlug) => stripSlugDateSuffix(eachSlug) === photoSlugPrefix
    ).length - 1;

  return (
    <>
      <h1>{title}</h1>
      <ul>
        {date && (
          <li>
            Taken:{" "}
            {date.toLocaleString({
              ...DateTime.DATETIME_FULL,
              timeZoneName: undefined,
            })}
          </li>
        )}
        {meta.location && (
          <MarkdownLocations locations={getLocationHierarchy(meta.location)} />
        )}
        {meta.gps && <MarkdownGPS gps={meta.gps} />}
        {meta.tags && <MarkdownTags tags={meta.tags} />}
        {meta.trip && <MarkdownTrip trip={allTripsDict[meta.trip]} />}
        {camera && <li>Camera: {camera.name}</li>}
        {camera?.lens && <li>Lens: {camera?.lens}</li>}
        {camera?.settings && (
          <li>
            {"Settings: "}
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
          </li>
        )}
      </ul>
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
      {settings?.downloadOriginal && (
        <Link className="button" href={originalImagePath}>
          Download high resolution photo
        </Link>
      )}
      {hasForYouTag && (
        <p className="disclaimer">
          Photo by {APP_AUTHOR}. Free to use in any way. If using this photo
          commercially, please credit by name.
        </p>
      )}
    </>
  );
};
