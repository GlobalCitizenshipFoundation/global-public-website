import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

function isAllowedSanityAssetUrl(url: URL) {
  if (url.protocol !== "https:") return false;
  if (url.hostname !== "cdn.sanity.io") return false;
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

  const range = req.headers.get("range");
  const upstream = await fetch(u.toString(), {
    redirect: "follow",
    cache: "no-store",
    ...(range ? { headers: { range } } : {}),
  });

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: "Upstream fetch failed", status: upstream.status },
      { status: 502 },
    );
  }

  const headers = new Headers();
  headers.set("Content-Type", upstream.headers.get("content-type") ?? "application/octet-stream");

  // KLUCZ: nie pozwól CDN cachować odpowiedzi
  headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");
  headers.set("Vary", "Accept, Accept-Encoding, Range");

  // jeśli upstream odpowiada 206, przekaż Content-Range/Length
  const cr = upstream.headers.get("content-range");
  if (cr) headers.set("Content-Range", cr);

  const cl = upstream.headers.get("content-length");
  if (cl) headers.set("Content-Length", cl);

  const ar = upstream.headers.get("accept-ranges");
  if (ar) headers.set("Accept-Ranges", ar);
  else headers.set("Accept-Ranges", "bytes");

  return new NextResponse(upstream.body, {
    status: upstream.status, // zachowaj 200/206
    headers,
  });
}
