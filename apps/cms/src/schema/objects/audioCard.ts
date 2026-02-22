import { defineField, defineType } from "sanity";

export const audioCard = defineType({
  name: "audioCard",
  title: "Audio Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "audio",
      title: "Audio file",
      type: "file",
      options: { accept: "audio/*" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "durationSec",
      title: "Duration (seconds)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "peaks",
      title: "Waveform peaks",
      type: "array",
      of: [{ type: "number" }],
      description: "Opcjonalnie: 60-120 wartości 0..1 do rysowania waveform.",
    }),
  ],
});
