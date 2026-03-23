import type { CategoryType } from "@gcf/types";
import { sanityClient } from "@/shared/sanity/client";

export async function getCategories(): Promise<CategoryType[]> {
  const groq = `*[_type == "articleCategory"] | order(title asc) {
    _id,
    name,
    description
  }`;

  const res = await sanityClient.fetch(groq);
  return res ?? [];
}
