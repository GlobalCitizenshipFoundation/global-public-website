import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import type { MagazinSingleType } from '@gcf/types';
import { getMagazineBySlug } from '@/features/magazine/api/getMagazineBySlug';
import MagazineSingleComponent from '@/features/magazine/ui/MagazineSingleComponent';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function pickTitle(magazine: MagazinSingleType, slug: string) {
  if ('title' in magazine && typeof magazine.title === 'string' && magazine.title.trim()) {
    return magazine.title;
  }
  if ('heading' in magazine && typeof magazine.heading === 'string' && magazine.heading.trim()) {
    return magazine.heading;
  }
  return slug.replace(/-/g, ' ');
}

function pickDescription(magazine: MagazinSingleType) {
  if (
    'description' in magazine &&
    typeof magazine.description === 'string' &&
    magazine.description.trim()
  ) {
    return magazine.description;
  }
  if (
    'shortDescription' in magazine &&
    typeof magazine.shortDescription === 'string' &&
    magazine.shortDescription.trim()
  ) {
    return magazine.shortDescription;
  }
  return 'Read the latest edition of the .ed Magazine by Global Citizenship Foundation.';
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

function pickOgImage(magazine: MagazinSingleType): string | undefined {
  // 1) prefer: magazinImage
  if ('magazinImage' in magazine) {
    const img = (magazine as { magazinImage?: unknown }).magazinImage;
    if (isImageWithAssetUrl(img)) return img.asset.url;
  }

  // 2) fallback: coverImage
  if ('coverImage' in magazine) {
    const img = (magazine as { coverImage?: unknown }).coverImage;
    if (isImageWithAssetUrl(img)) return img.asset.url;
  }

  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const magazine = await getMagazineBySlug(slug);

  if (!magazine) {
    return {
      title: 'Magazine not found',
      robots: { index: false, follow: false },
    };
  }

  const title = pickTitle(magazine, slug);
  const description = pickDescription(magazine);
  const ogImage = pickOgImage(magazine);

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

export default async function MagazinePage({ params }: PageProps) {
  const { slug } = await params;
  const magazine = await getMagazineBySlug(slug);
  if (!magazine) return notFound();

  return <MagazineSingleComponent magazine={magazine} />;
}
