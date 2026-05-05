import { defineField, defineType } from "sanity";

export default defineType({
  name: "contacts",
  title: "Contacts",
  type: "document",
  fields: [
    defineField({
      name: "contacts",
      title: "Contacts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "contactType",
              title: "Contact Type",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "contactUrl",
              title: "Contact URL",
              type: "url",
              validation: (Rule) =>
                Rule.uri({ scheme: ["http", "https", "mailto"] }),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contacts" };
    },
  },
});
