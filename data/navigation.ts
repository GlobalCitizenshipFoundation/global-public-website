export interface NavItem {
  label: string;
  href: string;
  type?: 'link' | 'button';
}

export const navigation: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Governance', href: '/governance' },
  { label: 'Networks', href: '/networks' },
  { label: 'Initiatives', href: '/initiatives' },
  { label: 'Events', href: '/events' },
  { label: 'Publications', href: '/magazine' },
  { label: 'Get Involved', href: '/partners' },
  { label: 'Contact', href: '/contact', type: 'button' },
];
