import Link from "next/link";
import url from "url";
import { GALLERY_PAGINATION_BUTTONS } from "../consts/gallery";
import { IGalleryQuery, TOrder } from "../types/gallery";

interface IGalleryPaginationProps {
  order: TOrder;
  page: number;
  pages: number;
  query: IGalleryQuery;
}

export const GalleryPagination = ({
  order,
  page,
  pages,
  query,
}: IGalleryPaginationProps) => {
  const pageLink = (pageNumber: number) =>
    url.format({ pathname: "gallery", query: { ...query, page: pageNumber } });
  const buttonsText = GALLERY_PAGINATION_BUTTONS[`${order}`];

  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  return (
    <div className="pagination">
      <div className="previous">
        {!isFirstPage && (
          <>
            <Link className="button" href={pageLink(1)}>
              {buttonsText.first}
            </Link>
            <Link className="button" href={pageLink(page - 1)}>
              {buttonsText.previous}
            </Link>
          </>
        )}
      </div>
      <div className="current">
        <span>
          Page {page} of {pages}
        </span>
      </div>
      <div className="next">
        {!isLastPage && (
          <>
            <Link className="button" href={pageLink(page + 1)}>
              {buttonsText.next}
            </Link>
            <Link className="button" href={pageLink(pages)}>
              {buttonsText.last}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
