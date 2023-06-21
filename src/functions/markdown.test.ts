import { parsePhotoSlugFromSrc } from "./markdown";

describe("parsePhotoSlugFromSrc", () => {
  test("Gets string from relative path", () => {
    expect(parsePhotoSlugFromSrc("../../relative-path.jpeg")).toBe(
      "relative-path"
    );
  });

  test("Gets string from URL", () => {
    expect(parsePhotoSlugFromSrc("https://url.com/path/url-path.jpeg")).toBe(
      "url-path"
    );
  });

  test("Removes photo size suffix", () => {
    expect(parsePhotoSlugFromSrc("rendered-image-lg.jpeg")).toBe(
      "rendered-image"
    );
  });
});
