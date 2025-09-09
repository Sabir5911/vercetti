import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { Open_Sans, Playfair_Display } from 'next/font/google';

interface CardProps {
  type?: string;
  title: string;
  text: string;
  coverimage?: any;
  createdAt?: string;
  linkUrl?: string;
  discrption?: string;
  slug?: { current: string };
}

// Fonts
const OpenSans = Open_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const PlayfairDisplayFont = Playfair_Display({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Card = ({ title, discrption, coverimage, type, createdAt, slug }: CardProps) => {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      
      {/* Image */}
      {coverimage && (
        <div className="relative">
          <Image
            src={coverimage.src}
            alt={title}
            className="card-img-top object-cover w-[300px] h-[300px]"
            priority
            width={300}
            height={199}
          />
          {type && (
            <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
              {type}
            </span>
          )}
        </div>
      )}

      {/* Card body */}
      <div className="card-body p-4 flex flex-col justify-between">
        <div>
          <h5 className={`${PlayfairDisplayFont.className} card-title text-lg font-bold mb-2`}>
            {title.length > 50 ? title.slice(0, 50) + '...' : title}
          </h5>
          {createdAt && <p className={`${OpenSans.className} text-gray-600 text-sm mb-3`}>{createdAt}</p>}
          <div className={`${OpenSans.className} text-gray-700 text-sm leading-relaxed`}>
            {discrption && (
              <ReactMarkdown>
                {discrption?.slice(0, 100) + (discrption?.length > 100 ? '...' : '')}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Read more button */}
        <Link
          href={`/${slug?.current}`}
          className="mt-4 inline-block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default memo(Card);
