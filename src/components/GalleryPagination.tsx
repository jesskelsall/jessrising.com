import url from "url";
import { GALLERY_PAGINATION_BUTTONS } from "../consts/gallery";
import { IGalleryQuery, TOrder } from "../types/gallery";
import { LinkButton } from "./LinkButton";

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
    <div className="mt-2 flex gap-2 sm:mt-6">
      <div className="flex flex-1 justify-start gap-2">
        {!isFirstPage && (
          <>
            <LinkButton href={pageLink(1)}>{buttonsText.first}</LinkButton>
            <LinkButton href={pageLink(page - 1)}>
              {buttonsText.previous}
            </LinkButton>
          </>
        )}
      </div>
      <div className="flex flex-1 items-center justify-center">
        <span>
          Page {page} of {pages}
        </span>
      </div>
      <div className="flex flex-1 justify-end gap-2">
        {!isLastPage && (
          <>
            <LinkButton href={pageLink(page + 1)}>
              {buttonsText.next}
            </LinkButton>
            <LinkButton href={pageLink(pages)}>{buttonsText.last}</LinkButton>
          </>
        )}
      </div>
    </div>
  );
};
