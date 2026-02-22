import type { PortableTextBlock } from "@portabletext/react";
import { NextResponse } from "next/server";

import { readingMinutes } from "@/features/education/lib/readingTime";
import { sanityWriteClient } from "@/shared/sanity/server";

function isObj(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function getString(obj: Record<string, unknown>, key: string): string | null {
  const v = obj[key];
  return typeof v === "string" && v.trim() ? v : null;
}

function getEnv(key: string): string | null {
  const v = process.env[key];
  return typeof v === "string" && v.length ? v : null;
}

function hasStringProp(obj: Record<string, unknown>, key: string): boolean {
  const v = obj[key];
  return typeof v === "string" && v.trim().length > 0;
}

function isPortableTextBlockArray(x: unknown): x is PortableTextBlock[] {
  if (!Array.isArray(x)) return false;
  return x.every((item) => isObj(item) && hasStringProp(item, "_type"));
}

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function badRequest(msg: string) {
  return NextResponse.json({ ok: false, error: msg }, { status: 400 });
}

export async function POST(req: Request) {
  const secret = getEnv("SANITY_WEBHOOK_SECRET");
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Missing SANITY_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const provided = req.headers.get("x-webhook-secret");
  if (provided !== secret) return unauthorized();

  const json = (await req.json().catch(() => null)) as unknown;
  if (!isObj(json)) return badRequest("Invalid JSON");

  const type = getString(json, "type") ?? getString(json, "_type");
  if (type !== "article") return badRequest("Not an article");

  const id = getString(json, "documentId") ?? getString(json, "_id") ?? getString(json, "id");

  if (!id) return badRequest("Missing documentId");

  const doc = await sanityWriteClient.fetch<{ body?: unknown } | null>(
    `*[_type == "article" && _id == $id][0]{ body }`,
    { id },
  );

  if (!doc) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const blocks = isPortableTextBlockArray(doc.body) ? doc.body : undefined;
  const minutes = readingMinutes(blocks, 200);

  await sanityWriteClient.patch(id).set({ readingLength: minutes }).commit({
    autoGenerateArrayKeys: false,
  });

  return NextResponse.json({ ok: true, id, readingLength: minutes });
}
