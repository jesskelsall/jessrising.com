/* eslint-disable security/detect-non-literal-fs-filename */

import fs from "fs";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { BlogPost } from "../../components";
import { DIR_BLOG } from "../../consts";
import {
  asPageTitle,
  getBlogPostTitle,
  getSlugsFromMarkdownFiles,
} from "../../functions";

interface IProps {
  markdown: string;
  slug: string;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  // Get all blog entries
  const blogFiles = fs.readdirSync(DIR_BLOG);
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
    // Read the blog post markdown file
    const fileName = `${context.params?.slug}.md`;
    const filePath = path.join(DIR_BLOG, fileName);
    const markdown = fs.readFileSync(filePath).toString();

    return {
      props: {
        markdown,
        slug: context.params?.slug || "",
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export const BlogPostPage: NextPage<IProps> = ({ markdown, slug }) => {
  const title = asPageTitle(getBlogPostTitle(markdown));

  // Render the markdown into JSX

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <BlogPost markdown={markdown} slug={slug} />
    </>
  );
};

export default BlogPostPage;
