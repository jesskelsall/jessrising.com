import { startCase } from "lodash/fp";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import {
  applyFilterQueries,
  formatFilterQuery,
  sortGalleryPhotosByDate,
} from "../../functions";
import { getAllGalleryPhotos } from "../../functions/fs";
import { IMarkdownData } from "../../types";

interface IProps {
  galleryPhotos: IMarkdownData[];
  // locations: string[];
  // tags: string[];
}

export const getStaticProps: GetStaticProps<IProps> = async (/* {
  query,
} */) => {
  const galleryPhotos = await getAllGalleryPhotos();

  // // Deconstruct query params
  // const tags = formatFilterQuery(query.t);
  // const locations = formatFilterQuery(query.l);

  // Apply filters and sorting
  // const displayGalleryPhotos = applyFilterQueries<IMarkdownData>(
  //   galleryPhotos,
  //   [tags, (photo) => photo.meta.tags || []],
  //   [locations, (photo) => photo.meta.locations || []]
  // ).sort(sortGalleryPhotosByDate);
  const displayGalleryPhotos = galleryPhotos.sort(sortGalleryPhotosByDate);

  return {
    props: {
      galleryPhotos: displayGalleryPhotos,
      // locations,
      // tags,
    },
  };
};

const GalleryPage: NextPage<IProps> = ({
  galleryPhotos /* locations, tags */,
}) => (
  // const filteredByLocation = Boolean(locations.length);
  // const filteredByTag = Boolean(tags.length);

  <>
    <h1>Gallery</h1>

    {/* Filters */}
    {/* {(filteredByLocation || filteredByTag) && (
        <ul>
          {filteredByLocation && <li>Locations: {locations.join(", ")}</li>}
          {filteredByTag && <li>Tags: {tags.join(", ")}</li>}
        </ul>
      )} */}

    {/* Gallery grid */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
      {galleryPhotos.map(({ slug }) => {
        const imagePath = path.join("/photos", `${slug}.jpeg`);

        return (
          <Link href={`/gallery/${slug}`} key={slug}>
            <div
              style={{
                height: 375,
                position: "relative",
                width: 500,
              }}
            >
              <Image alt={startCase(slug)} src={imagePath} fill />
            </div>
          </Link>
        );
      })}
    </div>
  </>
);
export default GalleryPage;
