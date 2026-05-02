import { defineField, defineType } from "sanity";

export default defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
        defineField({
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'jobTitle',
            title: 'Job Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'startDate',
            title: 'Start Date',    
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'endDate',
            title: 'End Date',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'companyLocation',
            title: 'Company Location',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'jobDescription',
            title: 'Job Description',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
    ]
})