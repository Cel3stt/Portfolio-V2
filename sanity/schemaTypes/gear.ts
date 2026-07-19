import { defineField, defineType } from "sanity";

export default defineType({
  name: "gear",
  title: "Gear",
  type: "document",
  fields: [
    defineField({
      name: "gearCategory",
      title: "Gear Category",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "categoryName",
              title: "Category Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "gearList",
              title: "Gear List",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "gearName",
                      title: "Gear Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "gearDescription",
                      title: "Gear Description",
                      type: "string",
                    }),
                    defineField({
                      name: "gearUrl",
                      title: "Gear URL",
                      type: "url",
                      validation: (Rule) =>
                        Rule.uri({ scheme: ["http", "https"] }),
                    }),
                    defineField({
                      name: "gearImage",
                      title: "Gear Image",
                      type: "image",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "gearName",
                      media: "gearImage",
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "categoryName",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Gear" };
    },
  },
});
