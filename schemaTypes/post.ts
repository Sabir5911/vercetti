import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    // Title
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(65)
          .warning("Title should not be longer than 65 characters"),
    }),

    // Description
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // Slug
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),

    // Cover Image (simple object with alt)
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "object",
      fields: [
        {
          name: "src",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) =>
            Rule.required().warning("Provide meaningful alt text for SEO/accessibility"),
        },
      ],
    }),

    // Inner cover: either ONE image or ONE YouTube URL
    defineField({
      name: "innercoverImage",
      title: "Cover Image for Inner Blog",
      type: "array",
      of: [
        {
          type: "image",
          title: "Image",
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
          ],
          options: { hotspot: true },
        },
        {
          type: "object",
          title: "YouTube Video",
          fields: [
            {
              name: "videoUrl",
              type: "url",
              title: "YouTube URL",
              validation: (Rule) =>
                Rule.uri({ scheme: ["http", "https"] })
                  .custom((url) => {
                    if (!url) return true;
                    try {
                      const { hostname } = new URL(url);
                      const allowed = ["www.youtube.com", "youtube.com", "youtu.be"];
                      return allowed.includes(hostname)
                        ? true
                        : "URL must be a YouTube link";
                    } catch {
                      return "Invalid URL";
                    }
                  }),
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.max(1).warning("You can only add one cover image OR one YouTube video"),
    }),

    // Category (normalized values)
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Spoiler", value: "spoiler" },
          { title: "Anime", value: "anime" },
        ],
        layout: "radio", // optional: nicer UX
      },
      validation: (Rule) => Rule.required(),
    }),

    // Rich Content
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" }, // headings, paragraphs, lists, marks
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
          ],
        },
      ],
    }),
  ],
});
