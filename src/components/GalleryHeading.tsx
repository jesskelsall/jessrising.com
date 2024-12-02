import { kebabCase } from "lodash/fp";
import { DateTime } from "luxon";
import { APP_AUTHOR } from "../consts/app";
import { PHOTO_SIZE_SUFFIX } from "../consts/photo";
import { SEPARATOR } from "../consts/text";
import { useGalleryPhoto } from "../context/galleryPhoto";
import { useGalleryPhotoSlugs } from "../context/galleryPhotoSlugs";
import { allTripsDict } from "../data/trips";
import { dateFromString } from "../functions/date";
import { getImageSrcFromSlug } from "../functions/image";
import { getLocationHierarchy } from "../functions/locationsDict";
import { stripSlugDateSuffix } from "../functions/slug";
import { pluralise } from "../functions/title";
import { TagTitle } from "../types/tag";
import { BlogListItem, BlogUnorderedList } from "./BlogList";
import { LinkButton } from "./LinkButton";
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

  const photoSlugPrefix = kebabCase(title);
  const matchingTitlesCount =
    galleryPhotoSlugs.filter(
      (eachSlug) => stripSlugDateSuffix(eachSlug) === photoSlugPrefix
    ).length - 1;

  return (
    <>
      <h1>{title}</h1>
      <BlogUnorderedList>
        {date && (
          <BlogListItem>
            Taken:{" "}
            {date.toLocaleString({
              ...DateTime.DATETIME_FULL,
              timeZoneName: undefined,
            })}
          </BlogListItem>
        )}
        {meta.location && (
          <MarkdownLocations locations={getLocationHierarchy(meta.location)} />
        )}
        {meta.gps && <MarkdownGPS gps={meta.gps} />}
        {meta.tags && <MarkdownTags tags={meta.tags} />}
        {meta.trip && <MarkdownTrip trip={allTripsDict[meta.trip]} />}
        {camera && <BlogListItem>Camera: {camera.name}</BlogListItem>}
        {camera?.lens && <BlogListItem>Lens: {camera?.lens}</BlogListItem>}
        {camera?.settings && (
          <BlogListItem>
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
          </BlogListItem>
        )}
      </BlogUnorderedList>
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
        <LinkButton href={originalImagePath}>
          Download high resolution photo
        </LinkButton>
      )}
      {hasForYouTag && (
        <p className="italic">
          Photo by {APP_AUTHOR}. Free to use in any way. If using this photo
          commercially, please credit by name.
        </p>
      )}
    </>
  );
};
