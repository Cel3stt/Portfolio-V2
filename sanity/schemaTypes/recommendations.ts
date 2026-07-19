import { defineField, defineType } from "sanity";

export default defineType({
  name: "recommendations",
  title: "Recommendations",
  type: "document",
  fields: [
    defineField({
      name: "recommendationList",
      title: "Recommendation List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "recommenderName",
              title: "Recommender Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "recommenderTitle",
              title: "Recommender Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "recommenderCompany",
              title: "Recommender Company",
              type: "string",
            }),
            defineField({
              name: "recommendationText",
              title: "Recommendation Text",
              type: "text",
            }),
            defineField({
              name: "recommenderImage",
              title: "Recommender Image",
              type: "image",
            }),
            defineField({
              name: "recommendationUrl",
              title: "Recommendation URL",
              type: "url",
              validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: {
              title: "recommenderName",
              subtitle: "recommenderTitle",
              media: "recommenderImage",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Recommendations" };
    },
  },
});
