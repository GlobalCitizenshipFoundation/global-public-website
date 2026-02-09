import type { StringRule } from "sanity";

export const hexColorValidation = (rule: StringRule) =>
  rule
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, { name: "hex", invert: false })
    .error("Use HEX color, e.g. #111111 or #fff");
