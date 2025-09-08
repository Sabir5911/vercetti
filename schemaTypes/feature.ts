import { defineType, defineField } from "sanity"

export default defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    defineField({
      name: "post",
      title: "Post",
      type: "string", // (Optional) make this a reference to your post doc later
      validation: (Rule) => Rule.required(),
    }),

    // Exactly ONE: image OR YouTube URL
    defineField({
      name: "media",
      title: "Cover Media (Image or YouTube)",
      type: "array",
      of: [
        {
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        },
        {
          type: "object",
          name: "youtube",            // <-- stable _type for clean GROQ/FE
          title: "YouTube Video",
          fields: [
            {
              name: "videoUrl",
              type: "url",
              title: "YouTube URL",
              description:
                "e.g. https://youtu.be/VIDEO_ID or https://www.youtube.com/watch?v=VIDEO_ID",
              validation: (Rule) =>
                Rule.required()
                  .uri({ scheme: ["http", "https"] })
                  .custom((url) => {
                    if (!url) return true
                    try {
                      const { hostname } = new URL(url)
                      const allowed = ["youtube.com", "www.youtube.com", "youtu.be"]
                      return allowed.includes(hostname)
                        ? true
                        : "URL must be a YouTube link (youtube.com / youtu.be)"
                    } catch {
                      return "Invalid URL"
                    }
                  }),
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.min(1).max(1).error("Add exactly ONE image OR ONE YouTube URL"),
    }),
  ],
})
