export const stripSlugDateSuffix = (slug: string): string => {
  const strippedSlug = slug.match(/^(.*)-\d{6}\w{0,1}$/);
  return strippedSlug ? strippedSlug[1] : slug;
};
