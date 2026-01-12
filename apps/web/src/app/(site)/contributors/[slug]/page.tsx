import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { ContributorSingleType } from '@gcf/types';
import { getContributorBySlug } from '@/features/contributors/api/getContributorBySlug';
import ContributorSingleComponent from '@/features/contributors/ui/ContributorSingleComponent';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: { slug: string };
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function pickFirstNonEmptyString(obj: unknown, keys: readonly string[]): string | undefined {
  if (!isRecord(obj)) return undefined;

  for (const key of keys) {
    const v = obj[key];
    if (typeof v === 'string') {
      const s = v.trim();
      if (s) return s;
    }
  }

  return undefined;
}

function pickAssetUrl(obj: unknown, keys: readonly string[]): string | undefined {
  if (!isRecord(obj)) return undefined;

  for (const key of keys) {
    const img = obj[key];
    if (!isRecord(img)) continue;

    const asset = img['asset'];
    if (!isRecord(asset)) continue;

    const url = asset['url'];
    if (typeof url === 'string' && url.trim()) return url.trim();
  }

  return undefined;
}

function buildTitle(contributor: unknown, slug: string) {
  return (
    pickFirstNonEmptyString(contributor, ['name', 'fullName', 'title', 'heading']) ??
    slug.replace(/-/g, ' ')
  );
}

function buildDescription(contributor: unknown) {
  return (
    pickFirstNonEmptyString(contributor, ['metaDescription', 'shortBio', 'bio', 'description']) ??
    'Contributor profile on Global Citizenship Foundation.'
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const contributor = await getContributorBySlug(slug);

  if (!contributor) {
    return {
      title: 'Contributor not found',
      robots: { index: false, follow: false },
    };
  }

  const data = contributor as unknown;
  const title = buildTitle(data, slug);
  const description = buildDescription(data);
  const ogImage = pickAssetUrl(data, ['image', 'photo', 'avatar', 'profileImage']);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      ...(ogImage ? { images: [{ url: ogImage, alt: title }] } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ContributorPage({ params }: PageProps) {
  const { slug } = await params;
  const contributor = await getContributorBySlug(slug);
  if (!contributor) return notFound();

  return <ContributorSingleComponent contributor={contributor as ContributorSingleType} />;
}
