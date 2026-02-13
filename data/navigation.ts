export interface NavItem {
  label: string;
  href: string;
  type?: 'link' | 'button';
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { 
    label: 'About Us', 
    href:'',
    dropdown: [
      { label: 'Education', href: '/education' },
    ]
  },
  { 
    label: 'Events', 
    href: '/events',
  },
  { 
    label: 'Publications', 
    href: '/magazine',
  },
  { label: 'Get Involved', href: '/partners' },
  { label: 'Contact', href: '/contact', type: 'button' },
];