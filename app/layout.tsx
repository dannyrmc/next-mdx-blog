import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Playfair_Display } from "next/font/google";
import BreakpointIndicator from "@/components/breakpoint-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  icons: {
    icon:
      process.env.NODE_ENV === "development"
        ? "/icons/favicon-512-dev.svg"
        : "/icons/favicon-512-light.svg",
  },
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
      className={`bg-background text-foreground ${inter.variable} ${geistMono.variable} ${playfair.variable}`}
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
        <Analytics />
      </body>
    </html>
  );
}
