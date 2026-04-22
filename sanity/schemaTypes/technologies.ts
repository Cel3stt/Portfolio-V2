import { defineField, defineType } from "sanity";

export default defineType({
    name: 'technologies',
    title: 'Technologies',
    type: 'document',
    fields: [
        defineField({
             name: 'technologyCategory',
        title: 'Technology Category',
        type: 'string',
        validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'technologyList',
            title: 'Technology List',
            type: 'array',
            of: [{ type: 'string'}],
            validation: (Rule) => Rule.required(),
        })
    ],

})