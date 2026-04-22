import { defineField, defineType } from "sanity";

export default defineType({
    name: 'certifications',
    title: 'Certifications',
    type: 'document',
    fields: [
        defineField({
            name: 'certificationName',
            title: 'Certification Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'certificationIssuer',
            title: 'Certification Issuer',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'certificationDate',
            title: 'Certification Date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
      
    ]
})