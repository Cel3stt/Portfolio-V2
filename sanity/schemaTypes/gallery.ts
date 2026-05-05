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
                    type: 'image',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Image Title',
                            type: 'string',
                        }),
                    ],
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