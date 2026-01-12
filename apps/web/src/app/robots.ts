import { publicEnv } from '@/shared/env/public';
import type { MetadataRoute } from 'next';

function getSiteUrl(): string {
  return publicEnv.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  const isProd = siteUrl.startsWith('https://') && !siteUrl.includes('localhost');

  if (!isProd) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
