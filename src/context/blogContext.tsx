'use client'
import React, { createContext, useState } from 'react'
import { Blog, BlogContextType } from './blog'

export const BlogContext = createContext<BlogContextType>({} as BlogContextType)

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>([])

  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  )
}
