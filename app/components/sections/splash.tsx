import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import BlogCard from "@/app/components/blog-card";

export default function Splash() {
  return (
    <section
      id="splash"
      className="noise flex min-h-[85vh] w-full flex-col items-center justify-between"
    >
      <div className="flex w-full max-w-3xl flex-1 flex-col-reverse items-center justify-center gap-8 px-6 sm:max-w-4xl sm:px-12 md:flex-row md:justify-between lg:px-0">
        <div className="flex w-full flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-12 sm:pb-3 md:flex-col md:items-start md:gap-6">
          <h1 className="font-playfair text-[88px] font-normal leading-none tracking-tight text-primary">
            Blog.
          </h1>
          <div className="flex flex-col items-start justify-start gap-5 sm:gap-4 md:gap-5">
            <p className="max-w-[28ch] text-start font-sans text-[16px] font-normal leading-[160%] tracking-normal text-primary sm:text-balance sm:text-[18px] md:max-w-[30ch] md:text-wrap">
              Crafted blog template built using Next.js, Tailwind CSS, and MDX.
            </p>
            <Button asChild>
              <Link href={siteConfig.repos.blog}>View Source</Link>
            </Button>
          </div>
        </div>
        <div className="relative z-20 hidden w-full max-w-96 items-center justify-center md:flex">
          <BlogCard
            primary_link={`/blogs/blog-1`}
            blog_title="Long Overdue Design Case Study"
            category_label="UX Design"
            date="2025-05-03"
            reading_time={3}
          />
          <div className="absolute inset-0 z-10 mx-auto my-auto size-80 rounded-full bg-indigo-200 blur-2xl dark:bg-indigo-800"></div>
        </div>
      </div>
      <div className="line-grid h-[73px] w-full bg-transparent p-3" />
    </section>
  );
}
