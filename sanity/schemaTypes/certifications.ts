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
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
      
    ],
    preview: {
        select: {
            title: 'certificationName',
            subtitle: 'certificationIssuer',
             date: 'certificationDate',

        },
        prepare(selection){
            const {title, subtitle, date} = selection;
            return {
                title: title,
                subtitle: subtitle,
                date: date,
            }
        }
    }
})