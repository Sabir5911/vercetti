import Image from "next/image"
import Link from "next/link"

interface SideItemProps {
  time: string
  title: string
  img: string
  href: string
}

export default function SideItem({ time, title, img, href }: SideItemProps) {
  return (
    <Link href={href} className="flex gap-3 group no-underline text-black"
>
      {/* Thumbnail */}
      <div className="relative w-28 h-16 md:w-40 md:h-28 rounded-md overflow-hidden shadow-sm">
        <Image
          src={img}
          alt={title}
          fill
          className="w-20 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-center">
        <span className="text-xs lg:text-sm text-gray-500">{time}</span>
        <p className="text-sm font-semibold leading-snug text-black ">
          {title.length > 60 ? title.slice(0, 60) + "..." : title}
        </p>
      </div>
    </Link>
  )
}
