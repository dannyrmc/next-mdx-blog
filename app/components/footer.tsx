"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(() => {
    try {
      return new Date().getFullYear();
    } catch (error) {
      return 2025; // Fallback to 2025 if calculation fails
    }
  });

  // Update the year if the component is mounted for a long time (e.g., over New Year's)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bottom-0 z-30 flex w-full items-center justify-center border-t border-border/60 bg-primary py-5 dark:bg-secondary sm:w-auto sm:py-6 md:py-9">
      <div className="w-3xl flex flex-1 flex-col items-start justify-between gap-5 px-4 pt-2 sm:mx-12 sm:flex-row sm:items-center sm:gap-6 sm:px-0 sm:pt-0 lg:max-w-4xl">
        <h1 className="select-none font-playfair text-[36px] font-normal leading-[36px] text-primary-foreground dark:text-foreground sm:text-[40px] sm:leading-[40px]">
          Blog.
        </h1>
        <div className="flex w-full flex-row items-center justify-between gap-8 sm:w-max sm:justify-center sm:pr-1">
          <p className="select-none font-sans text-xs font-normal leading-3 text-primary-foreground dark:text-foreground sm:text-sm sm:leading-4">
            © {currentYear || 2025} MIT Licensed
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
