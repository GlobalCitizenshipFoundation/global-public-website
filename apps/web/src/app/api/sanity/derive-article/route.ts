import type { PortableTextBlock } from "@portabletext/react";
import { NextResponse } from "next/server";

import { readingMinutes } from "@/features/education/lib/readingTime";
import { getSanityWriteClient } from "@/shared/sanity/server";

type WebhookPayload = {
  _id?: unknown;
  id?: unknown;
  documentId?: unknown;
  _type?: unknown;
  type?: unknown;
};

function isObj(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getString(obj: Record<string, unknown>, key: string): string | null {
  const value = obj[key];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function getEnv(name: string): string | null {
  const value = process.env[name];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function hasStringProp(obj: Record<string, unknown>, key: string): boolean {
  const value = obj[key];
  return typeof value === "string" && value.trim().length > 0;
}

function isPortableTextBlockArray(value: unknown): value is PortableTextBlock[] {
  if (!Array.isArray(value)) return false;

  return value.every((item) => isObj(item) && hasStringProp(item, "_type"));
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function getWebhookDocumentId(payload: Record<string, unknown>): string | null {
  return getString(payload, "documentId") ?? getString(payload, "_id") ?? getString(payload, "id");
}

function getWebhookDocumentType(payload: Record<string, unknown>): string | null {
  return getString(payload, "type") ?? getString(payload, "_type");
}

export async function POST(req: Request) {
  const expectedSecret = getEnv("SANITY_WEBHOOK_SECRET");

  if (!expectedSecret) {
    return jsonError("Missing SANITY_WEBHOOK_SECRET", 500);
  }

  const providedSecret = req.headers.get("x-webhook-secret");
  if (providedSecret !== expectedSecret) {
    return jsonError("Unauthorized", 401);
  }

  const payload = (await req.json().catch(() => null)) as WebhookPayload | null;

  if (!isObj(payload)) {
    return jsonError("Invalid JSON payload", 400);
  }

  const documentType = getWebhookDocumentType(payload);
  if (documentType !== "article") {
    return jsonError("Not an article", 400);
  }

  const documentId = getWebhookDocumentId(payload);
  if (!documentId) {
    return jsonError("Missing documentId", 400);
  }

  const sanity = getSanityWriteClient();

  const article = await sanity.fetch<{
    body?: unknown;
    readingLength?: unknown;
  } | null>(
    `*[_type == "article" && _id == $id][0]{
      body,
      readingLength
    }`,
    { id: documentId },
  );

  if (!article) {
    return jsonError("Article not found", 404);
  }

  const blocks = isPortableTextBlockArray(article.body) ? article.body : [];
  const nextReadingLength = readingMinutes(blocks, 200);
  const currentReadingLength =
    typeof article.readingLength === "number" ? article.readingLength : null;

  const shouldPatch = currentReadingLength !== nextReadingLength;

  console.info("[sanity-derive-article]", {
    documentId,
    currentReadingLength,
    nextReadingLength,
    shouldPatch,
    userAgent: req.headers.get("user-agent"),
  });

  if (!shouldPatch) {
    return NextResponse.json({
      ok: true,
      documentId,
      readingLength: nextReadingLength,
      skipped: true,
      reason: "unchanged",
    });
  }

  await sanity.patch(documentId).set({ readingLength: nextReadingLength }).commit({
    autoGenerateArrayKeys: false,
  });

  return NextResponse.json({
    ok: true,
    documentId,
    readingLength: nextReadingLength,
    skipped: false,
  });
}
