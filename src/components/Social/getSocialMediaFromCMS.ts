import { socialMediaConfig } from "./socialMediaConfig";

export function getSocialLinksFromCMS(contributor: any) {
  return socialMediaConfig
    .filter((platform) => !!contributor[platform.name])
    .map((platform) => ({
      href: contributor[platform.name],
      label: platform.label,
      icon: platform.icon,
    }));
}
