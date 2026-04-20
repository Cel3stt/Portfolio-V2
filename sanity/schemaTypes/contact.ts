import { defineField, defineType } from "sanity";

export default defineType({
    name: 'contact',
    title: 'Contact',
    type: 'array',
    of: [
        {
            type: 'object',
            fields: [
                defineField({
                    name: 'contactType',
                    title: 'Contact Type',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'contactUrl',
                    title: 'Contact URL',
                    type: 'url',
                    validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto'] }).required(),
                })
            ]
        }
    ]
})