import { BlogContext } from '@/context/blogContext';
import { useContext, useEffect, useCallback } from 'react';
import { getAllPosts } from '../queries';

export default function useBlog() {
  const {blogs, setBlogs } = useContext(BlogContext);

  // memoized fetch function (prevents recreation on every render)
  const fetchPosts = useCallback(async () => {
    try {
      const data = await getAllPosts();
      console.log('Fetched posts:', data);
      setBlogs(data || []); // fallback in case data is null/undefined
    } catch (error) {
      console.error('Error fetching posts:', error);
      setBlogs([]); // set empty if error
    }
  }, [setBlogs]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { refreshBlogs: fetchPosts,blogs }; // expose for manual refresh
}
