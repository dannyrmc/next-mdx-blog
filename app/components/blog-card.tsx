import Category from "@/components/category";
import Image from "next/image";
import Link from "next/link";
import { getLocalImage } from "@/lib/images";
import IconArrow from "@/icons/arrow_outward.svg";
import { FormattedDate } from "@/components/date";

interface BlogCardProps {
  image_src?: string;
  image_alt?: string;
  primary_link: string;
  blog_title: string;
  category_label: string;
  date: string;
  reading_time: number;
}

export default async function BlogCard(props: BlogCardProps) {
  const { base64 } = props.image_src
    ? await getLocalImage(props.image_src)
    : { base64: "" };

  const hasImage = !!props.image_src;

  return (
    <Link
      href={props.primary_link}
      className="group z-20 flex w-full flex-1 cursor-pointer flex-col gap-4 rounded-3xl border border-border/60 bg-card p-4 transition-all duration-300 ease-in-out @container hover:border-border hover:bg-card-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      {hasImage && (
        <div className="flex w-full flex-row">
          {/* 16:9 ratio image */}
          <div className="relative w-full overflow-hidden rounded-lg pb-[56.3%]">
            <Image
              className="bg-muted object-cover"
              src={props.image_src! || "/placeholder.svg"}
              alt={props.image_alt || ""}
              sizes="(min-width: 1024px) 820px, (max-width: 1023px) 848px, 100vw"
              fill
              blurDataURL={base64}
              placeholder="blur"
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col items-start justify-between gap-5 @md:flex-row @md:items-end">
        <div className="flex flex-col gap-4 @md:gap-5">
          <div className="flex flex-col gap-2.5 @md:gap-4 @lg:gap-5">
            <div className="flex @md:hidden">
              <Category category_label={props.category_label} />
            </div>
            <h1 className="text-balance px-0.5 pl-0.5 pr-1 font-playfair text-[32px] font-medium leading-[120%] tracking-[-0.5px] text-foreground sm:text-[36px] sm:leading-[110%]">
              {props.blog_title}
            </h1>
            <div className="flex justify-start gap-5">
              <div className="hidden @md:flex">
                <Category category_label={props.category_label} />
              </div>
              <div className="flex items-center gap-1.5 px-0.5 font-sans text-sm font-normal text-foreground @md:px-0 sm:text-base">
                <FormattedDate date={props.date} />
                <p>·</p>
                <p>{props.reading_time} min read</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-primary transition-all duration-300 ease-in-out sm:group-hover:bg-primary/90 sm:h-12 sm:min-w-12">
          <IconArrow className="inline-block size-5 bg-cover bg-no-repeat fill-primary-foreground transition-all duration-300 ease-in-out sm:group-hover:-translate-y-[3px] sm:group-hover:translate-x-[3px] sm:size-6" />
        </div>
      </div>
    </Link>
  );
}
