import React from 'react';
import { FaPrint } from 'react-icons/fa6';
import BreakLine from './BreakLine';
import SocialLink, { SocialLinkProps } from './Social/SocialLink';

interface types {
  socialLinks: SocialLinkProps[];
}

const Sharing: React.FC<types> = ({ socialLinks }) => {
  return (
    <>
      <BreakLine className="mt-7.5" />
      <section className="flex justify-between py-4.5">
        <p>Sharing:</p>
        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <SocialLink
              key={link.href}
              href={link.href}
              icon={typeof link.icon === 'function' ? React.createElement(link.icon) : link.icon}
              label={link.label}
              variant="inline"
            />
          ))}
          <SocialLink
            href={`www.wikipedia.com`}
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
