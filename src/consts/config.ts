type ConfigProperty =
  | "SHOW_FEATURED_BLOG_POST"
  | "SHOW_FEATURED_PHOTO"
  | "SHOW_NEWSLETTER_SIGN_UP";

export const CONFIG: Record<ConfigProperty, boolean> = {
  SHOW_FEATURED_BLOG_POST: false,
  SHOW_FEATURED_PHOTO: true,
  SHOW_NEWSLETTER_SIGN_UP: false,
};
