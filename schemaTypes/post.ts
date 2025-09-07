import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 50 },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "object",
      fields: [
        { name: "src", title: "Image", type: "image", options: { hotspot: true } },
        { name: "alt", title: "Alt Text", type: "string" },
      ],
    }),
       defineField({
      name: "innercoverImage",
      title: "Cover Image For inner blog",
      type: "object",
      fields: [
        { name: "src", title: "Image", type: "image", options: { hotspot: true } },
        { name: "alt", title: "Alt Text", type: "string" },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Spoiler", value: "Spoiler" },
          { title: "Animie", value: "animie" },
      
        ],
      },
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" }, // paragraphs, headings, bold, links, lists
        {
          type: "image", // inline images
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
      ],
    }),
  ],
});
