import HeroCard from "./components/HeroCard";
import LatestNew from "./components/LatestNew";
import NewsCategory from "./components/NewsCategory";
import { Khand } from "next/font/google";
import Head from "next/head"; // ✅ import Head

const khand = Khand({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Solo Spoiler - Latest & Trending Stories</title>
        <meta
          name="description"
          content="Stay updated with Solo Spoiler. Get the latest updates, trending stories, and top categories from around the world."
        />
      </Head>

      <main className="bg-white min-h-screen text-black">
        <div className="mx-auto px-4 py-8">
          {/* Top Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Hero */}
            <div className="lg:col-span-2">
              <h1
                className={`${khand.className} text-3xl md:text-6xl font-semibold`}
              >
                Solo Spoiler – Latest Headlines & Top Stories
              </h1>

              {/* ✅ SEO Intro Paragraph */}
              <p className="mt-4 text-gray-700 leading-relaxed">
                Welcome to <strong>Solo Spoiler</strong>, your trusted source
                for <strong>breaking news, trending stories, world updates,
                politics, entertainment, technology</strong>, and more. Stay
                informed with real-time headlines and in-depth coverage designed
                to keep you ahead of the curve.
              </p>

              <HeroCard />
            </div>

            {/* Right: Latest */}
            <div className="bg-white rounded-lg space-y-4">
              <h2
                className={`${khand.className} text-xl md:text-2xl font-semibold`}
              >
                Latest Headlines and Stories
              </h2>

              <LatestNew />
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="mt-20">
            <h2
              className={`${khand.className} text-3xl md:text-6xl font-semibold`}
            >
              Trending News & Top Stories
            </h2>

            {/* ✅ Category Description */}
            <p className="mt-4 text-gray-600 leading-relaxed">
              Explore breaking stories across <strong>world news, business,
              sports, health, and lifestyle</strong>. From global events to
              local updates, <strong>Solo Spoiler</strong> brings you
              comprehensive coverage of what matters most right now.
            </p>

            <NewsCategory />
          </div>

          {/* ✅ Footer SEO Section */}
     
        </div>
      </main>
    </>
  );
}
