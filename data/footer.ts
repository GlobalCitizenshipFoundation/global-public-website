import { getSocialLinksFromCMS } from '@/components/Social/getSocialMediaFromCMS';

type FooterLink = { label: string; href: string };
type SocialFooterLink = { label: string; href: string; icon: React.ComponentType<any> };

type FooterSection =
  | { kind: 'social'; name: 'Follow'; content: SocialFooterLink[] }
  | { kind: 'links'; name: string; content: FooterLink[] };

const staticSocials = {
  instagram: 'https://www.instagram.com/',
  twitter: 'https://twitter.com/',
  linkedin: 'https://www.linkedin.com/',
  facebook: 'https://www.facebook.com/',
  youtube: 'https://www.youtube.com/',
};

const socialLinks = getSocialLinksFromCMS(staticSocials);

export const footer: FooterSection[] = [
  {
    kind: 'links',
    name: 'Get Started',
    content: [
      { label: 'About Us', href: '/about' },
      { label: 'Secretariat', href: '/secretariat' },
      { label: 'Join Community', href: '/community' },
      { label: 'Education', href: '/education' },
      { label: 'Newsettler', href: '/newsettler' },
    ],
  },
  {
    kind: 'links',
    name: 'Recource',
    content: [
      { label: 'Help Center', href: '/help' },
      { label: 'System', href: '/system' },
      { label: 'Career', href: '/career' },
      { label: 'Proposal', href: '/proposal' },
      { label: 'Support Desk', href: '/support' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    kind: 'social',
    name: 'Follow',
    content: socialLinks,
  },
];

export const subfooter = [
  {
    name: 'Impressum',
    href: '/impressum',
  },
  {
    name: 'Privacy Policy',
    href: '/privacy',
  },
  {
    name: 'Cookie',
    href: '/cookie',
  },
  {
    name: 'Policy',
    href: '/policy',
  },
  {
    name: 'Terms and Conditions',
    href: '/terms',
  },
];
