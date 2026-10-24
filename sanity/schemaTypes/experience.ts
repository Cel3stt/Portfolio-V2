import { defineField, defineType } from "sanity";

export default defineType({
    name: 'experience',
    title: 'Experience',
    type: 'document',
    fields: [
       defineField({
        name: 'experienceName',
        title: 'Experience Name',
        type: 'array',
        of: [
            {
                type: 'object',
                fields:[
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
                    defineField({
                        name: 'skills',
                        title: 'Skills',
                        type: 'array',
                        of: [{ type: 'string' }],
                    }),
                ]
            }
        ]
       }),
       defineField({
        name: 'educationList',
        title: 'Education List',
        type: 'array',
        of: [
            {
                type: 'object',
                fields: [
                    defineField({
                        name: 'schoolName',
                        title: 'School Name',
                        type: 'string',
                        validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                        name: 'degree',
                        title: 'Degree',
                        type: 'string',
                    }),
                    defineField({
                        name: 'startDate',
                        title: 'Start Date',
                        type: 'string',
                    }),
                    defineField({
                        name: 'endDate',
                        title: 'End Date',
                        type: 'string',
                    }),
                    defineField({
                        name: 'awards',
                        title: 'Awards',
                        type: 'array',
                        of: [{ type: 'string' }],
                    }),
                ],
                preview: {
                    select: {
                        title: 'schoolName',
                        subtitle: 'degree',
                    },
                },
            }
        ]
       })
    ]
})