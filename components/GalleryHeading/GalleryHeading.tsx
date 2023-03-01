import { DateTime } from "luxon";
import { useGalleryPhoto } from "../../context/galleryPhoto";
import { parseEXIFDate } from "../../functions/date";
import { MarkdownGPS } from "../MarkdownGPS/MarkdownGPS";
import { MarkdownLocation } from "../MarkdownLocation/MarkdownLocation";
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
  const date = parseEXIFDate(meta.photo?.date) || null;

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
        {meta.locations && <MarkdownLocation locations={meta.locations} />}
        {meta.gps && <MarkdownGPS gps={meta.gps} />}
        {meta.photo?.camera && <li>Camera: {meta.photo.camera}</li>}
        {meta.tags && <MarkdownTags tags={meta.tags} />}
      </ul>
    </>
  );
};
