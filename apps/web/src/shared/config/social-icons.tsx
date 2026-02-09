// shared/config/social-icons.tsx
"use client";

import {
  FaXTwitter,
  FaInstagram,
  FaGlobe,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaRegEnvelope,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { SocialName } from "./social";

export const socialIcons: Record<SocialName, IconType> = {
  twitter: FaXTwitter,
  instagram: FaInstagram,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  website: FaGlobe,
  youtube: FaYoutube,
  email: FaRegEnvelope,
};
