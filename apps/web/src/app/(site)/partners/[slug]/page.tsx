import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { PartnerSingleType } from '@gcf/types';
import PartnerSingleComponent from '@/features/partners/ui/PartnerSingleComponent';
import { getPartnerBySlug } from '@/features/partners/api/getPartnerBySlug';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function pickTitle(partner: PartnerSingleType, slug: string) {
  if ('title' in partner && typeof partner.title === 'string' && partner.title.trim()) {
    return partner.title;
  }

  if ('heading' in partner && typeof partner.heading === 'string' && partner.heading.trim()) {
    return partner.heading;
  }

  return slug.replace(/-/g, ' ');
}

function pickDescription(partner: PartnerSingleType) {
  if (
    'description' in partner &&
    typeof partner.description === 'string' &&
    partner.description.trim()
  ) {
    return partner.description;
  }

  if (
    'shortDescription' in partner &&
    typeof partner.shortDescription === 'string' &&
    partner.shortDescription.trim()
  ) {
    return partner.shortDescription;
  }

  return 'Partner of the Global Citizenship Foundation.';
}

type ImageWithAssetUrl = { asset: { url: string } };

function isImageWithAssetUrl(value: unknown): value is ImageWithAssetUrl {
  if (!value || typeof value !== 'object') return false;
  if (!('asset' in value)) return false;

  const asset = (value as { asset?: unknown }).asset;
  if (!asset || typeof asset !== 'object') return false;
  if (!('url' in asset)) return false;

  const url = (asset as { url?: unknown }).url;
  return typeof url === 'string' && url.trim().length > 0;
}

function pickOgImage(partner: PartnerSingleType): string | undefined {
  // prefer: logo
  if ('logo' in partner) {
    const logo = (partner as { logo?: unknown }).logo;
    if (isImageWithAssetUrl(logo)) return logo.asset.url;
  }

  // fallback: image
  if ('image' in partner) {
    const img = (partner as { image?: unknown }).image;
    if (isImageWithAssetUrl(img)) return img.asset.url;
  }

  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);

  if (!partner) {
    return {
      title: 'Partner not found',
      robots: { index: false, follow: false },
    };
  }

  const title = pickTitle(partner, slug);
  const description = pickDescription(partner);
  const ogImage = pickOgImage(partner);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
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

export default async function PartnerPage({ params }: PageProps) {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);
  if (!partner) return notFound();

  return <PartnerSingleComponent partner={partner} />;
}
