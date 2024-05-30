import blogPostsJSON from "../../src/data/blogPosts.json";
import { allGalleryPhotoSlugs } from "../../src/data/galleryPhotos";
import { FEATURED_BLOG_POST, FEATURED_PHOTO } from "../../src/pages";

describe("Featured Content", () => {
  test("Featured blog post exists", () => {
    expect.assertions(1);

    if (FEATURED_BLOG_POST) {
      expect(blogPostsJSON).toHaveProperty(FEATURED_BLOG_POST);
    } else {
      expect(FEATURED_BLOG_POST).toBe("");
    }
  });

  test("Featured photo exists", () => {
    expect.assertions(1);

    if (FEATURED_PHOTO) {
      expect(allGalleryPhotoSlugs).toEqual(
        expect.arrayContaining([FEATURED_PHOTO])
      );
    } else {
      expect(FEATURED_PHOTO).toBe("");
    }
  });
});
