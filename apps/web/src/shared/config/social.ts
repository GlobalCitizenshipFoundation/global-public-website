export const socialPlatforms = [
  { name: 'twitter', label: 'Twitter', defaultUrl: 'https://twitter.com/' },
  { name: 'instagram', label: 'Instagram', defaultUrl: 'https://www.instagram.com/' },
  { name: 'facebook', label: 'Facebook', defaultUrl: 'https://www.facebook.com/' },
  { name: 'linkedin', label: 'LinkedIn', defaultUrl: 'https://www.linkedin.com/' },
  { name: 'website', label: 'Website', defaultUrl: '' },
  { name: 'youtube', label: 'Youtube', defaultUrl: 'https://www.youtube.com/' },
  { name: 'email', label: 'Email', defaultUrl: '' },
] as const;

export type SocialName = (typeof socialPlatforms)[number]['name'];
