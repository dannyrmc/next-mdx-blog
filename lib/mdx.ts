import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import MDXComponents from "@/components/mdx/mdx-components";

const postsDirectory = path.join(process.cwd(), "_posts");

export interface PostFrontmatter {
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: {
    url: string;
    alt: string;
  };
  links: {
    label: string;
    url: string;
  }[];
  visible: boolean;
  reading_time: number;
}

// Calculate reading time based on word count
// Average reading speed is around 200-250 words per minute
export function calculateReadingTime(content: string): number {
  // Remove all HTML tags and MDX component syntax
  const text = content
    .replace(/<[^>]*>/g, "")
    .replace(/import\s+.*?;/g, "")
    .replace(/{.*?}/g, "");

  // Count words by splitting on whitespace
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Calculate reading time (using 225 words per minute as average reading speed)
  const wordsPerMinute = 225;
  const reading_time = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return reading_time;
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { frontmatter, content } = await compileMDX<PostFrontmatter>({
    source: fileContents,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
    },
  });

  // Calculate reading time for the post
  const reading_time = calculateReadingTime(fileContents);

  return {
    slug: realSlug,
    frontmatter,
    content,
    reading_time,
  };
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ""),
  }));
}

export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const { frontmatter, reading_time } = await getPostBySlug(slug);
      return { slug, frontmatter, reading_time };
    })
  );
  return posts;
}
