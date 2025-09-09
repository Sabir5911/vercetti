import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card"; // ShadCN components
import { Inter } from "next/font/google";

// Font for title
const InterFont = Inter({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
});

interface SmallCardProps {
  title: string;
  img: string;
  href: string;
}

export default function SmallCard({ title, img, href }: SmallCardProps) {
  return (
    <Link href={href} className="no-underline">
      <Card className="hover:shadow-lg transition-shadow flex flex-col">
        {/* Image Section */}
        <div className="relative w-full h-[220px] md:h-[220px] rounded-t-lg overflow-hidden">
          <Image
            src={img}
            alt={title}
            className="object-cover w-full h-full"
            fill
          />
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <h3 className={`${InterFont.className} text-gray-900 text-sm font-medium leading-snug max-w-[280px]`}>
            {title.length > 100 ? title.slice(0, 100) + "..." : title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
