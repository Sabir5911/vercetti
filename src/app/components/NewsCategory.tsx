"use client"
import React from 'react'
import { getSpecificCategoryPosts } from '../queries';
import SmallCard from './SmallCard';

export default function NewsCategory() {

    const [category, setCategory] = React.useState([])

    React.useEffect(() => {
     let res= getSpecificCategoryPosts("anime").then((data)=>setCategory(data)).catch((err)=>console.log(err));
    }, []);

    
  return  <>
<div className='flex justify-center items-center md:flex-row md:justify-start md:items-start flex-wrap gap-10 '>
    
        {
            category.map((post)=>(
                <div key={post._id}>
                    <SmallCard
                                title={post?.description
}
                      img={post.coverImage?.src?.asset?.url}
                        href={`${post.slug.current}`}
                              />
                </div>
            ))
        }
</div>
  
  </>
}
