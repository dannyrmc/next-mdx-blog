"use client";

import type * as React from "react";
import { useTheme } from "next-themes";

import IconLight from "@/icons/theme-light.svg";
import IconSystem from "@/icons/theme-system.svg";
import IconDark from "@/icons/theme-dark.svg";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Determine if a theme is active, defaulting to system if none is set
  const isThemeActive = (themeValue: string) => {
    return theme === themeValue || (!theme && themeValue === "system");
  };

  const IconContainer = ({
    children,
    isActive,
    onClick,
  }: {
    children: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
  }) => {
    return (
      <button
        onClick={onClick}
        aria-label="Theme toggle"
        className={`group flex h-8 min-w-8 items-center justify-center rounded-full transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          ${isActive ? "bg-toggle-foreground/80" : "bg-toggle-accent"} 
          hover:bg-toggle-foreground`}
      >
        {children}
      </button>
    );
  };

  // Handle the icon fill based on active state
  const getIconClassName = (themeValue: string) => {
    const isActive = isThemeActive(themeValue);
    return `inline-block size-4 bg-cover bg-no-repeat transition-all duration-300 ease-in-out
      ${isActive ? "fill-toggle" : "fill-toggle-foreground"} 
      group-hover:fill-toggle`;
  };

  return (
    <div className="flex flex-row gap-1 rounded-full bg-toggle p-1">
      <IconContainer
        isActive={isThemeActive("system")}
        onClick={() => setTheme("system")}
      >
        <IconSystem className={getIconClassName("system")} />
      </IconContainer>
      <IconContainer
        isActive={isThemeActive("light")}
        onClick={() => setTheme("light")}
      >
        <IconLight className={getIconClassName("light")} />
      </IconContainer>
      <IconContainer
        isActive={isThemeActive("dark")}
        onClick={() => setTheme("dark")}
      >
        <IconDark className={getIconClassName("dark")} />
      </IconContainer>
    </div>
  );
}
