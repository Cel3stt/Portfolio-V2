import { defineField, defineType } from "sanity";

export default defineType({
    name: 'hero',
    title: 'Hero',
    type: 'document',
    fields: [
        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'avatarImage',
            title: 'Avatar Image',
            type: 'image',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'welcomeMessage',
            title: 'Welcome Message',
            type: 'string',
            validation: (Rule) => Rule.required(),
        })

    ]
})