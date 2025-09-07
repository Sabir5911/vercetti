'use client';
import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';

type SmallCardProps = {
  slug: { current: string };
  title: string;
  discrption?: string;
  category?: string;
  date: string;
  imageUrl?: string;
  imageAlt?: string;
};

const SmallCard=({  slug, title, discrption, category, date, imageUrl, imageAlt}:SmallCardProps)=>{
  return (
    <article className="group overflow-hidden rounded-lg bg-neutral-900 ring-1 ring-neutral-800 hover:ring-neutral-700 transition">
      <Link href={`/${slug?.current ?? ''}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          ) : <div className="absolute inset-0 bg-neutral-800" />}
          {category ? (
            <span className="absolute left-3 top-3 rounded px-2 py-1 text-[11px] font-medium bg-pink-500/90 text-white">
              {category}
            </span>
          ) : null}
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold text-white leading-snug line-clamp-2">
            {title}
          </h3>
          {discrption ? (
            <p className="mt-2 text-sm text-neutral-300 line-clamp-2">
              {discrption}
            </p>
          ) : null}
          <div className="mt-3 text-xs text-neutral-400">{date}</div>
        </div>
      </Link>
    </article>
  );
}

export default memo(SmallCard)