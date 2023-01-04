import { TListRenderer } from "../../types";
import { BlogRelatedPosts } from "../BlogRelatedPosts";

const ORDERED_LIST_RENDERERS: Record<string, TListRenderer> = {
  Related: BlogRelatedPosts,
};

export const getZeroListItemText = (
  listItems: JSX.Element[],
  start: number
): string | undefined => {
  if (start !== 0) return undefined;

  const zeroListItemText = listItems[0]?.props.children[0];
  if (typeof zeroListItemText !== "string") return undefined;

  return zeroListItemText || undefined;
};

interface IMarkdownOrderedListProps {
  children: JSX.Element[];
  start: number;
}

/**
 * Render an ordered list and its items
 * 0th list items are used to denote different components to render
 */
export const MarkdownOrderedList = ({
  children,
  start,
}: IMarkdownOrderedListProps) => {
  // Check if another component should be rendered
  const zeroListItemText = getZeroListItemText(children, start);

  if (zeroListItemText) {
    const ListRenderer = ORDERED_LIST_RENDERERS[`${zeroListItemText}`];

    // Render using the specified component, omitting the 0th identifier
    if (ListRenderer) {
      return <ListRenderer>{children.slice(1)}</ListRenderer>;
    }
  }

  return <ol start={start}>{children}</ol>;
};
