import React from 'react';
import { PartnerSingleType } from '../../../utils/partners-singleTypes';
import ContainerBig from '@/components/ContainerBig';
import BreakLine from '@/components/BreakLine';
import ButtonRegular from '@/components/ButtonRegular';
import {
  ContributorSocials,
  getSocialLinksFromCMS,
} from '@/components/Social/getSocialMediaFromCMS';
import SocialLink from '@/components/Social/SocialLink';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Sharing from '@/components/Sharing';
import Newsettler from '@/components/Newsettler';

type Props = {
  partner: PartnerSingleType;
};

const PartnerSingleComponent: React.FC<Props> = ({ partner }) => {
  const socialLinks = getSocialLinksFromCMS(partner as unknown as ContributorSocials);

  return (
    <>
      {partner.headerImage && (
        <img
          className="mb-10.5 h-[480px] w-full object-cover"
          src={partner.headerImage.asset.url}
          alt="header-image"
        />
      )}
      <ContainerBig>
        <div className="mb-16 flex flex-row justify-between gap-x-[140px]">
          <div>
            {partner.country && (
              <p className="bg-background-panel text-gray mb-4.5 inline-block rounded-full px-[24px] py-[11px] text-lg font-medium">
                {partner.country}
              </p>
            )}
            {partner.title && (
              <h2 className="mb-11 text-6xl leading-[111%] font-semibold">{partner.title}</h2>
            )}
            {partner.shotrDescription && (
              <p className="text-2xl leading-[142%]">{partner.shotrDescription}</p>
            )}
          </div>
          <div className="mt-[-142px] w-[300px]">
            <div className="mb-[30px] flex h-[300px] w-[300px] items-center justify-center rounded-full bg-white p-5 shadow">
              {partner.logo && (
                <img
                  className="h-full w-full object-none"
                  src={partner.logo.asset.url}
                  alt={partner.title}
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              {partner.websiteUrl && (
                <ButtonRegular className="bg-primary-darker h-[38px] text-base font-normal text-white">
                  {partner.websiteText ? partner.websiteText : 'Visit Website'}
                </ButtonRegular>
              )}
              {socialLinks.length > 0 && (
                <div className="flex h-[44px] gap-[19px]">
                  {socialLinks.map((link) => (
                    <SocialLink
                      key={link.href}
                      href={link.href}
                      icon={<link.icon />}
                      bgColor="bg-background-panel"
                      variant="button"
                      className={`h-full w-full`}
                    />
                  ))}
                </div>
              )}
              <Link href={'/partners'}>
                <ButtonRegular className="border-dark-blue h-[38px] border-1 bg-transparent">
                  View All Partners
                </ButtonRegular>
              </Link>
            </div>
          </div>
        </div>
        <BreakLine className="mb-15" />
        <div className="mb-[70px]">{partner.body && <PortableText value={partner.body} />}</div>
        {partner.quote && <p className="mb-20">{partner.quote}</p>}
        <Sharing socialLinks={socialLinks} />

        <h2>OTHER PARTNERS SECTION</h2>
        <h2>PARTNER TYPE IDK</h2>
      </ContainerBig>
      <Newsettler />
    </>
  );
};

export default PartnerSingleComponent;
