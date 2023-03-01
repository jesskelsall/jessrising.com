import Link from "next/link";
import url from "url";
import { IGalleryQuery } from "../../types/gallery";

interface IGalleryPaginationProps {
  page: number;
  pages: number;
  query: IGalleryQuery;
}

export const GalleryPagination = ({
  page,
  pages,
  query,
}: IGalleryPaginationProps) => {
  const pageLink = (pageNumber: number) =>
    url.format({ pathname: "gallery", query: { ...query, page: pageNumber } });

  const isFirstPage = page === 1;
  const isLastPage = page === pages;

  return (
    <div className="pagination">
      <div className="previous">
        {!isFirstPage && (
          <>
            <Link className="button" href={pageLink(1)}>
              First
            </Link>
            <Link className="button" href={pageLink(page - 1)}>
              Previous
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
              Next
            </Link>
            <Link className="button" href={pageLink(pages)}>
              Last
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
