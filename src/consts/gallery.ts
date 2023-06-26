import { INavigationButtonsText, TOrder } from "../types/gallery";

export const GALLERY_PHOTOS_PER_PAGE = 24;

export const GALLERY_PAGINATION_BUTTONS: Record<
  TOrder,
  INavigationButtonsText
> = {
  newest: {
    first: "Newest",
    previous: "Newer",
    next: "Older",
    last: "Oldest",
  },
  oldest: {
    first: "Oldest",
    previous: "Older",
    next: "Newer",
    last: "Newest",
  },
};
