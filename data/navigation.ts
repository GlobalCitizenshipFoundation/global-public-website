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
  { label: 'Publications', href: '/publications' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact', type: 'button' },
];
