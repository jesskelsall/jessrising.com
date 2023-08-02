import { parseMarkdownGalleryPhoto } from "../../../src/functions/markdownGalleryPhoto";

describe("parseMarkdownGalleryPhoto", () => {
  test("returns a complete gallery photo (extracted EXIF properties)", () => {
    const slug = "the-old-man-of-storr";
    const lines: string[] = [
      "# The Old Man of Storr",
      "",
      "- GPS: 57.511208333333336,-6.1741472222222225",
      "- Location: The Storr",
      "- Tags: Landscape, Loch",
      "- Camera: Apple iPhone 11 Pro Max",
      "- Date: 2022-06-05T11:26:39.000+01:00",
      "- Dimensions: 4032x3024",
      "",
      "Three jagged pillars of rock protrude from the green ground at the base of the [Trotternish](https://en.wikipedia.org/wiki/Trotternish) landslip. Further down the hill, the land gives way to a procession of alternating water and hilly land: Loch Leathan, the western edge of Trotternish, the Sound of Raasay, the Isle of Rasaay, the Inner Sound, then finally the Scottish mainland. On the horizon, the [Cullin](https://en.wikipedia.org/wiki/Cuillin) mountain ranges, most notably the Black Cullin directly behind the jagged pillars - known as the Old Man of Storr. The sky and distant air is vivid blue.",
      "",
      "If Scotland could be represented in a single photo, this would be it. Climbing from the car park a short drive north of Portree, a short hike leads under or through the Old Man. The best view can be found from the dome-shaped hill behind it; from here the view is its most dramatic, a balance of the pillars below and the incredible rolling land beyond.",
      "",
      "Landscape photography taken on perfectly clear days can be uninspiring for their lack of interest above the horizon, but I feel this one is an easy exception - a lack of haze on the horizon lays bare the stunning geography of Skye.",
    ];

    const result = parseMarkdownGalleryPhoto(slug, lines.join("\n"));
    expect(result).toEqual({
      slug,
      title: "The Old Man of Storr",
      exif: {
        camera: {
          name: "Apple iPhone 11 Pro Max",
        },
        date: "2022-06-05T11:26:39.000+01:00",
        dimensions: {
          height: 3024,
          width: 4032,
        },
      },
      markdown: [...lines.slice(0, 2), ...lines.slice(8)].join("\n"),
      meta: {
        gps: {
          lat: 57.511208333333336,
          long: -6.1741472222222225,
        },
        location: ["The Storr", "Isle of Skye", "Scotland", "United Kingdom"],
        tags: ["Landscape", "Loch"],
      },
    });
  });

  test("returns a complete gallery photo (EXIF JSON)", () => {
    const slug = "rowing-boat-on-loch-arkaig";
    const lines: string[] = [
      "# Rowing Boat on Loch Arkaig",
      "",
      "- Location: Loch Arkaig",
      "- Tags: Landscape, Loch",
      '- EXIF: `{"date":"2023-07-30T10:32:58.000+01:00","dimensions":{"height":6336,"width":9504},"camera":{"name":"Sony ɑ7R V","lens":"Sony FE 24-70mm F2.8 GM II","settings":{"exposureBias":0,"exposureTime":0.016666666666666666,"focalLength":51,"fStop":22,"ISO":500}}}`',
    ];

    const result = parseMarkdownGalleryPhoto(slug, lines.join("\n"));

    expect(result).toEqual({
      slug,
      title: "Rowing Boat on Loch Arkaig",
      exif: {
        camera: {
          name: "Sony ɑ7R V",
          lens: "Sony FE 24-70mm F2.8 GM II",
          settings: {
            exposureBias: 0,
            exposureTime: 0.016666666666666666,
            focalLength: 51,
            fStop: 22,
            ISO: 500,
          },
        },
        date: "2023-07-30T10:32:58.000+01:00",
        dimensions: {
          height: 6336,
          width: 9504,
        },
      },
      markdown: [...lines.slice(0, 2)].join("\n"),
      meta: {
        location: ["Loch Arkaig", "Lochaber", "Scotland", "United Kingdom"],
        tags: ["Landscape", "Loch"],
      },
    });
  });

  test("returns a minimally defined gallery photo", () => {
    const lines: string[] = [];
    const slug = "a-sad-photo";

    const result = parseMarkdownGalleryPhoto(slug, lines.join("\n"));
    expect(result).toEqual({
      slug,
      title: slug,
      exif: {},
      markdown: lines.join("\n"),
      meta: {},
    });
  });
});
