import { paths } from '@/shared/config/paths';
import type { SocialLink } from '@/features/social/ui/getSocialMediaFromCMS';
import { getSocialLinksFromCMS } from '@/features/social/ui/getSocialMediaFromCMS';

type FooterLink = { label: string; href: string };

type FooterSection =
  | { kind: 'social'; name: 'Follow'; content: SocialLink[] }
  | { kind: 'links'; name: string; content: FooterLink[] };

// defaulty, CMS może nadpisać
const staticSocials = {
  instagram: 'https://www.instagram.com/',
  twitter: 'https://twitter.com/',
  linkedin: 'https://www.linkedin.com/',
  facebook: 'https://www.facebook.com/',
  youtube: 'https://www.youtube.com/',
} as const;

const socialLinks = getSocialLinksFromCMS(staticSocials);

export const footer: FooterSection[] = [
  {
    kind: 'links',
    name: 'Get Started',
    content: [
      { label: 'About Us', href: paths.about },
      { label: 'Secretariat', href: paths.secretariat },
      { label: 'Join Community', href: paths.community },
      { label: 'Education', href: paths.education },
      { label: 'Newsletter', href: paths.newsletter },
    ],
  },
  {
    kind: 'links',
    name: 'Resource',
    content: [
      { label: 'Help Center', href: paths.help },
      { label: 'System', href: paths.system },
      { label: 'Career', href: paths.career },
      { label: 'Proposal', href: paths.proposal },
      { label: 'Support Desk', href: paths.support },
      { label: 'Contact Us', href: paths.contact },
    ],
  },
  { kind: 'social', name: 'Follow', content: socialLinks },
];

export const subfooter = [
  { name: 'Impressum', href: paths.impressum },
  { name: 'Privacy Policy', href: paths.privacy },
  { name: 'Cookie', href: paths.cookie },
  { name: 'Policy', href: paths.policies },
  { name: 'Terms and Conditions', href: paths.terms },
] as const;
