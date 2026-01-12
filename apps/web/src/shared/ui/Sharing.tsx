import React from 'react';
import { FaPrint } from 'react-icons/fa6';
import BreakLine from '@/shared/ui/BreakLine';
import SocialLink, { type SocialLinkProps } from '@/features/social/ui/SocialLink';

type Props = {
  socialLinks: SocialLinkProps[];
  title?: string;
};

const Sharing: React.FC<Props> = ({ socialLinks, title = 'Sharing:' }) => {
  return (
    <>
      <BreakLine className="mt-7.5" />
      <section className="flex justify-between py-4.5">
        <p>{title}</p>

        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <SocialLink
              key={link.href}
              href={link.href}
              icon={typeof link.icon === 'function' ? React.createElement(link.icon) : link.icon}
              label={link.label ?? 'Share'} // <--- fallback, zero undefined
              variant="inline"
            />
          ))}

          <SocialLink
            href="https://www.wikipedia.com" // <--- uwaga: bez https będzie traktowane jak ścieżka /www.wikipedia.com
            icon={<FaPrint />}
            variant="inline"
            label="Print"
          />
        </div>
      </section>
      <BreakLine className="mb-30" />
    </>
  );
};

export default Sharing;
