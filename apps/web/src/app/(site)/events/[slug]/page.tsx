import type { EventSingleType } from "@gcf/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { EventSingle } from "@/features/event";
import { getEventBySlug } from "@/features/event/api/getEventBySlug";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getEventBySlugCached = cache(async (slug: string) => getEventBySlug(slug));

function pickTitle(event: EventSingleType, slug: string) {
  if (
    "eventHeading" in event &&
    typeof event.eventHeading === "string" &&
    event.eventHeading.trim()
  )
    return event.eventHeading;

  if ("title" in event && typeof event.title === "string" && event.title.trim()) return event.title;

  return slug.replace(/-/g, " ");
}

function pickDescription(event: EventSingleType) {
  if (
    "metaDescription" in event &&
    typeof event.metaDescription === "string" &&
    event.metaDescription.trim()
  )
    return event.metaDescription;

  if (
    "shortDescription" in event &&
    typeof event.shortDescription === "string" &&
    event.shortDescription.trim()
  )
    return event.shortDescription;

  return "Event by Global Citizenship Foundation.";
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

function pickOgImage(event: EventSingleType): string | undefined {
  if (!("eventImage" in event)) return undefined;

  const img = (event as { eventImage?: unknown }).eventImage;
  if (isOgImageShape(img)) return img.asset.url;

  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = await getEventBySlugCached(slug);
  if (!event) {
    return {
      title: "Event not found",
      robots: { index: false, follow: false },
    };
  }

  const title = pickTitle(event, slug);
  const description = pickDescription(event);
  const ogImage = pickOgImage(event);

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

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;

  const event = await getEventBySlugCached(slug);
  if (!event) return notFound();

  return <EventSingle event={event} />;
}
