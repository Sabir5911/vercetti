import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BlogProvider } from "@/context/blogContext";
import Header from "./components/Header";

import { SpeedInsights } from "@vercel/speed-insights/next"

import { Analytics } from "@vercel/analytics/next"

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
   icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },         // if using /app/icon.png this is auto
      { url: '/favicon.ico', type: 'image/ico' },   // optional fallback
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
  description:
    "Solo Spoiler is your go-to site for Solo Leveling spoilers, summaries, and ending explanations. Stay updated with the latest story breakdowns and fan insights.",
  openGraph: {
    type: "website",
    url: "https://solospoiler.me",
    siteName: "Solo Spoiler",
    title: "Solo Spoiler - Spoilers & Summaries for Solo Leveling",
    description:
      "Your ultimate hub for Solo Leveling spoilers, story explanations, and chapter breakdowns.",
    images: [
      {
        url: "/favicon.ico", // replace with your logo/cover image
        width: 1200,
        height: 630,
        alt: "Solo Spoiler",
      },
    ],
    
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
      </body>
    </html>
  );
}
