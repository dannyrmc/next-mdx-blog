"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/icons/logo-512.svg";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { item_label: "Blog", item_path: "/blogs" },
    { item_label: "About", item_path: "/about" },
  ];

  return (
    <header className="noise fixed top-0 z-50 flex w-full items-center justify-center overflow-hidden border-b border-border/60 bg-background px-4 py-4 supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur-[20px] sm:px-12 lg:px-16 xl:px-0">
      <nav className="w-3xl flex flex-1 flex-row items-center justify-between pr-2 sm:pr-0 lg:max-w-4xl">
        <Link
          className="overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          href="/"
          aria-label="Temp blog logo"
        >
          <div className="z-100 size-12 cursor-pointer bg-primary bg-cover bg-no-repeat"></div>
          {/* <Logo className="z-100 size-12 cursor-pointer bg-cover bg-no-repeat fill-primary" /> */}
        </Link>
        <div className="flex cursor-pointer flex-row items-center justify-center gap-8 font-sans text-sm font-bold uppercase tracking-widest text-primary sm:gap-14">
          {navItems.map((item) => {
            const isActive =
              pathname === item.item_path ||
              (item.item_path !== "/" && pathname?.startsWith(item.item_path));

            return (
              <Link
                key={item.item_path}
                href={item.item_path}
                className={`rounded-md p-3 underline decoration-2 underline-offset-4 transition-all duration-200 ease-in-out hover:text-primary/90 hover:decoration-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              ${isActive ? "decoration-inherit" : "decoration-transparent"}
            `}
              >
                {item.item_label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
