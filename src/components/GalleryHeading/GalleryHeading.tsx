import { DateTime } from "luxon";
import Link from "next/link";
import { PHOTO_SIZE_SUFFIX } from "../../consts/photo";
import { SEPARATOR } from "../../consts/text";
import { useGalleryPhoto } from "../../context/galleryPhoto";
import { allTripsDict } from "../../data/trips";
import { dateFromString } from "../../functions/date";
import { getImageSrcFromSlug } from "../../functions/image";
import { getLocationHierarchy } from "../../functions/location";
import { MarkdownGPS } from "../MarkdownGPS/MarkdownGPS";
import { MarkdownLocations } from "../MarkdownLocations/MarkdownLocations";
import { MarkdownTags } from "../MarkdownTags/MarkdownTags";
import { MarkdownTrip } from "../MarkdownTrip/MarkdownTrip";

const renderSetting = (
  setting: number | undefined,
  transform: (value: number) => string
): string | undefined => {
  if (setting === undefined) return undefined;
  return transform(setting);
};

export const GalleryHeading = () => {
  const { exif, meta, settings, slug, title } = useGalleryPhoto();
  const { camera } = exif;

  const date = dateFromString(exif.date) || null;
  const originalImagePath = getImageSrcFromSlug(
    slug,
    PHOTO_SIZE_SUFFIX.ORIGINAL
  );

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
                value < 1 ? `1/${1 / value} s` : `${value} s`
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
      {settings?.downloadOriginal && (
        <Link className="button" href={originalImagePath}>
          Download high resolution photo
        </Link>
      )}
    </>
  );
};
