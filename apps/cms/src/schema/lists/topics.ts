import type { TitledListValue } from "sanity";

export type Topic =
  | "globalCitizenship"
  | "edTech"
  | "onlineLearning"
  | "pedagogy"
  | "educationalLeadership";

export const TOPICS_LIST = [
  { title: "Global Citizenship", value: "globalCitizenship" },
  { title: "Ed Tech", value: "edTech" },
  { title: "Online Learning", value: "onlineLearning" },
  { title: "Pedagogy", value: "pedagogy" },
  { title: "Educational Leadership", value: "educationalLeadership" },
] as const satisfies readonly TitledListValue<Topic>[];
