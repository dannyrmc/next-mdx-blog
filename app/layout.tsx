import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BreakpointIndicator from "@/components/breakpoint-indicator";

const geistMono = localFont({
  src: [
    {
      path: "../public/fonts/GeistMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GeistMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next & MDX Blog",
  description: "Blog website built with Next.js and MDX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`noise bg-background text-foreground ${inter.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body className="flex min-h-svh flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
            {children}
          </main>
          <BreakpointIndicator />
          <Footer />
        </ThemeProvider>
        {/* <VercelSpeedInsights /> */}
        {/* <VercelAnalytics /> */}
      </body>
    </html>
  );
}
