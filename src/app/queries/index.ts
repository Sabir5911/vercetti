import { client } from "../lib/sanity.client";

 export  const fetchAllpost = `*[_type == "post"] | order(_createdAt desc) {
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


export async function getFeaturedPosts(limit: number = 4) {
  return await client.fetch(
    `*[_type == "post" && featured == true] | order(_createdAt desc)[0...$limit]{
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


    }      }
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