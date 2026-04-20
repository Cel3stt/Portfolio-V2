import { defineField, defineType } from "sanity";

export default defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'profileImage',
            title: 'Profile image',
            type: 'image',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'about',
            title: 'About',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
    ]
})