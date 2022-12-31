import { startCase } from "lodash/fp";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { sortGalleryPhotosByDate } from "../../functions";
import { getAllGalleryPhotos } from "../../functions/fs";
import { IGalleryPhoto } from "../../types";

interface IProps {
  galleryPhotos: IGalleryPhoto[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const galleryPhotos = await getAllGalleryPhotos();
  const displayGalleryPhotos = galleryPhotos.sort(sortGalleryPhotosByDate);

  return {
    props: {
      galleryPhotos: displayGalleryPhotos,
    },
  };
};

const GalleryPage: NextPage<IProps> = ({ galleryPhotos }) => (
  <>
    <h1>Gallery</h1>
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
