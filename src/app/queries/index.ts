import { client } from "../lib/sanity.client";

export const fetchAllpost = `*[_type == "post"] | order(_createdAt desc) {
  _id,
  title,
  description,
  slug,
  _createdAt,
  category,

  coverImage {
    src {
      asset->{
        url
      }
    },
    alt
  },
    innercoverImage {
    src {
      asset->{
        url
      }
    },
    alt
  },
  content[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        url,
        metadata { dimensions }
      }
    }
  }
}`;

export async function getAllPosts() {
  return await client.fetch(fetchAllpost);
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
  title,
  description,
  slug,
  _createdAt,
  category,
    coverImage {
    src {
      asset->{
        url
      }
    },
    alt
  },
    innercoverImage[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      asset->
    },
    _type == "object" => {
      ... // YouTube video object
    }
  },

  content[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        url,
        metadata { dimensions }
      }
    }
  }
    }`,
    { slug }
  );
}

export async function getRecentPosts(limit: number = 3) {
  return await client.fetch(
    `*[_type == "post"] | order(_createdAt desc)[0...$limit]{
      _id,
  title,
  description,
  slug,
  _createdAt,
  category,
    coverImage {
    src {
      asset->{

        url
      }
    },
    alt
  },
    innercoverImage {
    src {
      asset->{
        url
      }
    },
    alt
  },
  content[]{
    ...,
    _type == "image" => {
      ...,
      asset->{  
        url,
        metadata { dimensions }
      } 
    }
  }
    }`,
    { limit }
  );
}


export async function getSpecificCategoryPosts(category: string) {
  return await client.fetch(
    `*[_type == "post" && category == $category] | order(_createdAt desc){
      _id,
  title,
  description,
  slug,
  _createdAt,
  category,
    coverImage {
    src {
      asset->{

        url
      }
    },
    alt
  },
    innercoverImage {
    src {
      asset->{
        url
      }
    },
    alt 
  },
  content[]{
    ...,

    _type == "image" => {
      ...,
      asset->{
        url,
        metadata { dimensions }
      }
    }
  }
    }`,
    { category }
  );
}

export async function getFeaturePost(limit: number) {
  const query = `
  *[_type == "feature" && !(_id in path("drafts.**"))]{
  _id,
  post,
  "media": coalesce(
    media[]{
      // Image items (with or without asset)
      _type == "image" => {
        _type,
        "url": asset->url,
        alt
      },

      // YouTube items — handle BOTH possibilities:
      // 1) old docs with _type: "youtube"
      // 2) new docs with generic _type: "object" + videoUrl
      (_type == "youtube" || (_type == "object" && defined(videoUrl))) => {
        "_type": "youtube",
        videoUrl
      }
    },
    []
  )
}

  
  `
  return client.fetch(query, { limit });
}
