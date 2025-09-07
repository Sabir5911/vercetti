"use client"
import React from 'react'
import { getRecentPosts } from '../queries'

export default function useRecentPost() {

    const [recentPost, setRecentPost] = React.useState([])

    const fetchRecentPost = async () => {

     const res= await getRecentPosts(7);
        setRecentPost(res);
    }

    React.useEffect(() => {
        fetchRecentPost();
    }, [])
  return {
    recentPost,
    refreshRecentPost: fetchRecentPost
  }
}
