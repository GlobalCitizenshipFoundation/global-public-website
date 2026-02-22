import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { getArticleBySlug } from "@/features/education/api/getArticleBySlug";
import ArticleSingleComponent from "@/features/education/ui/ArticleSingle";

// jeśli nadal chcesz force-dynamic, zostaw
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getArticleBySlugCached = cache(async (slug: string) => getArticleBySlug(slug));

function pickTitle(article: unknown, slug: string) {
  if (article && typeof article === "object" && "title" in article) {
    const t = (article as { title?: unknown }).title;
    if (typeof t === "string" && t.trim()) return t;
  }
  return slug.replace(/-/g, " ");
}

function pickDescription(article: unknown) {
  if (article && typeof article === "object" && "description" in article) {
    const d = (article as { description?: unknown }).description;
    if (typeof d === "string" && d.trim()) return d;
  }
  return "Article by Global Citizenship Foundation.";
}

type OgImageShape = { asset: { url: string } };

function isOgImageShape(value: unknown): value is OgImageShape {
  if (!value || typeof value !== "object") return false;
  if (!("asset" in value)) return false;

  const asset = (value as { asset?: unknown }).asset;
  if (!asset || typeof asset !== "object") return false;
  if (!("url" in asset)) return false;

  const url = (asset as { url?: unknown }).url;
  return typeof url === "string" && url.trim().length > 0;
}

function pickOgImage(article: unknown): string | undefined {
  if (!article || typeof article !== "object") return undefined;
  if (!("coverImage" in article)) return undefined;

  const img = (article as { coverImage?: unknown }).coverImage;
  if (isOgImageShape(img)) return img.asset.url;

  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await getArticleBySlugCached(slug);
  if (!article) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    };
  }

  const title = pickTitle(article, slug);
  const description = pickDescription(article);
  const ogImage = pickOgImage(article);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(ogImage ? { images: [{ url: ogImage, alt: title }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const article = await getArticleBySlugCached(slug);
  if (!article) return notFound();

  return <ArticleSingleComponent article={article} />;
}
