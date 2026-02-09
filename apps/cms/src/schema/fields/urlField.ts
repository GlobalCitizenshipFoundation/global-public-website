import { defineField } from "sanity";

export const urlField = (name: string, title: string, opts?: { required?: boolean }) =>
  defineField({
    name,
    title,
    type: "url",
    validation: (Rule) => {
      let r = Rule.uri({ scheme: ["http", "https"], allowRelative: false });
      if (opts?.required) r = r.required();
      return r;
    },
  });
