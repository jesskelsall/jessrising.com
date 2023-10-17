import { DateTime } from "luxon";
import Link from "next/link";
import { APP_AUTHOR } from "../../consts/app";
import { PHOTO_SIZE_SUFFIX } from "../../consts/photo";
import { SEPARATOR } from "../../consts/text";
import { useGalleryPhoto } from "../../context/galleryPhoto";
import { allTripsDict } from "../../data/trips";
import { dateFromString } from "../../functions/date";
import { getImageSrcFromSlug } from "../../functions/image";
import { getLocationHierarchy } from "../../functions/location";
import { TagId } from "../../types/tag";
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

  const date = dateFromString(exif.date);
  const originalImagePath = getImageSrcFromSlug(
    slug,
    PHOTO_SIZE_SUFFIX.ORIGINAL
  );

  const hasNewTag = meta.tags.includes(TagId.parse("New"));
  const copyrightTo = DateTime.now().year.toString();
  const copyrightFrom = (
    dateFromString(exif.date)?.year || copyrightTo
  ).toString();
  const copyrightRange =
    copyrightFrom + (copyrightTo !== copyrightFrom ? `-${copyrightTo}` : "");

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
      {settings?.downloadOriginal && (
        <Link className="button" href={originalImagePath}>
          Download high resolution photo
        </Link>
      )}
      <p className="disclaimer">
        {hasNewTag ? (
          <>
            Photo by {APP_AUTHOR}. Free to use in any way. If using this photo
            commercially, please credit by name.
            <br />
            For inquiries, email{" "}
            <a href="mailto:hi@jesskelsall.me">hi@jesskelsall.me</a>
          </>
        ) : (
          <>
            &copy; {copyrightRange} {APP_AUTHOR}. All rights reserved.
          </>
        )}
      </p>
    </>
  );
};
