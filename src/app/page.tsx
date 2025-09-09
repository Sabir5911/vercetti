import HeroCard from "./components/HeroCard";
import LatestNew from "./components/LatestNew";
import NewsCategory from "./components/NewsCategory";
import { Khand, Inter } from "next/font/google";
import Head from "next/head";

// Heading font
const khand = Khand({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Body font
const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Solo Spoiler: Latest News, Trending Stories & Spoilers</title>
        <meta
          name="description"
          content="Stay updated with Solo Spoiler. Get the latest news, trending stories, and top spoilers from around the world."
        />
      </Head>

      <main className="bg-white min-h-screen text-black font-sans">
        
        <div className="mx-auto px-4 py-8 ">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between gap-x-16 ">
            {/* Left: Hero */}
            <div className=""> 
              <h1
                className={`${khand.className} text-3xl md:text-5xl font-bold mb-6`}
              >
                Spot Light: Latest News & Trending Stories
              </h1>

              <HeroCard />
            </div>

            {/* Right: Latest Stories */}
            <div className="  rounded-lg space-y-4  ">
              <h2
                className={`${khand.className} text-xl md:text-2xl font-semibold mb-4`}
              >
                Latest Stories
              </h2>

              <div className={`${inter.className}`}>
                <LatestNew />
              </div>
            </div>
          </div>














          {/* Bottom Grid */}
          <div className="mt-20">
            <h2
              className={`${khand.className} text-3xl md:text-4xl font-bold mb-10`}
            >
              Trending News & Top Stories
            </h2>

            <div className={`${inter.className}`}>
              <NewsCategory />
            </div>




          </div>
        </div>
      </main>
    </>
  );
}
