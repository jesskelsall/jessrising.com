/* eslint-disable security/detect-non-literal-fs-filename */

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BlogPost, OpenGraphHeaders } from "../../../components";
import {
  BlogPostContext,
  BlogPostsContext,
  GalleryPhotosContext,
} from "../../../context";
import blogPostsJSON from "../../../data/blogPosts.json";
import galleryPhotosJSON from "../../../data/galleryPhotos.json";
import {
  asPageTitle,
  getMarkdownDataBySlug,
  getOtherMarkdownData,
} from "../../../functions";
import { IMarkdownData, TMarkdownDataFile } from "../../../types";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;
const galleryPhotosData = galleryPhotosJSON as TMarkdownDataFile;

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  blogPost: IMarkdownData;
  allBlogPosts: IMarkdownData[];
  allGalleryPhotos: IMarkdownData[];
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const blogSlugs = Object.keys(blogPostsData);

  return {
    paths: blogSlugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProps, IParams> = async (
  context
) => {
  try {
    // Get context data
    const allBlogPosts = getOtherMarkdownData(blogPostsData);
    const allGalleryPhotos = getOtherMarkdownData(galleryPhotosData);

    const slug = context.params?.slug;
    if (!slug) return { notFound: true };

    // Prepare page-specific props
    const blogPost = getMarkdownDataBySlug(blogPostsData, slug);

    if (!blogPost) return { notFound: true };

    return {
      props: {
        allBlogPosts,
        allGalleryPhotos,
        blogPost,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const BlogPostPage: NextPage<IProps> = ({
  allBlogPosts,
  allGalleryPhotos,
  blogPost,
}) => {
  const { date, slug, summary } = blogPost;

  const title = asPageTitle(summary.heading);

  return (
    <>
      <Head>
        <title>{title}</title>
        <OpenGraphHeaders
          date={date}
          description={summary.paragraph}
          imageSlug={summary.imageSlug}
          urlPath={`blog/p/${slug}`}
          title={summary.heading}
        />
      </Head>
      <GalleryPhotosContext.Provider value={allGalleryPhotos}>
        <BlogPostsContext.Provider value={allBlogPosts}>
          <BlogPostContext.Provider value={blogPost}>
            <BlogPost />
          </BlogPostContext.Provider>
        </BlogPostsContext.Provider>
      </GalleryPhotosContext.Provider>
    </>
  );
};

export default BlogPostPage;
