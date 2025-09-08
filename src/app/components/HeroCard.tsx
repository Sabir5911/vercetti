"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { getFeaturePost } from "../queries"
import useBlog from "../hooks/useBlog"

type MediaItem =
  | {
      _type: "image";
      asset: {
        url: string;
      };
      alt?: string;
    }
  | {
      _type: "youtube";
      embedUrl: string;
    };

type Post = {
  post: string;
  media?: MediaItem[];
  current: number;
};


function getYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      return u.pathname.replace("/", "") || null;
    }
    if (u.hostname === "www.youtube.com" || u.hostname === "youtube.com") {
      if (u.pathname === "/watch") {
        return u.searchParams.get("v");
      }
      const parts = u.pathname.split("/").filter(Boolean);
      if (["shorts", "embed"].includes(parts[0])) {
        return parts[1] || null;
      }
    }
    return null;
  } catch {
    return null;
  }
}


function MediaSlide({ p, title,current }: { p: Post; title: string ,current:number}) {
  const isImage = p.media && p.media[0]?._type === "image"
  const isVideo = p.media && p.media[0]?._type === "youtube"

  const videoRef = React.useRef<HTMLVideoElement>(null)



  if (isImage) {
    return (
      <Image
        src={p.media![0].asset.url}
        alt={p.post || `Hero Image`}
              className="w-full h-full object-cover"
              width={400}
              height={599}
        priority
      />
    )
  }

  const videoId = getYouTubeId(p.media![0]?.videoUrl);


if (isVideo) {
  return (
    <div className="relative w-full h-[66vw] md:h-full md:h-full" >
      <iframe
      
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
        className="w-full h-full object-cover"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
        allowFullScreen
      />
    </div>
  );
}

  // Fallback
  return (
    <Image
      src="/images/image.webp"
      alt="Hero Image"

      priority
    />
  )
}

const HeroCard = () => {
  const { blogs } = useBlog()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [posts, setPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    getFeaturePost(5)
      .then((data) => setPosts(data))
      .catch(console.error)
  }, [])

  // Listen for carousel slide changes
  React.useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      const index = api.selectedScrollSnap() // <-- get current index
      setCurrent(index)
    }

    // Run once initially
    handleSelect()

    // Listen to carousel events
    api.on("select", handleSelect)

    return () => {
      api.off("select", handleSelect)
    }
  }, [api])

  console.log(current)
  return (
    <div className="mx-auto max-w-full mt-10">
      <Carousel setApi={setApi} className="w-full max-w-full">
        <CarouselContent>
          {posts.map((p, index) => {
            const matchedBlog = blogs.find((b) => b.slug.current === p.post)
            return (
              <CarouselItem key={index}>
                <Card className="relative">
                  <CardContent className="relative md:w-full md:h-[590px] p-0 overflow-hidden rounded-lg">
                    <MediaSlide p={p} title={matchedBlog?.title || "Default Hero Title"} current={current} />
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  )
}

export default React.memo(HeroCard)
