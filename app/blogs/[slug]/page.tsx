import { Metadata } from 'next';
import { ReactNode } from "react";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { MDXContent } from "@/components/mdx/mdx-content";
import Category from "@/components/category";
import { FormattedDate } from "@/components/date";
import BlogCard from "@/app/components/blog-card";

// Define interfaces for the data structures
interface CoverImage {
  url: string;
  alt?: string;
}

interface Frontmatter {
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: CoverImage;
  visible?: boolean;
}

// Full post with content (used for the current post)
interface Post {
  slug: string;
  content: ReactNode; // Updated to ReactNode based on MDXContent component
  frontmatter: Frontmatter;
  reading_time?: number;
}

// Other posts without content (used for the list of posts)
interface OtherPosts {
  slug: string;
  frontmatter: Frontmatter;
  reading_time?: number;
}

interface BlogParams {
  slug: string;
}

// Function to extract and format post name from slug
const getPostNameFromSlug = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

async function getPostData(slug: string): Promise<Post | null> {
  try {
    const post = await getPostBySlug(slug);
    if (!post) {
      return null;
    }
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: BlogParams }): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return {};
  }

  const { title, author, date, category, excerpt, coverImage } =
    post.frontmatter;
  const postName = getPostNameFromSlug(params.slug);
  const ogImage = coverImage?.url || `${siteConfig.url}/og.jpg`;

  return {
    title: `${postName} | ${siteConfig.name}`,
    description: excerpt,
    openGraph: {
      title: title,
      description: excerpt,
      url: `${siteConfig.url}blogs/${params.slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: coverImage?.alt || title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: date,
      authors: [author],
      tags: [category],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: excerpt,
      images: [ogImage],
      creator: `@${siteConfig.username}`,
    },
  };
}

interface MoreBlogsProps {
  currentSlug: string;
  allPosts: OtherPosts[]; // Changed from PostListItem[] to OtherPosts[]
}

const MoreBlogs: React.FC<MoreBlogsProps> = ({ currentSlug, allPosts }) => {
  const sortedPosts = allPosts
    .filter(
      (post) =>
        post.slug !== currentSlug &&
        post.frontmatter &&
        post.frontmatter.visible === true
    )
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date || 0).getTime() -
        new Date(a.frontmatter.date || 0).getTime()
    )
    .slice(0, 2); // Limit to 2 most recent posts

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
      {sortedPosts.map((post) => (
        <BlogCard
          key={post.slug}
          primary_link={`/blogs/${post.slug}`}
          image_src={
            post.frontmatter.coverImage?.url || "/images/placeholder.webp"
          }
          image_alt={post.frontmatter.coverImage?.alt || post.frontmatter.title}
          category_label={post.frontmatter.category}
          blog_title={post.frontmatter.title}
          date={post.frontmatter.date || "No date"}
          reading_time={post.reading_time || 0}
        />
      ))}
    </div>
  );
};

interface PostProps {
  params: BlogParams;
}

export default async function Post({ params }: PostProps) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  // Update the type annotation for getAllPosts
  const allPosts = await getAllPosts() as OtherPosts[];

  return (
    <div className="flex flex-col">
      <section
        id="content"
        className="relative flex basis-full flex-col items-start justify-start gap-10 border-b-[1px] border-border/60 bg-background px-6 pt-20 md:px-0"
      >
        <article className="mx-auto flex w-full max-w-[480px] flex-col pb-[72px] pt-16 sm:pb-[72px] sm:pt-[88px] lg:max-w-2xl">
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-5 sm:gap-6">
              <h1 className="text-balance px-[2px] font-playfair text-[40px] font-medium leading-[110%] tracking-tight sm:text-[56px]">
                {post.frontmatter.title}
              </h1>
              <div className="flex flex-wrap justify-start gap-4">
                <Category category_label={post.frontmatter.category} />
                <div className="flex items-center gap-1.5 font-sans text-sm font-normal text-foreground sm:px-0 sm:text-base">
                  <FormattedDate date={post.frontmatter.date} />
                  <p>·</p>
                  <p>{post.reading_time || 0} min read</p>
                </div>
              </div>
            </div>
            {/* <div className="flex h-[1px] w-full bg-border/60"></div> */}
          </div>
          <div className="mt-5 sm:mt-10">
            <MDXContent content={post.content} />
          </div>
        </article>
      </section>
      <section className="noise z-30 bg-secondary px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-[480px] lg:max-w-4xl">
          <div className="flex flex-col gap-14">
            <h2 className="px-[4px] font-playfair text-[44px] font-semibold leading-none tracking-tight text-foreground sm:text-[48px]">
              Up Next
            </h2>
            <MoreBlogs currentSlug={params.slug} allPosts={allPosts} />
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams(): Promise<BlogParams[]> {
  const posts = await getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}