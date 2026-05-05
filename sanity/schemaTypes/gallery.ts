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
            type: 'text',
        }),
        
    ]
})