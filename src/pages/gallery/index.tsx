import { isPhotoShown } from "@/functions/photo";
import _, { kebabCase } from "lodash/fp";
import { DateTime } from "luxon";
import { GetServerSideProps, NextPage } from "next";
import { GalleryGrid } from "../../components/GalleryGrid";
import { GalleryPagination } from "../../components/GalleryPagination";
import { TContentArea } from "../../components/Header";
import { OpenGraphHeaders } from "../../components/OpenGraphHeaders";
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
import { stripSlugDateSuffix } from "../../functions/slug";
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
  location: string | null;
  month: number | null;
  order: TOrder;
  pagination: IPagination;
  query: IGalleryQuery;
  strict: boolean;
  tags: TagTitle[];
  title: string | null;
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
  const location = queryParamToStrings(query.location)[0] || null;
  const strict = queryParamToStrings(query.strict).length > 0;
  const tags = queryParamToStrings(query.tag).map((tag) => TagTitle.parse(tag));
  const title = queryParamToStrings(query.title)[0] || null;
  const trips = queryParamToStrings(query.trip).map((trip) =>
    TripSlug.parse(trip)
  );
  const order: TOrder =
    queryParamToStrings<TOrder>(query.order)[0] || trips.length > 0
      ? "oldest"
      : "newest";
  const year = queryParamToIntegers(query.year)[0] || null;
  let month = queryParamToIntegers(query.month)[0] || null;
  if (month && (month < 1 || month > 12)) month = null;

  // Apply sorting

  const sortedPhotos = allGalleryPhotosList.sort(
    sortGalleryPhotosByDate(order === "oldest")
  );

  // Apply filters

  const filters: TModelFilter<GalleryPhoto>[] = [];

  if (location) {
    filters.push([
      [location],
      (photo) => {
        const locationSlugs = getLocationHierarchy(photo.meta.location).map(
          (loc) => loc.slug
        );
        return strict ? locationSlugs.slice(0, 1) : locationSlugs;
      },
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
  if (title) {
    filters.push([
      [true],
      (photo) => [stripSlugDateSuffix(photo.slug) === title],
    ]);
  }

  // TODO always show a photo

  filters.push([
    [true],
    (photo) => [
      isPhotoShown({
        appliedLocationSlug: location,
        appliedTagSlugs: tags || [],
        photo,
        tagsDict,
      }),
    ],
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
      location,
      month,
      order,
      pagination: {
        page,
        pages,
        total: filteredPhotos.length,
      },
      query,
      strict,
      tags,
      title,
      trips,
      year,
    },
  };
};

const GalleryPage: NextPage<IProps> = ({
  galleryPhotos,
  location,
  month,
  order,
  pagination,
  query,
  strict,
  tags,
  title,
  trips,
  year,
}) => {
  const { page, pages, total } = pagination;

  const showFilter = (values: string[], singular: string, plural: string) => {
    if (!values.length) return undefined;
    const name = pluralise(singular, plural, values.length);
    const valueList = values.sort().join(", ");

    return (
      <h2 className="mb-3 mt-0">
        {name}: {valueList}
      </h2>
    );
  };

  const displayMonth = month
    ? DateTime.fromObject({ month }).toFormat("LLLL")
    : "";
  const displayTrips = trips.map((trip) => {
    const { emoji, title: tripTitle } = allTripsDict[trip];
    if (!tripTitle) return trip;
    return `${emoji ? `${emoji} ` : ""}${tripTitle}`;
  });

  const trip = trips.length === 1 ? allTripsDict[trips[0]] : undefined;

  return (
    <>
      {trip && (
        <OpenGraphHeaders
          date={trip.dates.to || trip.dates.from}
          description={trip.description || undefined}
          imageSlug={trip.thumbnail}
          urlPath={`gallery?trip=${trip.slug}`}
          title={`Trip: ${trip.title}`}
        />
      )}
      <main className="mx-auto w-full max-w-grid-1 px-2 grid-2:max-w-grid-2 grid-3:max-w-grid-3 grid-4:max-w-grid-4">
        <div className="grid-2:flex grid-2:items-end grid-2:justify-between">
          <div>
            <h1>Gallery</h1>
            {title && (
              <h2>Title: {galleryPhotos[0]?.title || titleCase(title)}</h2>
            )}
            {location && (
              <h2>
                Location: {titleCase(location)}
                {strict && " (only)"}
              </h2>
            )}
            {showFilter(tags.map(titleCase), "Tag", "Tags")}
            {showFilter(displayTrips, "Trip", "Trips")}
            {(month || year) && (
              <h2>
                Date: {displayMonth} {year}
              </h2>
            )}
          </div>
          <p className="grid-2:mb-3 grid-2:mt-0">
            {total} {pluralise("Photo", "Photos", total)} / {pages}{" "}
            {pluralise("Page", "Pages", pages)}
          </p>
        </div>
        <GalleryGrid galleryPhotos={galleryPhotos} />
        <GalleryPagination
          order={order}
          page={page}
          pages={pages}
          query={query}
        />
      </main>
    </>
  );
};
export default GalleryPage;
