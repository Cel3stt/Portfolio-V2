import { defineField, defineType } from "sanity";

export default defineType({
    name: 'gallery',
    title: 'Gallery',
    type: 'document',
    fields: [
        defineField({
            name: 'galleryTitle',
            title: 'Gallery Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'galleryTitle',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'galleryImages',
            title: 'Gallery Images',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'imageGroup',
                    title: 'Image Group',
                    fields: [
                        defineField({
                            name: 'imageTitle',
                            title: 'Image Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'images',
                            title: 'Images',
                            type: 'array',
                            of: [{ type: 'image' }],
                            validation: (Rule) => Rule.min(1),
                        }),
                    ],
                    preview: {
                        select: { title: 'imageTitle', media: 'images.0' },
                    },
                },
            ],
        }),
        defineField({
            name: 'galleryDescription',
            title: 'Gallery Description',
             type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
            { title: "Horizontal line", value: "hr" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
            { title: 'Lined', value: 'lined' },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                  }),
                ],
              },
            ],
          },
        },
      ],
        }),
        
    ]
})