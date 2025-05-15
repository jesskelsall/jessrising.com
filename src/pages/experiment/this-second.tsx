import { BlogImage } from "@/components/BlogImage";
import { PHOTO_SIZE_SUFFIX } from "@/consts/photo";
import { allGalleryPhotosList } from "@/data/galleryPhotos";
import { GalleryPhoto } from "@/types/galleryPhoto";
import _ from "lodash";
import { DateTime } from "luxon";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

interface GalleryPhotoAndSeconds {
  photo: GalleryPhoto;
  seconds: number;
  secondsAbs: number;
  secondsDiff: number;
}

const getSecondsSinceMidnight = (date: DateTime) =>
  date.hour * 3600 + date.minute * 60 + date.second;

const secondsToTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((unit) => _.padStart(`${unit}`, 2, "0"))
    .join(":");
};

interface IProps {
  galleryPhotosBySecond: GalleryPhotoAndSeconds[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const galleryPhotosBySecond = _.sortBy(
    allGalleryPhotosList.map((photo) => ({
      photo,
      seconds: getSecondsSinceMidnight(DateTime.fromISO(photo.exif.date)),
      secondsAbs: 0,
      secondsDiff: 0,
    })),
    "seconds"
  );

  return {
    props: {
      galleryPhotosBySecond,
    },
  };
};

const ThisSecondPage: NextPage<IProps> = ({ galleryPhotosBySecond }) => {
  /* Every second timing loop */

  const [isLooping, setIsLooping] = useState(false);
  const [secondsNow, setSecondsNow] = useState(
    getSecondsSinceMidnight(DateTime.now())
  );

  // Slight pause before starting so Next.js is happy
  useEffect(() => {
    setTimeout(() => {
      setIsLooping(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isLooping) {
      setTimeout(
        () => setSecondsNow(getSecondsSinceMidnight(DateTime.now())),
        1000
      );
    }
  }, [isLooping, secondsNow]);

  /* Determine photo to show */

  const galleryPhotosByRelativeSeconds: GalleryPhotoAndSeconds[] = _.sortBy(
    galleryPhotosBySecond.map((obj) => {
      const secondsDiff = obj.seconds - secondsNow;

      return {
        ...obj,
        secondsDiff,
        secondsAbs: Math.abs(secondsDiff),
      };
    }),
    "secondsAbs"
  );
  const { photo: galleryPhoto, seconds } = galleryPhotosByRelativeSeconds[0];

  /* Determine next photo that will be shown */

  let photoIndex = galleryPhotosBySecond.findIndex(
    (obj) => obj.photo.slug === galleryPhoto.slug
  );

  let nextGalleryPhoto: GalleryPhotoAndSeconds | null = null;
  while (!nextGalleryPhoto) {
    photoIndex += 1;
    if (galleryPhotosBySecond[photoIndex].seconds !== seconds) {
      nextGalleryPhoto = galleryPhotosBySecond[photoIndex];
    }
  }

  const changeSeconds = Math.ceil((seconds + nextGalleryPhoto.seconds) / 2);
  const secondsUntilChange = changeSeconds - secondsNow + 1;

  return (
    <main className="mx-auto max-w-screen-sm px-2 md:max-w-screen-md">
      <h1>This Second • {secondsToTime(secondsNow)}</h1>
      <h2>
        <Link href={`/gallery/p/${galleryPhoto.slug}`}>
          {galleryPhoto.title}
        </Link>
        {" • "}
        <span
          className={
            seconds === secondsNow ? "underline decoration-dotted" : ""
          }
        >
          {secondsToTime(seconds)}
        </span>
      </h2>
      <BlogImage
        alt={galleryPhoto.title}
        src={`${galleryPhoto.slug}${PHOTO_SIZE_SUFFIX.LARGE}`}
        forceGallery
      />
      <p>Next photo • {secondsToTime(secondsUntilChange)}</p>
    </main>
  );
};

export default ThisSecondPage;
