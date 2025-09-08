import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BlogProvider } from "@/context/blogContext";
import Header from "./components/Header";
import Script from "next/script";
<Script
  id="ld-website"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Solo Spoiler",
      url: "https://solospoiler.me",
      image: "https://solospoiler.me/og-image.png",
    }),
  }}
/>
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Analytics } from "@vercel/analytics/next"
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL("https://solospoiler.me"),
  title: {
    default: "Solo Spoiler",
    template: "%s | Solo Spoiler",
  },

  description:
    "Solo Spoiler is your ultimate hub for anime spoilers, summaries, and ending explanations. Stay updated with the latest story breakdowns and fan insights across all your favorite anime.",

  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },      // Main site logo
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", type: "image/x-icon" }, // Standard fallback
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },

    robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  openGraph: {
    type: "website",
    url: "https://solospoiler.me",
    siteName: "Solo Spoiler",
    title: "Solo Spoiler - Spoilers & Summaries for All Anime",
    description:
      "Your go-to destination for anime spoilers, story explanations, and detailed chapter breakdowns for all popular series.",
 images: [
    {
      url: "https://solospoiler.me/og-image.png",
      width: 1200,
      height: 630,
      alt: "Solo Spoiler - Anime Spoilers and Summaries",
    },
  ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Solo Spoiler - Spoilers & Summaries for All Anime",
    description:
      "Get the latest anime spoilers, detailed story explanations, and in-depth breakdowns across all your favorite series.",
    images: ["/og-image.png"], // Same as Open Graph image
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-screen-2xl mx-auto  `}
      >
        <BlogProvider>
          <Header />
          <Analytics />
          <SpeedInsights />
        {children}
        </BlogProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
