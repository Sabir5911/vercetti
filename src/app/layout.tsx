import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "./components/Header"
import { BlogProvider } from "@/context/blogContext"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import GATracker from "@/components/ui/GATracker"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const GA_MEASUREMENT_ID = "G-PEF7ZR5NLB"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-screen-2xl mx-auto`}>
        <BlogProvider>
          <Header />

          {/* Google Analytics */}
      <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
            `}
          </Script>

        

          <Analytics />
          <GATracker />
          <SpeedInsights />
          {children}
        </BlogProvider>
      </body>
    </html>
  )
}
