"use client";
import React, { useMemo, useState, useEffect, memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Khand } from "next/font/google";

const khand = Khand({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Helper: create slug IDs for headings
function slugify(text: string) {
  return (text || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Extract YouTube ID safely from multiple formats
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

const BlogPageClient = ({ blog }: { blog: any }) => {
  // Ensure content is an array
  const content: any[] = Array.isArray(blog?.content) ? blog.content : [];

  // Calculate reading time
  const { wordCount, minutes } = useMemo(() => {
    const text = content
      .filter((block: any) => block?._type === "block")
      .map((b: any) =>
        Array.isArray(b.children)
          ? b.children.map((c: any) => c?.text || "").join(" ")
          : ""
      )
      .join(" ");
    const wc = text.trim() ? text.trim().split(/\s+/).length : 0;
    const m = Math.max(1, Math.round(wc / 200)); // ~200 wpm
    return { wordCount: wc, minutes: m };
  }, [content]);

  // Build Table of Contents
  const toc = useMemo(() => {
    return content
      .filter((block: any) => ["h2", "h3"].includes(block?.style))
      .map((block: any) => {
        const title = Array.isArray(block.children)
          ? block.children.map((c: any) => c?.text || "").join(" ")
          : "";
        return { title, id: slugify(title) };
      });
  }, [content]);

  // Reading progress
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article-root");
      if (!el) return;
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY - (el.offsetTop || 0);
      const pct = Math.min(100, Math.max(0, (scrolled / Math.max(total, 1)) * 100));
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // PortableText serializers
  const components = {
    types: {
      image: ({ value }: any) => {
        const url = value?.url || value?.asset?.url;
        if (!url) return null;
        return (
          <Image
            src={url}
            alt={value?.alt || blog?.title || "Image"}
            width={1100}
            height={618}
            className="my-6 rounded-lg"
            priority
          />
        );
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-4xl font-bold my-4">{children}</h1>
      ),
      h2: ({ children }: any) => {
        const plain = Array.isArray(children) ? children.join("") : String(children);
        return (
          <h2 id={slugify(plain)} className="text-3xl font-semibold my-3">
            {children}
          </h2>
        );
      },
      h3: ({ children }: any) => {
        const plain = Array.isArray(children) ? children.join("") : String(children);
        return (
          <h3 id={slugify(plain)} className="text-2xl font-semibold my-2">
            {children}
          </h3>
        );
      },
      normal: ({ children }: any) => (
        <p className="my-2 leading-7">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-blue-600 pl-4 italic bg-blue-50 my-4">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      link: ({ children, value }: any) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {children}
        </a>
      ),
    },
  };

  // Inner cover media
  const inner: any = Array.isArray(blog?.innercoverImage)
    ? blog.innercoverImage[0]
    : undefined;

  const videoId = getYouTubeId(inner?.videoUrl);
  const innerImageUrl = inner?.url || inner?.asset?.url;
  const innerImageAlt = inner?.alt || blog?.title;

  const coverImageUrl =
    blog?.coverImage?.url || blog?.coverImage?.src?.asset?.url || null;
  const coverImageAlt = blog?.coverImage?.alt || blog?.title || "Cover image";

  return (
    <>
      {/* Progress Bar */}
      <div className="reading-progress" style={{ width: `${progress}%` }} />

      <Container className="my-5 mt-10">
        <Row className="mb-5 relative">
          <Col>
            <div className="max-w-4xl text-black">
              <h1 className={`${khand.className} text-3xl md:text-6xl font-semibold`}>
                {blog?.title}
              </h1>
              {blog?.description && <p className="my-2">{blog.description}</p>}
              <div className="text-sm text-grey mb-5">
                ⏱️ {minutes} min read · {wordCount} words
              </div>
            </div>

            {/* Inner Cover - Video > Image > Fallback */}
            {videoId ? (
              <div className="relative w-100 mb-4" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video"
                  className="absolute top-0 left-0 w-100 h-100"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : innerImageUrl ? (
              <Image
                src={innerImageUrl}
                alt={innerImageAlt}
                width={1100}
                height={400}
                className="rounded-lg mb-4 w-full object-cover h-auto"
                priority
              />
            ) : coverImageUrl ? (
              <Image
                src={coverImageUrl}
                alt={coverImageAlt}
                width={1100}
                height={400}
                className="rounded-lg mb-4 w-full object-cover h-auto"
                priority
              />
            ) : null}
          </Col>
        </Row>

        <Row>
          <Col lg={8} id="article-root">
            <PortableText value={content} components={components as any} />
          </Col>

          {/* Table of Contents */}
          <Col lg={4} className="d-none d-lg-block">
            <aside className="sticky-top" style={{ top: 96 }}>
              <div className="p-3 border rounded">
                <h6 className="text-uppercase text-muted mb-3">On this page</h6>
                {toc.length > 0 ? (
                  <ul className="list-unstyled mb-0">
                    {toc.map((item: { title: string; id: string }) => (
                      <li key={item.id} className="mb-2">
                        <a href={`#${item.id}`} className="text-blue-600 hover:underline">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted mb-0">Sections will appear here.</p>
                )}
              </div>
            </aside>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .reading-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #0d6efd, #6f42c1);
          z-index: 1050;
          transition: width 0.15s ease-out;
        }
        .absolute {
          position: absolute;
        }
        .top-0 {
          top: 0;
        }
        .left-0 {
          left: 0;
        }
        .w-100 {
          width: 100%;
        }
        .h-100 {
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default memo(BlogPageClient);
