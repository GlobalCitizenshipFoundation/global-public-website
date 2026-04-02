import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileComponent } from "./ProfileComponent";
import type { ProfileSingleType } from "@gcf/types";

type PageProps = {
  params: { slug: string };
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function pickFirstNonEmptyString(obj: unknown, keys: readonly string[]): string | undefined {
  if (!isRecord(obj)) return undefined;

  for (const key of keys) {
    const v = obj[key];
    if (typeof v === "string") {
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

    const asset = img["asset"];
    if (!isRecord(asset)) continue;

    const url = asset["url"];
    if (typeof url === "string" && url.trim()) return url.trim();
  }

  return undefined;
}

function buildTitle(contributor: unknown, slug: string) {
  return (
    pickFirstNonEmptyString(contributor, ["name", "fullName", "title", "heading"]) ??
    slug.replace(/-/g, " ")
  );
}

function buildDescription(contributor: unknown) {
  return (
    pickFirstNonEmptyString(contributor, ["metaDescription", "shortBio", "bio", "description"]) ??
    "Contributor profile on Global Citizenship Foundation."
  );
}

type CreatePageOptions = {
  getBySlug: (slug: string) => Promise<ProfileSingleType | null>;
};

export function createProfilePage({ getBySlug }: CreatePageOptions) {
  async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const data = await getBySlug(slug);

    if (!data) {
      return {
        title: "Profile not found",
        robots: { index: false, follow: false },
      };
    }

    const title = buildTitle(data, slug);
    const description = buildDescription(data);
    const ogImage = pickAssetUrl(data, ["image", "photo", "avatar", "profileImage"]);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "profile",
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

  async function Page({ params }: PageProps) {
    const { slug } = await params;
    const data = await getBySlug(slug);

    if (!data) return notFound();

    return <ProfileComponent contributor={data} />;
  }

  return {
    generateMetadata,
    Page,
  };
}
