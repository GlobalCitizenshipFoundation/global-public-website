import { paths } from '@/shared/config/paths';

export type NavItem = {
  label: string;
  href: string;
  type?: 'link' | 'button';
};

export const header: NavItem[] = [
  { label: 'About Us', href: paths.about },
  { label: 'Governance', href: paths.governance },
  { label: 'Networks', href: paths.networks },
  { label: 'Initiatives', href: paths.initiatives },
  { label: 'Events', href: paths.events },
  { label: 'Publications', href: paths.magazine },
  { label: 'Get Involved', href: paths.partners },
  { label: 'Contact', href: paths.contact, type: 'button' },
];
