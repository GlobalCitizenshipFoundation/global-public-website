import { publicEnv } from '@/shared/env/public';
import type { MetadataRoute } from 'next';

async function safeGetSlugs(): Promise<{
  events: string[];
  partners: string[];
  contributors: string[];
  magazine: string[];
}> {
  return { events: [], partners: [], contributors: [], magazine: [] };
}

function getSiteUrl(): string {
  return publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '') || 'http://localhost:3000';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const now = new Date();
  const { events, partners, contributors, magazine } = await safeGetSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/partners`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contributors`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/magazine`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...events.map((slug) => ({
      url: `${siteUrl}/events/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...partners.map((slug) => ({
      url: `${siteUrl}/partners/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...contributors.map((slug) => ({
      url: `${siteUrl}/contributors/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...magazine.map((slug) => ({
      url: `${siteUrl}/magazine/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
