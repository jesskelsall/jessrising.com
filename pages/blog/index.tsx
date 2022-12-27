/* eslint-disable security/detect-non-literal-fs-filename */

import fs from "fs";
import { GetStaticProps, NextPage } from "next";
import path from "path";
import { BlogPreview } from "../../components";
import { DIR_BLOG } from "../../consts";
import { getSlugsFromMarkdownFiles } from "../../functions";
import { IBlogPost } from "../../types";

interface IProps {
  blogPosts: IBlogPost[];
}

export const getStaticProps: GetStaticProps<IProps> = async () => {
  // Get all blog entries
  const blogFiles = fs.readdirSync(DIR_BLOG);
  const slugs = getSlugsFromMarkdownFiles(blogFiles);

  const blogPosts = slugs.map((slug) => {
    const filePath = path.join(DIR_BLOG, `${slug}.md`);
    const markdown = fs.readFileSync(filePath).toString();

    return { markdown, slug };
  });

  return {
    props: {
      blogPosts,
    },
  };
};

const BlogPage: NextPage<IProps> = ({ blogPosts }) => (
  <>
    <h1>Blog</h1>
    <ul>
      {blogPosts.map((blogPost) => (
        <BlogPreview key={blogPost.slug} {...blogPost} />
      ))}
    </ul>
  </>
);

export default BlogPage;
