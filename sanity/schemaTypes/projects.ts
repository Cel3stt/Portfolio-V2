import { defineField, defineType } from "sanity";

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'projectName',
            title: 'Project Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectDescription',
            title: 'Project Description',
            type: 'object',
             fields: [
    {
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
        name: 'projectImage',
        title: 'Project Image',
        type: 'image',
    }
  ],
            
        }),
        defineField({
            name: 'projectLink',
            title: 'Project Link',
            type: 'object',
            fields: [
                {
                    name: 'projectLabel',
                    title: 'Project Label',
                    type: 'string',
                },
                {
                    name: 'projectURL',
                    title: 'Project URL',
                    type: 'url',
                    validation: (Rule) => Rule.uri({scheme: ['http', 'https']})

                }
            ]
        })
    ]
})