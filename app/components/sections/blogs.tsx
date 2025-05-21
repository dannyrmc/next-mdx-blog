import BlogCard from "@/app/components/blog-card";
import { getAllPosts, getAllPostSlugs } from "@/lib/mdx";

export default async function Blogs() {
  // Fetch all posts with frontmatter
  const allPosts = await getAllPosts();

  // Sort posts by most recent date
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();

    // Fallback: If dates can't be parsed, place unparseable items last
    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;

    return dateB - dateA; // Descending order
  });

  // Filter visible posts
  const visiblePosts = sortedPosts.filter((post) => post.frontmatter.visible);

  // Extract featured post (first post) and remaining posts
  const featuredPost = visiblePosts.length > 0 ? visiblePosts[0] : null;
  const remainingPosts = featuredPost ? visiblePosts.slice(1) : visiblePosts;

  // Group remaining posts by year
  const postsByYear = remainingPosts.reduce((acc, post) => {
    // Extract year from date
    const date = new Date(post.frontmatter.date);
    const year = !isNaN(date.getTime())
      ? date.getFullYear().toString()
      : "No Date";

    // Create year group if it doesn't exist
    if (!acc[year]) {
      acc[year] = [];
    }

    // Add post to year group
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof remainingPosts>);

  // Get years in descending order
  const years = Object.keys(postsByYear).sort((a, b) => {
    // Handle "No Date" case
    if (a === "No Date") return 1;
    if (b === "No Date") return -1;
    return Number.parseInt(b) - Number.parseInt(a);
  });

  return (
    <section
      id="work"
      className="noise relative flex basis-full flex-col items-center justify-start border-t border-border/60 bg-secondary px-6 pb-20 pt-24 sm:px-12 sm:pt-32 lg:px-0 lg:pb-36"
    >
      <div className="w-3xl z-10 flex w-full flex-col gap-20 sm:gap-24 lg:max-w-4xl">
        <h1 className="z-10 font-playfair text-5xl font-medium text-foreground sm:text-6xl">
          Articles
        </h1>
        {featuredPost && (
          <div className="z-10 flex w-full flex-col gap-8">
            <h1 className="pl-2 font-sans text-sm font-medium uppercase tracking-widest text-muted sm:text-base">
              —Featured
            </h1>
            <BlogCard
              primary_link={`/blogs/${featuredPost.slug}`}
              image_src={
                featuredPost.frontmatter.coverImage?.url ||
                "/images/placeholder.webp"
              }
              image_alt={
                featuredPost.frontmatter.coverImage?.alt ||
                featuredPost.frontmatter.title
              }
              category_label={featuredPost.frontmatter.category}
              blog_title={featuredPost.frontmatter.title}
              date={featuredPost.frontmatter.date || "No date"}
              reading_time={featuredPost.reading_time || 0}
            />
          </div>
        )}
        <div className="z-10 flex w-full flex-col gap-12">
          {years.map((year) => (
            <div key={year} className="flex w-full flex-1 flex-col gap-6">
              <h2 className="pl-2 font-sans text-base font-medium uppercase tracking-widest text-muted sm:text-lg">
                —{year}
              </h2>
              {postsByYear[year].map((post) => (
                <BlogCard
                  key={post.slug}
                  primary_link={`/blogs/${post.slug}`}
                  category_label={post.frontmatter.category}
                  blog_title={post.frontmatter.title}
                  date={post.frontmatter.date || "No date"}
                  reading_time={post.reading_time || 0}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
