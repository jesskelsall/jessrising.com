/* eslint-disable security/detect-non-literal-fs-filename */

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BlogPost } from "../../components";
import { BlogPostsContext } from "../../context/blogPosts";
import {
  asPageTitle,
  getBlogPostTitle,
  getSlugsFromMarkdownFiles,
} from "../../functions";
import { getAllBlogPosts, getContentFileNames } from "../../functions/fs";
import { IBlogPost } from "../../types";

interface IProps {
  blogPost: IBlogPost;
  allBlogPosts: IBlogPost[];
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
    const allBlogPosts = await getAllBlogPosts();
    const blogPost = allBlogPosts.find(
      (post) => post.slug === context.params?.slug
    );

    if (!blogPost) return { notFound: true };

    return {
      props: {
        allBlogPosts,
        blogPost,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const BlogPostPage: NextPage<IProps> = ({ allBlogPosts, blogPost }) => {
  const title = asPageTitle(getBlogPostTitle(blogPost.markdown));

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <BlogPostsContext.Provider value={allBlogPosts}>
        <BlogPost blogPost={blogPost} />
      </BlogPostsContext.Provider>
    </>
  );
};

export default BlogPostPage;
