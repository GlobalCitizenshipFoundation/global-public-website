import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { footer, subfooter } from '@/shared/config/footer';
import SocialLink from '@/features/social/ui/SocialLink';
import BreakLine from '@/shared/ui/BreakLine';
import Container from '@/shared/ui/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container as="footer" variant="footer" className="mt-12">
      <div className="flex flex-col lg:mb-12 lg:flex-row lg:flex-wrap lg:gap-x-30 lg:gap-y-10">
        {/* left column */}
        <div className="mb-7.5 flex min-w-0 flex-col gap-6 lg:mb-0 lg:gap-5">
          <Image
            width={180}
            height={100}
            src="/images/logo.png"
            alt="Global Citizenship Foundation logo"
          />

          <p
            className={[
              'font-inter text-borders w-full text-sm leading-[142%] font-medium',
              'lg:mb-10 lg:max-w-107.5 lg:min-w-62.5',
              'min-w-0 break-words hyphens-auto',
            ].join(' ')}
          >
            The Global Citizenship Foundation is a registered not-for-profit specialist organization
            that fosters active global citizenship and global citizenship education (GCED). The seat
            of the Global Citizenship Foundation is the National Capital Territory of Delhi, India.
          </p>

          <Image width={192} height={80} src="/images/UE.png" alt="Compliance badges" />
        </div>

        {/* link columns */}
        <div className="mb-13 flex flex-wrap gap-x-25 gap-y-11 lg:mb-0">
          {footer.map((item) => (
            <div key={item.name} className="min-w-0">
              <h3 className="font-inter text-gray mb-4 text-xl font-semibold text-nowrap">
                {item.name}
              </h3>

              <div className="font-inter flex min-w-0 flex-col gap-3.5 text-base font-normal">
                {item.kind === 'social'
                  ? item.content.map((link) => (
                      <SocialLink
                        key={link.href}
                        href={link.href}
                        kind={link.kind}
                        label={link.label}
                        variant="inline"
                      />
                    ))
                  : item.content.map((link) => (
                      <Link
                        href={link.href}
                        key={link.label}
                        className={[
                          'min-w-0 break-words hyphens-auto',
                          'text-borders transition-colors',
                          'hover:text-gray',
                          'underline decoration-transparent underline-offset-4 hover:decoration-current',
                        ].join(' ')}
                      >
                        {link.label}
                      </Link>
                    ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BreakLine className="mb-6.5" />

      <div className="mb-5.5 flex flex-col gap-x-2 gap-y-5 text-center lg:flex-row lg:justify-between">
        <p className="font-inter text-borders text-sm font-normal">
          Copyright {currentYear} © Global Citizenship Foundation
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {subfooter.map((data) => (
            <Link
              href={data.href}
              key={data.name}
              className={[
                'font-inter min-w-0 text-sm font-normal break-words',
                'text-borders transition-colors',
                'hover:text-gray',
                'underline decoration-transparent underline-offset-4 hover:decoration-current',
              ].join(' ')}
            >
              {data.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Footer;
