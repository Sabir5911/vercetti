"use client"
import React from "react"
import useRecentPost from "../hooks/useRecentPost"
import SideItem from "./SideItem"

function getRelativeTime(dateString: string): string {
  const postDate = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now.getTime() - postDate.getTime()) / 1000) // seconds

  if (diff < 60) return `${diff} sec ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)} day ago`
  return postDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function LatestNew() {
  const { recentPost } = useRecentPost()

  return (
    <div className="flex flex-col gap-4  h-[800px] overflow-hidden overflow-y-auto ">
      {recentPost.map((post) => (
        <div
          key={post._id}
          className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
        >
          <SideItem
            time={getRelativeTime(post._createdAt)}
            title={post?.title}
            img={post.coverImage?.src?.asset?.url}
            href={`${post.slug.current}`}
          />
        </div>
      ))}
    </div>
  )
}
