import blogPostsJSON from "../../src/data/blogPosts.json";
import { allGalleryPhotoSlugs } from "../../src/data/galleryPhotos";
import { FEATURED_BLOG_POST, FEATURED_PHOTO } from "../../src/pages";

describe("Featured Content", () => {
  test("Featured blog post exists", () => {
    expect(blogPostsJSON).toHaveProperty(FEATURED_BLOG_POST);
  });

  test("Featured photo exists", () => {
    expect(allGalleryPhotoSlugs).toEqual(
      expect.arrayContaining([FEATURED_PHOTO])
    );
  });
});
