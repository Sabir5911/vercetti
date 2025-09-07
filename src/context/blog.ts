// context/blog.ts

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityImageAsset {
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
}

export interface SanityImageObject {
  asset: SanityImageAsset;
  alt?: string;
}

export type PortableTextSpan = {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
};

export type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style: string; // 'normal' | 'h1' | 'h2' | ...
  children: PortableTextSpan[];
  markDefs: { _key: string; _type: string; href?: string }[];
};

export type PortableTextImage = {
  _type: 'image';
  _key: string;
  asset: SanityImageAsset;
  alt?: string;
};

export type PortableText = Array<PortableTextBlock | PortableTextImage>;

export interface Blog {
  _id: string;
  title: string;
  description: string;        // ✅ rename from "discrption"
  slug: SanitySlug;
  category: string;
  coverImage?: {
    src?: SanityImageObject;  // ✅ holds asset->url
    alt?: string;
  };
  _createdAt: string;
  content: PortableText;      // ✅ replaces "sections"
}

export interface BlogContextType {
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}
