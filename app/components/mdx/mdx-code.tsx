"use client";

import React from "react";
import {
  Highlight,
  themes,
  type PrismTheme,
  type Token,
} from "prism-react-renderer";

type MDXCodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  className?: string;
};

type MDXPreProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

const isReactElement = (
  child: React.ReactNode
): child is React.ReactElement => {
  return React.isValidElement(child);
};

export const Code: React.ComponentType<MDXCodeProps> = ({
  children,
  className,
  ...props
}) => {
  const language = className ? className.replace(/language-/, "") : "";
  return (
    <Highlight
      theme={themes.oceanicNext as PrismTheme}
      code={(children as string).trim()}
      language={language as any}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code
          className={`${className} ${
            language === "text" ? "text-neutral-100" : ""
          }`}
          style={style}
          {...props}
        >
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            const { key: lineKey, ...restLineProps } = lineProps;
            return (
              <div key={lineKey as React.Key} {...restLineProps}>
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token, key });
                  const { key: tokenKey, ...restTokenProps } = tokenProps;
                  return (
                    <span
                      key={tokenKey as React.Key}
                      {...restTokenProps}
                      className={`${restTokenProps.className} ${
                        language === "text" ? "text-neutral-100" : ""
                      }`}
                    />
                  );
                })}
              </div>
            );
          })}
        </code>
      )}
    </Highlight>
  );
};

export const Pre: React.ComponentType<MDXPreProps> = ({
  children,
  ...props
}) => (
  <pre
    className="max-h-[650px] select-none overflow-x-auto rounded-3xl border border-border/60 bg-neutral-900 p-6 dark:bg-muted/10 md:p-8"
    {...props}
  >
    <div className="no-ligatures w-max min-w-full font-mono">{children}</div>
  </pre>
);
