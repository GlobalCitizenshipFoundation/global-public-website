import { socialPlatforms } from "@/shared/config/social";

export type SocialKind = (typeof socialPlatforms)[number]["name"];

export type ContributorSocials = Partial<Record<SocialKind, string>>;

export type SocialLinkData = {
  href: string;
  label: string;
  kind: SocialKind;
};

export function getSocialLinksFromCMS(contributor: ContributorSocials): SocialLinkData[] {
  return socialPlatforms.flatMap((platform) => {
    const href = contributor[platform.name];
    if (!href) return [];
    return [
      {
        href,
        label: platform.label,
        kind: platform.name,
      },
    ];
  });
}
