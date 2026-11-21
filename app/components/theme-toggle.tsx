"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import IconLight from "@/icons/theme-light.svg";
import IconSystem from "@/icons/theme-system.svg";
import IconDark from "@/icons/theme-dark.svg";

const IconContainer = ({
  children,
  label,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={isActive}
      className={`group flex h-8 min-w-8 items-center justify-center rounded-full transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${isActive ? "bg-toggle-foreground/80" : "bg-toggle-accent"}
        hover:bg-toggle-foreground`}
    >
      {children}
    </button>
  );
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Determine if a theme is active, defaulting to system if none is set
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const activeTheme = mounted ? (theme ?? "system") : "system";

  const isThemeActive = (themeValue: string) => activeTheme === themeValue;

  const getIconClassName = (themeValue: string) => {
    const isActive = isThemeActive(themeValue);
    return `inline-block size-4 bg-cover bg-no-repeat transition-all duration-300 ease-in-out
      ${isActive ? "fill-toggle" : "fill-toggle-foreground"}
      group-hover:fill-toggle`;
  };

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex flex-row gap-1 rounded-full bg-toggle p-1"
    >
      <IconContainer
        label="System theme"
        isActive={isThemeActive("system")}
        onClick={() => setTheme("system")}
      >
        <IconSystem aria-hidden="true" className={getIconClassName("system")} />
      </IconContainer>
      <IconContainer
        label="Light theme"
        isActive={isThemeActive("light")}
        onClick={() => setTheme("light")}
      >
        <IconLight aria-hidden="true" className={getIconClassName("light")} />
      </IconContainer>
      <IconContainer
        label="Dark theme"
        isActive={isThemeActive("dark")}
        onClick={() => setTheme("dark")}
      >
        <IconDark aria-hidden="true" className={getIconClassName("dark")} />
      </IconContainer>
    </div>
  );
}
