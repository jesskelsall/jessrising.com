/* eslint-disable @next/next/no-img-element */

import path from "path";

interface IBlogImageProps {
  alt: string;
  src: string;
}

export const BlogImage = ({ alt, src }: IBlogImageProps) => {
  const imageFileName = src.split("/").reverse()[0];
  const imagePath = path.join("/photos", imageFileName);

  return (
    <a href={imagePath}>
      <img
        src={imagePath}
        alt={alt}
        style={{
          width: 800,
          maxWidth: "100%",
        }}
      />
    </a>
  );
};
