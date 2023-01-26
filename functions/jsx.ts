export const zipBetween = <Element = JSX.Element, Between = string>(
  list: Element[],
  between: Between
): (Element | Between)[] =>
  list.reduce(
    (collated, nextElement) =>
      collated.length ? [...collated, between, nextElement] : [nextElement],
    [] as (Element | Between)[]
  );
