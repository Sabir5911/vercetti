import imageUrlBuilder from '@sanity/image-url';
import { client } from '../lib/sanity.client';


const builder = imageUrlBuilder(client);

export function urlFor(source:any) {
  let res= builder.image(source);
  if(!res){
    res=builder.image('placeholder-image-url'); // Fallback to a placeholder image URL
  }
    return res;
}

