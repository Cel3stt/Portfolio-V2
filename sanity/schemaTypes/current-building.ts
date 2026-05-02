// import { defineField, defineType } from "sanity";

import { defineField, defineType } from "sanity";

// export default defineType({
//     name: 'currentBuilding',
//     title: 'Current Building',
//     type: 'array',
//     of: [{ type: 'object', fields: [
//         defineField({
//             name: 'taskName',
//             title: 'Task Name',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'techstackUsed',
//             title: 'Techstack Used',
//             type: 'array',
//             of: [{ type: 'string'}],
//             validation: (Rule) => Rule.required(),
//         }),
//         defineField({
//             name: 'status',
//             title: 'Status',
//             type: 'string',
//             validation: (Rule) => Rule.required(),
//         })
//     ]}],
// })

export default defineType ({
    name: 'currentBuilding',
    title: 'Current Building',
    type: 'document',
    fields: [
        defineField({
            name: 'taskName',
            title: 'Tasks',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'taskName',
                            title: 'Task Name',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'techstackUsed',
                            title: 'Techstack Used',
                            type: 'array',
                            of: [{ type: 'string' }],
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'status',
                            title: 'Status',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'taskName',
                            subtitle: 'status',
                        },
                    },
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        
    ]
})