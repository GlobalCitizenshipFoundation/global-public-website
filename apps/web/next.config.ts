import type { NextConfig } from "next";

function buildCsp(isDev: boolean) {
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",

    "img-src 'self' data: blob: https://cdn.sanity.io",

    "media-src 'self' blob: https://cdn.sanity.io",

    "font-src 'self' data:",
    "style-src 'self' 'unsafe-inline'",
    scriptSrc,

    "connect-src 'self' https://cdn.sanity.io https://*.api.sanity.io",

    ["frame-src 'self'", "https://www.youtube.com", "https://player.vimeo.com"].join(" "),

    "upgrade-insecure-requests",
  ].join("; ");
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },

  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    const csp = buildCsp(isDev);

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },

          // OK - chroni twoją stronę przed byciem osadzoną
          { key: "X-Frame-Options", value: "DENY" },

          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(isDev
            ? []
            : [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains; preload",
                },
              ]),
        ],
      },
    ];
  },
};

export default nextConfig;
