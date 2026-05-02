import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "projectName",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "projectName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectDescription",
      title: "Project Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
      defineField({
        name: "projectURL",
        title: "Project URL",
        type: "url",
        validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
      }),
  ],
});