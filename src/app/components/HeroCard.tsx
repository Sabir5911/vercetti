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
import { getFeaturePost,getPostBySlug } from "../queries"
import Link from "next/link"
import { BlogContext } from "@/context/blogContext"
import useBlog from "../hooks/useBlog"

const HeroCard=()=> {
  
  const {blogs}=useBlog();

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [posts, setPosts] = React.useState<any[]>([])
const [Post,setPost]=React.useState()




React.useEffect(()=>{
  let res=blogs.find((post)=>post.slug.current===posts[current-1]?.post)
  setPost(res)
},[blogs, current, posts])

  React.useEffect(() => {
    getFeaturePost(1)
      .then((data) => setPosts(data))
      .catch(console.log)
      

  }, [])


  // Update carousel state
  React.useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api, posts])

            // <Image src={coverimage.src} alt={title} className="card-img-top object-cover w-[300px] h-[300px]" priority  width={300} height={199}/>
  

  return (
    <div className="mx-auto max-w-full mt-10">
      <Carousel setApi={setApi} className="w-full max-w-full">
        <CarouselContent>
          {posts.map((post, index) => (
            <CarouselItem key={index}>
           <Link
           href={`/${post.post}`}
           >
              <Card>
                <CardContent className="w-[300px] h-[300px]  md:w-[700px] md:h-[590px]" >
                  {post.media && post.media[0]?._type === "image" ? (
                    <Image
                    className="object-fill"
                      src={post.media[0].asset.url}
                      alt={post.post || `Hero Image ${index + 1}`}
                      priority
                   fill
                    />
                  ) : post.media && post.media[0]?._type === "file" ? (
                    <video
                      src={post.media[0].asset.url}
                      controls
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Image
                      src="/images/image.webp"
                      alt={`Hero Image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                      priority
                    />
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-lg" />

                  {/* Title */}
                  <h2 className="absolute bottom-1 left-4 right-4 text-white text-sm lg:text-2xl font-bold p-4">
                    {Post?.title || "Default Hero Title"}
                  </h2>
                </CardContent>
              </Card>
           </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext  className="hidden md:flex" />
      </Carousel>

  
    </div>
  )
}


export default React.memo(HeroCard)