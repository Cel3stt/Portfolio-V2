import { defineField, defineType } from "sanity";

export default defineType({
    name: 'techstack',
    title: 'Tech Stack',
    type: 'document',
    fields: [
        defineField({
            name: 'techstack',
            title: 'Tech Stack',
            type: 'string',
            validation: (Rule) => Rule.required(),
        })
    ]
})