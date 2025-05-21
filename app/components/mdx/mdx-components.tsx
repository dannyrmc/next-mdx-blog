import React from "react";
import Link from "next/link";
import MdxImage from "@/components/mdx/mdx-image";
import { Code, Pre } from "@/components/mdx/mdx-code";
import type { MDXComponents } from "mdx/types";

const Highlighter = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded bg-teal-100 p-1 dark:bg-teal-800">{children}</span>
);

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="reset-prose select-all whitespace-nowrap rounded-lg border border-border bg-muted/5 px-2 py-1.5 font-mono text-sm font-normal leading-[16px] text-foreground md:text-base">
    {children}
  </code>
);

const Callout = ({
  emoji,
  children,
}: {
  emoji: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="my-12 flex rounded-2xl border border-border bg-muted/5 px-6 py-8 text-foreground sm:rounded-3xl">
      <div className="flex items-start gap-4">
        <div className="flex justify-center rounded-full text-[28px] leading-none">
          {emoji}
        </div>
        <div className="reset-prose text-[18px] leading-[160%] text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
};

const CustomLink = ({
  href,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isExternal = href && (href.startsWith("http") || href.startsWith("//"));

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />
    );
  }

  return href ? <Link href={href} {...rest} /> : <a {...rest} />;
};

const MDXComponents = {
  Highlighter,
  InlineCode,
  Callout,
  Image: MdxImage,
  code: Code,
  pre: Pre,
  a: CustomLink,
};

export default MDXComponents;
