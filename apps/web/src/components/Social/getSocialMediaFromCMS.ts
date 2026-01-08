import type { ComponentType, SVGProps } from 'react';
import { socialMediaConfig } from './socialMediaConfig';

export type ContributorSocials = Record<string, string | undefined>;

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type SocialLink = {
  href: string;
  label: string;
  icon: IconComponent;
};

export function getSocialLinksFromCMS(contributor: ContributorSocials): SocialLink[] {
  return socialMediaConfig
    .filter((platform) => Boolean(contributor[platform.name]))
    .map((platform) => ({
      href: contributor[platform.name]!,
      label: platform.label,
      icon: platform.icon as IconComponent,
    }));
}
