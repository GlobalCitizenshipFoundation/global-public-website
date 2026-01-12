import {
  FaXTwitter,
  FaInstagram,
  FaGlobe,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa6';

export const socialPlatforms = [
  { name: 'twitter', label: 'Twitter', icon: FaXTwitter, defaultUrl: 'https://twitter.com/' },
  {
    name: 'instagram',
    label: 'Instagram',
    icon: FaInstagram,
    defaultUrl: 'https://www.instagram.com/',
  },
  {
    name: 'facebook',
    label: 'Facebook',
    icon: FaFacebook,
    defaultUrl: 'https://www.facebook.com/',
  },
  {
    name: 'linkedin',
    label: 'LinkedIn',
    icon: FaLinkedin,
    defaultUrl: 'https://www.linkedin.com/',
  },
  { name: 'website', label: 'Website', icon: FaGlobe, defaultUrl: '' },
  { name: 'youtube', label: 'Youtube', icon: FaYoutube, defaultUrl: 'https://www.youtube.com/' },
] as const;

export type SocialName = (typeof socialPlatforms)[number]['name'];
