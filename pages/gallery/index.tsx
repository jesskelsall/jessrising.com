import _ from "lodash/fp";
import { DateTime } from "luxon";
import { GetServerSideProps, NextPage } from "next";
import { GalleryGrid } from "../../components/GalleryGrid/GalleryGrid";
import { GalleryPagination } from "../../components/GalleryPagination/GalleryPagination";
import { TContentArea } from "../../components/Header/Header";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { GALLERY_PHOTOS_PER_PAGE } from "../../consts/gallery";
import galleryPhotosJSON from "../../data/galleryPhotos.json";
import { getOtherMarkdownData } from "../../functions/data";
import { getPhotoDate } from "../../functions/date";
import { applyFilterQueries, TModelFilter } from "../../functions/filter";
import {
  queryParamToIntegers,
  queryParamToStrings,
} from "../../functions/params";
import { sortGalleryPhotosByDate } from "../../functions/sort";
import { pluralise, titleCase } from "../../functions/title";
import { IGalleryQuery } from "../../types/gallery";
import { IMarkdownData, TMarkdownDataFile } from "../../types/markdown";

const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

interface IPagination {
  page: number;
  pages: number;
  total: number;
}

interface IProps {
  contentArea: TContentArea;
  galleryPhotos: IMarkdownData[];
  locations: string[];
  month: number | null;
  pagination: IPagination;
  query: IGalleryQuery;
  tags: string[];
  year: number | null;
}

export const getServerSideProps: GetServerSideProps<
  IProps,
  IGalleryQuery
> = async (context) => {
  const allPhotos = getOtherMarkdownData(galleryPhotosData).sort(
    sortGalleryPhotosByDate
  );

  // Query parameters

  const query = context.query as IGalleryQuery;

  let page = queryParamToIntegers(query.page)[0] || 1;
  const locations = queryParamToStrings(query.location);
  const tags = queryParamToStrings(query.tag);

  const year: number | null = queryParamToIntegers(query.year)[0] || null;
  let month: number | null = queryParamToIntegers(query.month)[0] || null;
  if (month && (month < 1 || month > 12)) month = null;

  // Apply filters

  const filters: TModelFilter<IMarkdownData>[] = [];

  if (locations.length) {
    filters.push([locations, (photo) => photo.meta.locations?.flat() || []]);
  }
  if (tags.length) {
    filters.push([tags, (photo) => photo.meta.tags || []]);
  }
  if (month) {
    filters.push([
      [month.toString()],
      (photo) => {
        const date = getPhotoDate(photo);
        return date ? [date.month.toString()] : [];
      },
    ]);
  }
  if (year) {
    filters.push([
      [year.toString()],
      (photo) => {
        const date = getPhotoDate(photo);
        return date ? [date.year.toString()] : [];
      },
    ]);
  }

  const filteredPhotos = applyFilterQueries<IMarkdownData>(allPhotos, filters);

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
        <GalleryPagination page={page} pages={pages} query={query} />
      </main>
      <Newsletter />
    </>
  );
};
export default GalleryPage;
