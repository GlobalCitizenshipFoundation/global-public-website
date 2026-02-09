import type { TitledListValue } from "sanity";

export function listOf<T extends string>(items: readonly TitledListValue<T>[]) {
  return items as unknown as (T | TitledListValue<T>)[];
}
