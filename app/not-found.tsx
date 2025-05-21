import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="noise flex flex-1 basis-full flex-col items-center justify-center bg-background px-6 pt-20 sm:pt-16 md:flex-row md:gap-32 md:px-0">
      <div className="mb-9 flex min-w-full flex-col items-center justify-center gap-8 text-foreground md:mb-0 md:min-w-0">
        <h1 className="text-start font-playfair text-[40px] font-semibold leading-none tracking-tight sm:text-[48px]">
          Page Not Found
        </h1>
        <div className="flex min-w-full md:min-w-0">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
