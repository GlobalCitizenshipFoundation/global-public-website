import { socialMediaConfig } from "./socialMediaConfig";

export type ContributorSocials = {
  [key: string]: string | undefined;
};

type SocialLink = {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
};

export function getSocialLinksFromCMS(contributor: ContributorSocials): SocialLink[] {
  return socialMediaConfig
    .filter((platform) => !!contributor[platform.name])
    .map((platform) => ({
      href: contributor[platform.name]!,
      label: platform.label,
      icon: platform.icon,
    }));
}
