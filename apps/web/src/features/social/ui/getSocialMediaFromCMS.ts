// getSocialMediaFromCMS.ts
import { socialPlatforms } from '@/shared/config/social';

export type ContributorSocials = Record<string, string | undefined>;

// Zrób union jeśli możesz, inaczej zostaw string i potem zawęź w UI
export type SocialKind = (typeof socialPlatforms)[number]['name'];

export type SocialLinkData = {
  href: string;
  label: string;
  kind: SocialKind;
};

export function getSocialLinksFromCMS(contributor: ContributorSocials): SocialLinkData[] {
  return socialPlatforms
    .filter((platform) => Boolean(contributor[platform.name]))
    .map((platform) => ({
      href: contributor[platform.name]!,
      label: platform.label,
      kind: platform.name,
    }));
}
