/* eslint-disable security/detect-non-literal-fs-filename */

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BlogPost } from "../../../components/BlogPost/BlogPost";
import { Newsletter } from "../../../components/Newsletter/Newsletter";
import { OpenGraphHeaders } from "../../../components/OpenGraphHeaders/OpenGraphHeaders";
import { CONFIG } from "../../../consts/config";
import { BlogPostContext } from "../../../context/blogPost";
import { BlogPostsContext } from "../../../context/blogPosts";
import { GalleryPhotoSlugsContext } from "../../../context/galleryPhotoSlugs";
import blogPostsJSON from "../../../data/blogPosts.json";
import galleryPhotosJSON from "../../../data/galleryPhotos.json";
import {
  getMarkdownDataBySlug,
  getOtherMarkdownData,
} from "../../../functions/data";
import { asPageTitle } from "../../../functions/title";
import { GalleryPhotos } from "../../../types/galleryPhoto";
import { IMarkdownData, TMarkdownDataFile } from "../../../types/markdownOld";

const blogPostsData = blogPostsJSON as TMarkdownDataFile;
const galleryPhotosData = galleryPhotosJSON as GalleryPhotos;

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  blogPost: IMarkdownData;
  allBlogPosts: IMarkdownData[];
  galleryPhotoSlugs: string[];
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
    const galleryPhotoSlugs = Object.keys(galleryPhotosData);

    const slug = context.params?.slug;
    if (!slug) return { notFound: true };

    // Prepare page-specific props
    const blogPost = getMarkdownDataBySlug(blogPostsData, slug);

    if (!blogPost) return { notFound: true };

    return {
      props: {
        allBlogPosts,
        blogPost,
        galleryPhotoSlugs,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const BlogPostPage: NextPage<IProps> = ({
  allBlogPosts,
  blogPost,
  galleryPhotoSlugs,
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
      <GalleryPhotoSlugsContext.Provider value={galleryPhotoSlugs}>
        <BlogPostsContext.Provider value={allBlogPosts}>
          <BlogPostContext.Provider value={blogPost}>
            <BlogPost />
          </BlogPostContext.Provider>
        </BlogPostsContext.Provider>
      </GalleryPhotoSlugsContext.Provider>
      {CONFIG.SHOW_NEWSLETTER_SIGN_UP && <Newsletter />}
    </>
  );
};

export default BlogPostPage;
