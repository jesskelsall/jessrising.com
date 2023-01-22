interface IBlogYouTubeVideoProps {
  id: string;
  start?: number;
}

export const BlogYouTubeVideo = ({ id, start }: IBlogYouTubeVideoProps) => {
  const startParam = start !== undefined ? `?start=${start}` : "";
  const url = `https://www.youtube.com/embed/${id}${startParam}`;

  return (
    <iframe
      src={url}
      height="450"
      width="100%"
      title="YouTube video player"
      frameBorder="0"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    />
  );
};
