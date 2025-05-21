"use client";

import { useEffect, useState } from "react";

export default function BreakpointIndicator() {
  const [breakpoint, setBreakpoint] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1536) setBreakpoint("2xl");
      else if (width >= 1280) setBreakpoint("xl");
      else if (width >= 1024) setBreakpoint("lg");
      else if (width >= 768) setBreakpoint("md");
      else if (width >= 640) setBreakpoint("sm");
      else setBreakpoint("xs");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  if (!mounted || process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-1 left-1 z-[200] flex size-7 select-none items-center justify-center rounded-full bg-rose-700 p-3 font-mono text-xs font-bold text-white">
      {breakpoint}
    </div>
  );
}
