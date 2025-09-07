import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export const revalidate = 0; // 👈 disable cache, always fetch fresh

export default async function sitemap() {
  const baseUrl = "https://solospoiler.me";

  const query = groq`*[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }`;

  const posts = await client.fetch(query);

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    },
    ...posts.map((post: any) => ({
      url: `${baseUrl}/${post.slug}`,
      lastModified: post._updatedAt,
    })),
  ];
}
