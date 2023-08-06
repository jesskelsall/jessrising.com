import _, { kebabCase } from "lodash/fp";
import { DateTime } from "luxon";
import { GetServerSideProps, NextPage } from "next";
import { GalleryGrid } from "../../components/GalleryGrid/GalleryGrid";
import { GalleryPagination } from "../../components/GalleryPagination/GalleryPagination";
import { TContentArea } from "../../components/Header/Header";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { CONFIG } from "../../consts/config";
import { GALLERY_PHOTOS_PER_PAGE } from "../../consts/gallery";
import { allGalleryPhotosList } from "../../data/galleryPhotos";
import { dateFromGalleryPhoto } from "../../functions/date";
import { TModelFilter, applyFilterQueries } from "../../functions/filter";
import { getLocationHierarchy } from "../../functions/location";
import {
  queryParamToIntegers,
  queryParamToStrings,
} from "../../functions/params";
import { sortGalleryPhotosByDate } from "../../functions/sort";
import { pluralise, titleCase } from "../../functions/title";
import { IGalleryQuery, TOrder } from "../../types/gallery";
import { GalleryPhoto } from "../../types/galleryPhoto";
import { isPhotoShown } from "../../functions/photo";
import { allTags } from "../../data/tags";
import { TagId } from "../../types/tag";

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
  tags: string[];
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
  const tags = queryParamToStrings(query.tag).map((tag) => TagId.parse(tag));
  const order: TOrder =
    queryParamToStrings<TOrder>(query.order)[0] === "oldest"
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
      (photo) => getLocationHierarchy(photo.meta.location).map(kebabCase),
    ]);
  }
  if (tags.length) {
    filters.push([tags, (photo) => photo.meta.tags.map(kebabCase)]);
  }
  if (month) {
    filters.push([
      [month],
      (photo) => {
        const date = dateFromGalleryPhoto(photo);
        return date ? [date.month] : [];
      },
    ]);
  }
  if (year) {
    filters.push([
      [year],
      (photo) => {
        const date = dateFromGalleryPhoto(photo);
        return date ? [date.year] : [];
      },
    ]);
  }

  filters.push([[true], (photo) => [isPhotoShown(allTags, tags || [], photo)]]);

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
  year,
}) => {
  const { page, pages, total } = pagination;

  const showFilter = (values: string[], singular: string, plural: string) => {
    if (!values.length) return undefined;
    const name = pluralise(singular, plural, values.length);
    const valueList = values.sort().map(titleCase).join(", ");

    return (
      <h2>
        {name}: {valueList}
      </h2>
    );
  };

  const displayMonth = month
    ? DateTime.fromObject({ month }).toFormat("LLLL")
    : "";

  return (
    <>
      <main className="content-area gallery">
        <div className="gallery-heading">
          <div>
            <h1>Gallery</h1>
            {showFilter(locations, "Location", "Locations")}
            {showFilter(tags, "Tag", "Tags")}
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
