import Image from "next/image"
import Link from "next/link"

interface SmallCardProps {
  title: string
  img: string
  href: string
}

export default function SmallCard({ title, img, href }: SmallCardProps) {
  return (
    <Link href={href} className="block w-[300px] h-56 no-underline">
      <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col">
        {/* Image Section */}
        <div className="relative w-full h-40">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-gray-900 text-sm font-normal ">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  )
}
