import { defineType, defineField } from "sanity"

export default defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    defineField({
      name: "post",
      title: "Post",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "media",
      title: "Image or Video",
      type: "array",
      of: [
        { type: "image", title: "Image" },
        { type: "file", title: "Video", options: { accept: "video/*" } },
   
      ],
      validation: (Rule) => Rule.max(1), // only one media allowed
    }),
  ],
})
