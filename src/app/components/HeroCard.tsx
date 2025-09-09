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
import { useEffect, useRef } from "react"

type MediaItem =
  | {
      _type: "image";
       url: string;
     
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
     <div>
       <Image
        src={p.media![0].url}
        alt={p.post || `Hero Image`}
              className="w-full h-full object-cover"
              width={400}
              height={599}
        priority
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
        <h2 className="text-white text-xl md:text-2xl font-bold">{title}</h2>
      </div>
     </div>
    )
  }
    const iframeRef = useRef<HTMLIFrameElement>(null);


  const videoId = getYouTubeId(p.media![0]?.videoUrl);


  useEffect(() => {
    if (iframeRef.current && !isVideo) {
      iframeRef.current.removeAttribute("allow");
    }else if (iframeRef.current && isVideo) {
      iframeRef.current.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay");
    }
  }, []);


if (isVideo) {
  return (
    <div className="relative w-full h-[66vw] md:h-full md:h-full" >
      <iframe

      ref={iframeRef}
      
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
        className="w-full h-full object-cover remove"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay "
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

  console.log(posts)
  return (
    <div className="mx-auto  mt-10  md:w-[1000px] md:h-[490px]">
      <Carousel setApi={setApi} className="">
        <CarouselContent>
          {posts.map((p, index) => {
            const matchedBlog = blogs.find((b) => b.slug.current === p.post)
            return (
              <CarouselItem key={index}>
                <Card className="">
                  <CardContent className="relative md:w-[1000px] md:h-[490px] p-0 overflow-hidden rounded-lg">
                    <MediaSlide p={p} title={matchedBlog?.title || "Default Hero Title"} current={current} />
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
          
      <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow-lg z-10"/>
      <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow-lg z-10"/>



      </Carousel>
    </div>
  )
}

export default React.memo(HeroCard)
