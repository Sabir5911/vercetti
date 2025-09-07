"use client";
import React, {
  useState,
  useMemo,
  useContext,
  useRef,
  useEffect,
  type ChangeEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BlogContext } from "@/context/blogContext";

type BlogItem = {
  title: string;
  description?: string;
  slug?: { current: string };
  category?: string;
  coverImage?: { src?: { asset?: { url?: string } }; alt?: string };
};

export default function Header() {
  const router = useRouter();
  const { blogs } = useContext(BlogContext) as { blogs: BlogItem[] };

  const [menuOpen, setMenuOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openResults, setOpenResults] = useState(false);



  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return blogs
      .filter((b) => (b.title || "").toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, blogs]);

  useEffect(() => {
    setOpenResults(Boolean(query.length));
    setActiveIndex(-1);
  }, [query]);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);



  const onChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);


  const highlight = (title: string, q: string) => {
    if (!q) return title;
    const i = title.toLowerCase().indexOf(q.toLowerCase());
    if (i === -1) return title;
    return (
      <>
        {title.slice(0, i)}
        <mark className="bg-yellow-200">{title.slice(i, i + q.length)}</mark>
        {title.slice(i + q.length)}
      </>
    );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!openResults) return;
    const max = results.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i < max ? i + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i > 0 ? i - 1 : max));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && results[activeIndex]) {
        const slug = results[activeIndex].slug?.current ?? "";
        if (slug) router.push(`/${slug}`);
        setOpenResults(false);
        setQuery("");
      }
    } else if (e.key === "Escape") {
      setOpenResults(false);
    }
  };

  const ResultItem = ({ b, active }: { b: BlogItem; active: boolean }) => {
    console.log('Rendering ResultItem for blog:',b.coverImage?.src?.asset?.url);
    return (
      <Link
        href={`/${b.slug?.current ?? ""}`}
        className={`flex items-center gap-3 px-3 py-2 hover:bg-gray-100 ${
          active ? "bg-gray-100" : ""
        }`}
        onClick={() => setQuery("")}
      >
        <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded">
          {b.coverImage?.src?.asset?.url ? (
            <Image
              src={b.coverImage?.src?.asset?.url}
              alt={b.coverImage?.alt || b.title}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="h-12 w-16 bg-gray-200 grid place-items-center text-gray-500 text-xs">
              No Img
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="font-medium text-gray-900 truncate">
            {highlight(b.title, query)}
          </div>
          {b.description && (
            <div className="text-sm text-gray-600 line-clamp-1">
              {b.description}
            </div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <header className="bg-white shadow-sm py-3 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
        <Image
          src="/logo.png"
          alt="Solo Spoiler"
          width={80}
          height={80}
          priority 
          className="object-contain"
           decoding="async"
  fetchPriority="high"
        />
         {/* Solo Spoiler */}
        </Link>

       
        {/* Search (Desktop) */}
        <div className="hidden lg:block relative" ref={desktopSearchRef}>
          <input
            type="text"
            value={query}
            onChange={onChange}
            onFocus={() => query && setOpenResults(true)}
            onKeyDown={onKeyDown}
            placeholder="Search by title…"
            aria-label="Search articles by title"
            className="border rounded-l px-3 py-1 outline-none focus:ring-1 focus:ring-blue-400 w-80"
          />
          {openResults && (
            <div className="absolute -right-50 mt-2 w-[32rem] max-w-[90vw] bg-white border rounded shadow-lg overflow-hidden">
              {query ? (
                results.length > 0 ? (
                  <ul>
                    {results.map((b, i) => (
                      <li key={b.slug?.current || b.title}>
                        <ResultItem b={b} active={i === activeIndex} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-600">No results</div>
                )
              ) : (
                <div className="px-3 py-2 text-sm text-gray-600">Type to search</div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((s) => !s)}
            className="text-gray-700 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">

         

            {/* Mobile Search */}
            <div className="flex mt-2 relative" ref={mobileSearchRef}>
              <input
                type="text"
                value={query}
                onChange={onChange}
                onFocus={() => query && setOpenResults(true)}
                placeholder="Search by title…"
                aria-label="Search articles by title"
                className="border rounded-l px-3 py-1 w-full outline-none focus:ring-1 focus:ring-blue-400"
              />
              {openResults && (
                <div className="absolute left-0 right-10 top-full mt-2 bg-white border rounded shadow-lg">
                  {query ? (
                    results.length > 0 ? (
                      <ul>
                        {results.map((b) => (
                          <li key={`m-${b.slug?.current || b.title}`}>
                            <ResultItem b={b} active={false} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-600">No results</div>
                    )
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-600">Type to search</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
