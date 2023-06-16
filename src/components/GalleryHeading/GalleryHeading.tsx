import { DateTime } from "luxon";
import { useGalleryPhoto } from "../../context/galleryPhoto";
import { dateFromString } from "../../functions/date";
import { getCameraDisplayName } from "../../functions/photo";
import { MarkdownGPS } from "../MarkdownGPS/MarkdownGPS";
import { MarkdownLocations } from "../MarkdownLocations/MarkdownLocations";
import { MarkdownTags } from "../MarkdownTags/MarkdownTags";

interface IGalleryHeadingProps {
  children: React.ReactNode[];
  id?: string;
}

export const GalleryHeading = ({
  children,
  ...props
}: IGalleryHeadingProps) => {
  const { meta } = useGalleryPhoto();
  const date = dateFromString(meta.photo?.date) || null;

  return (
    <>
      <h1 {...props}>{children}</h1>
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
        {meta.locations && <MarkdownLocations locations={meta.locations} />}
        {meta.gps && <MarkdownGPS gps={meta.gps} />}
        {meta.photo?.camera && (
          <li>Camera: {getCameraDisplayName(meta.photo.camera)}</li>
        )}
        {meta.tags && <MarkdownTags tags={meta.tags} />}
      </ul>
    </>
  );
};
