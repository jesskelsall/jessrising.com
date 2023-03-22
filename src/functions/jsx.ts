import _ from "lodash/fp";
import { ReactNode } from "react";

// Separates array with the given element
export const zipBetween = (
  list: ReactNode[],
  between: ReactNode
): ReactNode[] => _.zip(list, Array(list.length - 1).fill(between)).flat();
