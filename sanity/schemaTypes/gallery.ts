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
            name: 'galleryImages',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'galleryDescription',
            title: 'Gallery Description',
            type: 'text',
        }),
        
    ]
})