import type { TitledListValue } from "sanity";

export type Audience = "educators" | "educationLeaders" | "youth" | "institutions";

export const AUDIENCE_LIST = [
  { title: "Educators", value: "educators" },
  { title: "Education Leaders", value: "educationLeaders" },
  { title: "Youth", value: "youth" },
  { title: "Institutions", value: "institutions" },
] as const satisfies readonly TitledListValue<Audience>[];
