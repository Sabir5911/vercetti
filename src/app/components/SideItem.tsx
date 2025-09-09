import { Open_Sans } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

interface SideItemProps {
  time: string
  title: string
  img: string
  href: string
}

// Import Open Sans
const OpenSans = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function SideItem({ time, title, img, href }: SideItemProps) {
  return (
    <Link
      href={href}
      className="flex gap-3 group no-underline text-black"
    >
      {/* Thumbnail */}
      <div className="relative  w-[128px] h-[83px] rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-center">
        <span className={`${OpenSans.className} text-xs lg:text-sm text-gray-500`}>
          {time}
        </span>
        <p className={`${OpenSans.className} text-sm font-medium leading-snug text-black max-w-sm`}>
          {title.length > 60 ? title.slice(0, 60) + "..." : title}
        </p>
      </div>
    </Link>
  )
}
