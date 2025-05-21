import { Button } from "@/components/ui/button";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Contact() {
  return (
    <section
      id="contact"
      className="noise flex w-full flex-col items-center justify-between gap-20 pb-20 sm:gap-24 sm:pb-32"
    >
      <div className="line-grid h-[73px] w-full border-y border-border/60 bg-transparent p-3" />
      <div className="flex w-full max-w-3xl flex-1 flex-col-reverse items-center justify-center gap-8 px-6 sm:max-w-4xl sm:px-12 md:flex-row md:justify-between lg:px-0 ">
        <div className="flex w-full flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-12 sm:pb-3 md:flex-col md:items-start md:gap-6">
          <h1 className="font-playfair text-5xl font-medium leading-none tracking-tight text-primary sm:text-6xl">
            Contact
          </h1>
          <div className="flex flex-col items-start justify-start gap-5 sm:gap-4 md:gap-5">
            <p className="max-w-[28ch] text-start font-sans text-[16px] font-normal leading-[160%] tracking-normal text-primary sm:text-balance sm:text-[18px] md:max-w-[30ch] md:text-wrap">
              Crafted blog template built using Next.js, Tailwind CSS, and MDX.
            </p>
            <Button asChild>
              <Link href={siteConfig.mailto}>Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
