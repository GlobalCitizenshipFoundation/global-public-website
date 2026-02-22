// apps/web/src/app/api/media/route.ts
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const UPSTREAM_TIMEOUT_MS = 25_000;

// Env przez index signature (TS4111-friendly)
const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? null;

function allowedOriginFromSiteUrl(): string | null {
  if (!SITE_URL) return null;
  try {
    return new URL(SITE_URL).origin;
  } catch {
    return null;
  }
}

const ALLOWED_ORIGIN = allowedOriginFromSiteUrl();

function isAllowedOrigin(origin: string) {
  if (ALLOWED_ORIGIN && origin === ALLOWED_ORIGIN) return true;

  // Opcjonalnie: pozwól na Netlify Deploy Previews / branch deploys
  if (origin.endsWith(".netlify.app")) return true;

  return false;
}

function isAllowedSanityAssetUrl(url: URL) {
  if (url.protocol !== "https:") return false;
  if (url.hostname !== "cdn.sanity.io") return false;

  if (!url.pathname.startsWith("/files/")) return false;
  if (url.pathname.includes("..")) return false;

  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length < 4) return false;
  if (parts[0] !== "files") return false;

  const [, projectId, dataset] = parts;
  if (!projectId || !dataset) return false;

  const simple = /^[a-z0-9_-]+$/i;
  if (!simple.test(projectId)) return false;
  if (!simple.test(dataset)) return false;

  return true;
}

function pickHeader(upstream: Headers, name: string) {
  return upstream.get(name) ?? null;
}

function baseNoCache(headers: Headers) {
  headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");
  headers.set("Vary", "Accept, Accept-Encoding, Range, Origin");
}

function withCors(headers: Headers, req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return;
  if (!isAllowedOrigin(origin)) return;

  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Range, Content-Type");
  headers.set(
    "Access-Control-Expose-Headers",
    "Content-Range, Accept-Ranges, Content-Length, ETag, Last-Modified",
  );
  headers.set("Access-Control-Max-Age", "600");
}

async function proxy(req: NextRequest, withBody: boolean) {
  const raw = req.nextUrl.searchParams.get("url");
  if (!raw) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (!isAllowedSanityAssetUrl(u)) {
    return NextResponse.json({ error: "Blocked url" }, { status: 403 });
  }

  const range = req.headers.get("range");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  let upstream: Response;
  try {
    const init: RequestInit = {
      method: withBody ? "GET" : "HEAD",
      redirect: "follow",
      cache: "no-store",
      signal: controller.signal,
    };

    if (range) init.headers = { range };

    upstream = await fetch(u.toString(), init);
  } catch (e) {
    clearTimeout(timeout);

    const aborted = e instanceof DOMException && e.name === "AbortError";
    return NextResponse.json(
      { error: aborted ? "Upstream timeout" : "Upstream fetch failed" },
      { status: aborted ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "Upstream fetch failed", status: upstream.status },
      { status: upstream.status },
    );
  }

  const headers = new Headers();

  headers.set(
    "Content-Type",
    pickHeader(upstream.headers, "content-type") ?? "application/octet-stream",
  );

  const contentRange = pickHeader(upstream.headers, "content-range");
  if (contentRange) headers.set("Content-Range", contentRange);

  const contentLength = pickHeader(upstream.headers, "content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  headers.set("Accept-Ranges", pickHeader(upstream.headers, "accept-ranges") ?? "bytes");

  const etag = pickHeader(upstream.headers, "etag");
  if (etag) headers.set("ETag", etag);

  const lastMod = pickHeader(upstream.headers, "last-modified");
  if (lastMod) headers.set("Last-Modified", lastMod);

  const contentDisp = pickHeader(upstream.headers, "content-disposition");
  if (contentDisp) headers.set("Content-Disposition", contentDisp);

  const contentEnc = pickHeader(upstream.headers, "content-encoding");
  if (contentEnc) headers.set("Content-Encoding", contentEnc);

  baseNoCache(headers);
  withCors(headers, req);

  return new NextResponse(withBody ? upstream.body : null, {
    status: upstream.status,
    headers,
  });
}

export function GET(req: NextRequest) {
  return proxy(req, true);
}

export function HEAD(req: NextRequest) {
  return proxy(req, false);
}

export function OPTIONS(req: NextRequest) {
  const headers = new Headers();
  baseNoCache(headers);
  withCors(headers, req);
  return new NextResponse(null, { status: 204, headers });
}
