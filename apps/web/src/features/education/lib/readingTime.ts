import type { PortableTextBlock } from "@portabletext/react";

function isObj(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function getProp(obj: Record<string, unknown>, key: string): unknown {
  return obj[key];
}

function collectText(node: unknown, out: string[]) {
  if (!node) return;

  if (typeof node === "string") {
    out.push(node);
    return;
  }

  if (Array.isArray(node)) {
    for (const n of node) collectText(n, out);
    return;
  }

  if (isObj(node)) {
    const t = getProp(node, "text");
    if (typeof t === "string") out.push(t);

    for (const v of Object.values(node)) collectText(v, out);
  }
}

export function isPortableTextBlockArray(x: unknown): x is PortableTextBlock[] {
  if (!Array.isArray(x)) return false;
  // minimalny, bezpieczny check: każdy block to obiekt z _type
  return x.every((item) => isObj(item) && typeof getProp(item, "_type") === "string");
}

export function readingMinutes(blocks: PortableTextBlock[] | undefined, wordsPerMinute = 200) {
  if (!blocks?.length) return 0;

  const parts: string[] = [];
  collectText(blocks, parts);

  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;

  if (words === 0) return 0;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
