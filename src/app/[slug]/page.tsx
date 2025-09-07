// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '../queries';
import BlogPageClient from '../components/BlogPageClient';

// ---- Types ----------------------------------------------------
interface PageProps {
  // NOTE: params is async in App Router dynamic routes
  params: Promise<{ slug: string }>;
}

type SanityImage = {
  src?: { asset?: { url?: string } };
};

type Post = {
  slug: string | { current?: string };
  title: string;
  description?: string;
  coverimage?: SanityImage;
};

// ---- Config knobs (ISR / dynamic) -----------------------------
export const revalidate = 60;

// Helper: ensure absolute URLs using env + metadataBase
const siteUrl = 'https://solospoiler.me';
const toAbs = (path: string) => new URL(path, siteUrl).toString();

function safeOgImage(post?: Post): string | undefined {
  const url = post?.coverimage?.src?.asset?.url;
  if (!url) return undefined;
  try {
    return new URL(url).toString();
  } catch {
    return toAbs(url);
  }
}

// ---- Metadata -------------------------------------------------
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;              // ✅ await params
  const post = (await getPostBySlug(slug)) as Post | null;

  if (!post) {
    return {
      title: 'Post Not Found',
      metadataBase: new URL(siteUrl),
      robots: { index: false, follow: false },
    };
  }

  const title = post.title;
  const description =
    post.description?.trim() ||
    `${post.title} - Full spoilers, summary, and ending explained on Solo Spoiler.`;

  const canonical = toAbs(`/${slug}`);
  const ogImage = safeOgImage(post);

  const res : Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };

  console.log(res)
  return res;
}

// ---- SSG params -----------------------------------------------
export async function generateStaticParams() {
  const posts = (await getAllPosts()) as Post[];

  return posts
    .map((post) => {
      const slug =
        typeof post.slug === 'string' ? post.slug : post.slug?.current;
      return slug ? { slug } : null;
    })
    .filter((v): v is { slug: string } => Boolean(v));
}

// ---- Page ------------------------------------------------------
export default async function Page({ params }: PageProps) {
  const { slug } = await params;              // ✅ await params
  const post = (await getPostBySlug(slug)) as Post | null;

  if (!post) {
    notFound();
  }

  return <BlogPageClient blog={post!} />;
}
