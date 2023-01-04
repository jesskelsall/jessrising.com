import { useGalleryPhoto } from "../../context";
import { MarkdownGPS } from "../MarkdownGPS";
import { MarkdownLocation } from "../MarkdownLocation";
import { MarkdownTags } from "../MarkdownTags";
import { parseEXIFDate } from "../../functions";

interface IGalleryHeadingProps {
  children: React.ReactNode[];
  id?: string;
}

export const GalleryHeading = ({
  children,
  ...props
}: IGalleryHeadingProps) => {
  const { meta } = useGalleryPhoto();
  const date = meta.photo?.date ? parseEXIFDate(meta.photo.date) : null;

  return (
    <>
      <h1 {...props}>{children}</h1>
      <ul>
        {date && <li>Taken: {date.toFormat("yyyy-MM-dd HH:mm:ss")}</li>}
        {meta.locations && <MarkdownLocation locations={meta.locations} />}
        {meta.gps && <MarkdownGPS gps={meta.gps} />}
        {meta.photo?.camera && <li>Camera: {meta.photo.camera}</li>}
        {meta.tags && <MarkdownTags tags={meta.tags} />}
      </ul>
    </>
  );
};
