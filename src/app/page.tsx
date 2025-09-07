
import { HeroCard } from "./components/HeroCard";
import LatestNew from "./components/LatestNew";
import NewsCategory from "./components/NewsCategory";
import { Khand } from "next/font/google";

const khand = Khand({
  weight: ['400', '700'], // you can choose available weights
  subsets: ['latin'],     // subset you need
   display: "swap",
});





export default function Home() {
  return (
    <main className="bg-white min-h-screen text-black">
      <div className="container mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Hero */}
          <div className="lg:col-span-2">

                <h2 className={`${khand.className} text-3xl md:text-6xl font-semibold`}>{
                  "Spotlight "
                  }</h2>

            <HeroCard
            
            />
          </div>

          {/* Right: Latest */}
          <div className="bg-white rounded-lg p-4 space-y-4">
               <h2 className={`${khand.className} text-xl md:text-2xl font-semibold`}>{
                  "Latest"
                  }</h2>

            <LatestNew />
            
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="mt-20 p-4" >
          <h2 className={`${khand.className} text-xl md:text-2xl font-semibold`}>{
                  "Trending News"
                  }</h2>
          <div>
          <NewsCategory />

          </div>
        </div>
      </div>
    </main>
  );
}
