import React from 'react';
import Image from 'next/image';

import SocialLink from '@/features/social/ui/SocialLink';
import { getSocialLinksFromCMS } from '@/features/social/ui/getSocialMediaFromCMS';

type Props = {
  socialLinks: ReturnType<typeof getSocialLinksFromCMS>;
  variant: 'mobile' | 'desktop';
};

export default function ShareSection({ socialLinks, variant }: Props) {
  const isDesktop = variant === 'desktop';

  return (
    <div className={isDesktop ? 'flex flex-col gap-7 px-9' : 'flex flex-col gap-7'}>
      <h3 className="font-semibold lg:text-3xl">Share the Event</h3>

      <div className="flex w-full justify-between">
        {socialLinks?.map((link) => (
          <SocialLink
            key={link.href}
            href={link.href}
            kind={link.kind}
            label={link.label}
            variant="button"
          />
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <Image src="/images/print.svg" alt="Print" width={24} height={24} />
        <span className="text-borders text-lg font-normal">Print Event Details</span>
      </div>
    </div>
  );
}
