import { defineField, defineType } from "sanity";

export default defineType({
    name: 'projectDetails',
    title: 'Project Details',
    type: 'document',
    fields: [
        defineField({
            name: 'projectName',
            title: 'Project Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectDate',
            title: 'Project Date',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'techStack',
            title: 'Tech Stack',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectRole',
            title: 'Project Role',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectOverview',
            title: 'Project Overview',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectImage',
            title: 'Project Image',
            type: 'array',
            of: [{ type: 'image' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectFeatures',
            title: 'Project Features',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.required(),
        })
    ]

})