import { type NextRequest, NextResponse } from "next/server";

function isAllowedSanityAssetUrl(url: URL) {
  if (url.protocol !== "https:") return false;
  if (url.hostname !== "cdn.sanity.io") return false;

  // minimalna walidacja ścieżki dla files
  // /files/<projectId>/<dataset>/<assetId>.m4a
  return url.pathname.startsWith("/files/");
}

export async function GET(req: NextRequest) {
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

  const upstream = await fetch(u.toString(), {
    // ważne: żadnych cookies/credentials
    redirect: "follow",
  });

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: "Upstream fetch failed", status: upstream.status },
      { status: 502 },
    );
  }

  const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
  const cacheControl =
    upstream.headers.get("cache-control") ?? "public, max-age=3600, s-maxage=3600";

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
      // range requests pomagają audio seekować
      "Accept-Ranges": "bytes",
    },
  });
}
