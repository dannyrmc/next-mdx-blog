import { ReactNode } from "react";

interface MDXContentProps {
  content: ReactNode;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-lg sm:prose-xl text-pretty">{content}</div>
  );
}
