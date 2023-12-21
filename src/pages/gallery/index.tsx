import _, { kebabCase } from "lodash/fp";
import { DateTime } from "luxon";
import { GetServerSideProps, NextPage } from "next";
import { GalleryGrid } from "../../components/GalleryGrid";
import { GalleryPagination } from "../../components/GalleryPagination";
import { TContentArea } from "../../components/Header";
import { Newsletter } from "../../components/Newsletter";
import { CONFIG } from "../../consts/config";
import { GALLERY_PHOTOS_PER_PAGE } from "../../consts/gallery";
import { allGalleryPhotosList } from "../../data/galleryPhotos";
import { tagsDict } from "../../data/tagsDict";
import { allTripsDict } from "../../data/trips";
import { dateFromString } from "../../functions/date";
import { TModelFilter, applyFilterQueries } from "../../functions/filter";
import { getLocationHierarchy } from "../../functions/locationsDict";
import {
  queryParamToIntegers,
  queryParamToStrings,
} from "../../functions/params";
import { isPhotoShown } from "../../functions/photo";
import { sortGalleryPhotosByDate } from "../../functions/sort";
import { pluralise, titleCase } from "../../functions/title";
import { TripSlug } from "../../types/brand";
import { IGalleryQuery, TOrder } from "../../types/gallery";
import { GalleryPhoto } from "../../types/galleryPhoto";
import { TagTitle } from "../../types/tag";

interface IPagination {
  page: number;
  pages: number;
  total: number;
}

interface IProps {
  contentArea: TContentArea;
  galleryPhotos: GalleryPhoto[];
  locations: string[];
  month: number | null;
  order: TOrder;
  pagination: IPagination;
  query: IGalleryQuery;
  tags: TagTitle[];
  trips: TripSlug[];
  year: number | null;
}

export const getServerSideProps: GetServerSideProps<
  IProps,
  IGalleryQuery
> = async (context) => {
  // Query parameters

  const query = context.query as IGalleryQuery;

  let page = queryParamToIntegers(query.page)[0] || 1;
  const locations = queryParamToStrings(query.location);
  const tags = queryParamToStrings(query.tag).map((tag) => TagTitle.parse(tag));
  const trips = queryParamToStrings(query.trip).map((trip) =>
    TripSlug.parse(trip)
  );
  const order: TOrder =
    queryParamToStrings<TOrder>(query.order)[0] || trips.length > 0
      ? "oldest"
      : "newest";
  const year: number | null = queryParamToIntegers(query.year)[0] || null;
  let month: number | null = queryParamToIntegers(query.month)[0] || null;
  if (month && (month < 1 || month > 12)) month = null;

  // Apply sorting

  const sortedPhotos = allGalleryPhotosList.sort(
    sortGalleryPhotosByDate(order === "oldest")
  );

  // Apply filters

  const filters: TModelFilter<GalleryPhoto>[] = [];

  if (locations.length) {
    filters.push([
      locations,
      (photo) =>
        getLocationHierarchy(photo.meta.location).map(
          (location) => location.slug
        ),
    ]);
  }
  if (tags.length) {
    filters.push([tags, (photo) => photo.meta.tags.map(kebabCase)]);
  }
  if (trips.length) {
    filters.push([
      trips,
      (photo) => (photo.meta.trip ? [photo.meta.trip] : []),
    ]);
  }
  if (month) {
    filters.push([
      [month],
      (photo) => {
        const date = dateFromString(photo.exif.date);
        return date ? [date.month] : [];
      },
    ]);
  }
  if (year) {
    filters.push([
      [year],
      (photo) => {
        const date = dateFromString(photo.exif.date);
        return date ? [date.year] : [];
      },
    ]);
  }

  filters.push([
    [true],
    (photo) => [isPhotoShown(tagsDict, tags || [], photo)],
  ]);

  const filteredPhotos = applyFilterQueries<GalleryPhoto>(
    sortedPhotos,
    filters
  );

  // Apply pagination

  const galleryPages = _.chunk(GALLERY_PHOTOS_PER_PAGE, filteredPhotos);
  const galleryPage = galleryPages[page - 1] || _.last(galleryPages) || [];
  const pages = galleryPages.length;
  page = Math.min(page, pages);

  return {
    props: {
      contentArea: "gallery",
      galleryPhotos: galleryPage,
      locations,
      month,
      order,
      pagination: {
        page,
        pages,
        total: filteredPhotos.length,
      },
      query,
      tags,
      trips,
      year,
    },
  };
};

const GalleryPage: NextPage<IProps> = ({
  galleryPhotos,
  locations,
  month,
  order,
  pagination,
  query,
  tags,
  trips,
  year,
}) => {
  const { page, pages, total } = pagination;

  const showFilter = (values: string[], singular: string, plural: string) => {
    if (!values.length) return undefined;
    const name = pluralise(singular, plural, values.length);
    const valueList = values.sort().join(", ");

    return (
      <h2>
        {name}: {valueList}
      </h2>
    );
  };

  const displayMonth = month
    ? DateTime.fromObject({ month }).toFormat("LLLL")
    : "";
  const displayTrips = trips.map((trip) => {
    const { emoji, title } = allTripsDict[trip];
    if (!title) return trip;
    return `${emoji ? `${emoji} ` : ""}${title}`;
  });

  return (
    <>
      <main className="content-area gallery">
        <div className="gallery-heading">
          <div>
            <h1>Gallery</h1>
            {showFilter(locations.map(titleCase), "Location", "Locations")}
            {showFilter(tags.map(titleCase), "Tag", "Tags")}
            {showFilter(displayTrips, "Trip", "Trips")}
            {(month || year) && (
              <h2>
                Date: {displayMonth} {year}
              </h2>
            )}
          </div>
          <div>
            <p>
              {total} {pluralise("Photo", "Photos", total)} / {pages}{" "}
              {pluralise("Page", "Pages", pages)}
            </p>
          </div>
        </div>
        <GalleryGrid galleryPhotos={galleryPhotos} />
        <GalleryPagination
          order={order}
          page={page}
          pages={pages}
          query={query}
        />
      </main>
      {CONFIG.SHOW_NEWSLETTER_SIGN_UP && <Newsletter />}
    </>
  );
};
export default GalleryPage;
