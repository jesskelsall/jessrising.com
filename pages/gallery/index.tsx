import _ from "lodash/fp";
import { GetServerSideProps, NextPage } from "next";
import { GalleryGrid, GalleryPagination } from "../../components";
import { TContentArea } from "../../components/Header/Header";
import { GALLERY_PHOTOS_PER_PAGE } from "../../consts";
import galleryPhotosJSON from "../../data/galleryPhotos.json";
import {
  applyFilterQueries,
  getOtherMarkdownData,
  pluralise,
  sortGalleryPhotosByDate,
  titleCase,
  TModelFilter,
} from "../../functions";
import {
  queryParamToIntegers,
  queryParamToStrings,
} from "../../functions/params";
import { IGalleryQuery, IMarkdownData, TMarkdownDataFile } from "../../types";

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
  pagination: IPagination;
  query: IGalleryQuery;
  tags: string[];
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

  // Apply filters

  const filters: TModelFilter<IMarkdownData>[] = [];

  if (locations.length) {
    filters.push([locations, (photo) => photo.meta.locations?.flat() || []]);
  }
  if (tags.length) {
    filters.push([tags, (photo) => photo.meta.tags || []]);
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
      pagination: {
        page,
        pages,
        total: filteredPhotos.length,
      },
      query,
      tags,
    },
  };
};

const GalleryPage: NextPage<IProps> = ({
  galleryPhotos,
  locations,
  pagination,
  query,
  tags,
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

  return (
    <main className="content-area gallery">
      <div className="gallery-heading">
        <div>
          <h1>Gallery</h1>
          {showFilter(locations, "Location", "Locations")}
          {showFilter(tags, "Tag", "Tags")}
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
  );
};
export default GalleryPage;
