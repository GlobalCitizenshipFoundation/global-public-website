import React from 'react'
import { PartnerSingleType } from '../../../../utils/partners-singleTypes'
import ContainerBig from '@/components/ContainerBig';
import BreakLine from '@/components/BreakLine';
import ButtonRegular from '@/components/ButtonRegular';
import { ContributorSocials, getSocialLinksFromCMS } from '@/components/Social/getSocialMediaFromCMS';
import SocialLink from '@/components/Social/SocialLink';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import Sharing from '@/components/Sharing';
import Newsettler from '@/components/Newsettler';

type Props = {
    partner: PartnerSingleType;
}

const PartnerSingleComponent: React.FC<Props> = ({partner}) => {
     const socialLinks = getSocialLinksFromCMS(partner as unknown as ContributorSocials);

  return (
    <>
        {partner.headerImage && <img className='w-full h-[480px] object-cover mb-10.5' src={partner.headerImage.asset.url} alt="header-image" />}
        <ContainerBig>
            <div className='flex flex-row justify-between gap-x-[140px] mb-16'>
                <div>
                    {partner.country && <p className='px-[24px] py-[11px] inline-block rounded-full bg-background-panel text-lg font-medium text-gray mb-4.5'>{partner.country}</p>}
                    {partner.title && <h2 className='mb-11 leading-[111%] text-6xl font-semibold'>{partner.title}</h2>}
                    {partner.shotrDescription && <p className='text-2xl leading-[142%]'>{partner.shotrDescription}</p>}
                </div>
                <div className='w-[300px] mt-[-142px]'>
                    <div className='w-[300px] h-[300px] bg-white flex justify-center items-center rounded-full shadow p-5 mb-[30px]'>
                        {partner.logo && <img className='h-full w-full object-none' src={partner.logo.asset.url} alt={partner.title} />}
                    </div>
                    <div className='flex flex-col gap-4'>
                        {partner.websiteUrl && <ButtonRegular className='bg-primary-darker text-white text-base font-normal h-[38px]'>{partner.websiteText ? partner.websiteText : 'Visit Website'}</ButtonRegular>}
                        {socialLinks && 
                            <div className='flex gap-[19px] h-[44px]'>
                                {socialLinks.map((link) => (
                                    <SocialLink
                                        key={link.href}
                                        href={link.href}
                                        icon={<link.icon />}
                                        bgColor='bg-background-panel'
                                        variant="button"
                                        className={`w-full h-full`}
                                    />
                                ))}
                            </div>
                        }
                        <Link href={'/partners'}>
                            <ButtonRegular className='bg-transparent border-1 border-dark-blue h-[38px]'>View All Partners</ButtonRegular>
                        </Link>
                    </div>
                </div>
            </div>
            <BreakLine className='mb-15'/>
            <div className='mb-[70px]'>
                {partner.body && <PortableText value={partner.body}/>}
            </div>
            {partner.quote && <p className='mb-20'>{partner.quote}</p>}
            <Sharing socialLinks={socialLinks} />

            <h2>OTHER PARTNERS SECTION</h2>
            <h2>PARTNER TYPE IDK</h2>
        </ContainerBig>
        <Newsettler />
    </>
  )
}

export default PartnerSingleComponent

