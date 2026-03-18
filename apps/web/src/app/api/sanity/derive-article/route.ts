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
  operation?: unknown;
  transition?: unknown;
  result?: unknown;
  ids?: unknown;
};

type ArticleSnapshot = {
  body?: unknown;
  readingLength?: unknown;
};

const recentDocumentRuns = new Map<string, number>();

function isObj(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getString(obj: Record<string, unknown>, key: string): string | null {
  const value = obj[key];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function getNumberEnv(name: string): number | null {
  const value = process.env[name];
  if (!value) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
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

function jsonError(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error: message, ...extra }, { status });
}

function getWebhookDocumentId(payload: Record<string, unknown>): string | null {
  return getString(payload, "documentId") ?? getString(payload, "_id") ?? getString(payload, "id");
}

function getWebhookDocumentType(payload: Record<string, unknown>): string | null {
  return getString(payload, "type") ?? getString(payload, "_type");
}

function getHeaderSnapshot(req: Request) {
  return {
    userAgent: req.headers.get("user-agent"),
    origin: req.headers.get("origin"),
    referer: req.headers.get("referer"),
    contentType: req.headers.get("content-type"),
    xForwardedFor: req.headers.get("x-forwarded-for"),
    xForwardedHost: req.headers.get("x-forwarded-host"),
    xForwardedProto: req.headers.get("x-forwarded-proto"),
    xWebhookSecretPresent: Boolean(req.headers.get("x-webhook-secret")),
  };
}

function sanitizePayloadForLogs(payload: Record<string, unknown>) {
  return {
    documentId:
      getString(payload, "documentId") ?? getString(payload, "_id") ?? getString(payload, "id"),
    documentType: getString(payload, "type") ?? getString(payload, "_type"),
    operation: getString(payload, "operation"),
    transition: getString(payload, "transition"),
    keys: Object.keys(payload),
  };
}

function getBooleanEnv(name: string): boolean {
  return process.env[name] === "true";
}

function isPatchDisabled() {
  return getBooleanEnv("SANITY_DERIVE_DISABLE_PATCH");
}

function getCooldownMs() {
  return getNumberEnv("SANITY_DERIVE_COOLDOWN_MS") ?? 0;
}

function shouldCooldownDocument(documentId: string, now: number) {
  const cooldownMs = getCooldownMs();
  if (cooldownMs <= 0) return false;

  const lastRun = recentDocumentRuns.get(documentId);
  if (typeof lastRun === "number" && now - lastRun < cooldownMs) {
    return true;
  }

  recentDocumentRuns.set(documentId, now);
  return false;
}

function cleanupCooldownMap(now: number) {
  const cooldownMs = getCooldownMs();
  if (cooldownMs <= 0) {
    recentDocumentRuns.clear();
    return;
  }

  for (const [documentId, timestamp] of recentDocumentRuns.entries()) {
    if (now - timestamp > cooldownMs * 3) {
      recentDocumentRuns.delete(documentId);
    }
  }
}

export async function POST(req: Request) {
  const startedAt = Date.now();
  const requestHeaders = getHeaderSnapshot(req);

  const expectedSecret = getEnv("SANITY_WEBHOOK_SECRET");
  if (!expectedSecret) {
    console.error("[sanity-derive-article] missing secret", requestHeaders);

    return jsonError("Missing SANITY_WEBHOOK_SECRET", 500);
  }

  const providedSecret = req.headers.get("x-webhook-secret");
  if (providedSecret !== expectedSecret) {
    console.warn("[sanity-derive-article] unauthorized", requestHeaders);

    return jsonError("Unauthorized", 401);
  }

  const payload = (await req.json().catch(() => null)) as WebhookPayload | null;

  if (!isObj(payload)) {
    console.warn("[sanity-derive-article] invalid-json", requestHeaders);

    return jsonError("Invalid JSON payload", 400);
  }

  const payloadLog = sanitizePayloadForLogs(payload);

  console.info("[sanity-derive-article] request", {
    headers: requestHeaders,
    payload: payloadLog,
  });

  const documentType = getWebhookDocumentType(payload);
  if (documentType !== "article") {
    console.info("[sanity-derive-article] ignored-non-article", {
      documentType,
      payload: payloadLog,
    });

    return jsonError("Not an article", 400, { ignored: true });
  }

  const documentId = getWebhookDocumentId(payload);
  if (!documentId) {
    console.warn("[sanity-derive-article] missing-document-id", payloadLog);

    return jsonError("Missing documentId", 400);
  }

  const now = Date.now();
  cleanupCooldownMap(now);

  if (shouldCooldownDocument(documentId, now)) {
    console.warn("[sanity-derive-article] cooldown-skip", {
      documentId,
      cooldownMs: getCooldownMs(),
    });

    return NextResponse.json({
      ok: true,
      documentId,
      skipped: true,
      reason: "cooldown",
    });
  }

  const sanity = getSanityWriteClient();

  const article = await sanity.fetch<ArticleSnapshot | null>(
    `*[_type == "article" && _id == $id][0]{
      body,
      readingLength
    }`,
    { id: documentId },
  );

  if (!article) {
    console.warn("[sanity-derive-article] article-not-found", { documentId });

    return jsonError("Article not found", 404);
  }

  const blocks = isPortableTextBlockArray(article.body) ? article.body : [];
  const nextReadingLength = readingMinutes(blocks, 200);
  const currentReadingLength =
    typeof article.readingLength === "number" ? article.readingLength : null;

  const shouldPatch = currentReadingLength !== nextReadingLength;
  const patchDisabled = isPatchDisabled();

  console.info("[sanity-derive-article] computed", {
    documentId,
    currentReadingLength,
    nextReadingLength,
    shouldPatch,
    patchDisabled,
    durationMs: Date.now() - startedAt,
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

  if (patchDisabled) {
    console.warn("[sanity-derive-article] patch-disabled", {
      documentId,
      currentReadingLength,
      nextReadingLength,
    });

    return NextResponse.json({
      ok: true,
      documentId,
      readingLength: nextReadingLength,
      skipped: true,
      reason: "patch-disabled",
    });
  }

  await sanity.patch(documentId).set({ readingLength: nextReadingLength }).commit({
    autoGenerateArrayKeys: false,
  });

  console.info("[sanity-derive-article] patched", {
    documentId,
    currentReadingLength,
    nextReadingLength,
    durationMs: Date.now() - startedAt,
  });

  return NextResponse.json({
    ok: true,
    documentId,
    readingLength: nextReadingLength,
    skipped: false,
  });
}
