import type { TitledListValue } from "sanity";
import type { PricingStatus } from "../helpers/getDoc";

export const PRICING_LIST = [
  { title: "Free", value: "free" },
  { title: "Paid", value: "paid" },
] as const satisfies readonly TitledListValue<PricingStatus>[];
