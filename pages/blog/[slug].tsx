/* eslint-disable security/detect-non-literal-fs-filename */

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BlogOpenGraphHeaders, BlogPost } from "../../components";
import { BlogPostsContext, GalleryPhotosContext } from "../../context";
import {
  asPageTitle,
  getMarkdownTitle,
  getSlugsFromMarkdownFiles,
} from "../../functions";
import {
  getAllBlogPosts,
  getAllGalleryPhotos,
  getContentFileNames,
} from "../../functions/fs";
import { IBlogPost, IGalleryPhoto } from "../../types";

interface IProps {
  blogPost: IBlogPost;
  allBlogPosts: IBlogPost[];
  allGalleryPhotos: IGalleryPhoto[];
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const blogFiles = await getContentFileNames("blog");
  const blogSlugs = getSlugsFromMarkdownFiles(blogFiles);

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
    const allBlogPosts = await getAllBlogPosts();
    const allGalleryPhotos = await getAllGalleryPhotos();

    // Prepare page-specific props
    const blogPost = allBlogPosts.find(
      (post) => post.slug === context.params?.slug
    );

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
  const title = asPageTitle(getMarkdownTitle(blogPost.markdown));

  return (
    <>
      <Head>
        <title>{title}</title>
        <BlogOpenGraphHeaders blogPost={blogPost} />
      </Head>
      <BlogPostsContext.Provider value={allBlogPosts}>
        <GalleryPhotosContext.Provider value={allGalleryPhotos}>
          <BlogPost blogPost={blogPost} />
        </GalleryPhotosContext.Provider>
      </BlogPostsContext.Provider>
    </>
  );
};

export default BlogPostPage;
