import { DateTime } from "luxon";
import { useGalleryPhoto } from "../../context/galleryPhoto";
import { dateFromString } from "../../functions/date";
import { getLocationHierarchy } from "../../functions/location";
import { MarkdownGPS } from "../MarkdownGPS/MarkdownGPS";
import { MarkdownLocations } from "../MarkdownLocations/MarkdownLocations";
import { MarkdownTags } from "../MarkdownTags/MarkdownTags";

export const GalleryHeading = () => {
  const { exif, meta, title } = useGalleryPhoto();
  const date = dateFromString(exif.date) || null;

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
        {exif.camera && <li>Camera: {exif.camera.name}</li>}
        {meta.tags && <MarkdownTags tags={meta.tags} />}
      </ul>
    </>
  );
};
