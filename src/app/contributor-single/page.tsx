import ContainerBig from '@/components/ContainerBig';
import { sanityClient } from '../../client';
import type { PortableTextBlock } from '@portabletext/types';
import { ppid } from 'process';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import ButtonPrimary from '@/components/ButtonPrimary';
import { getSocialLinksFromCMS } from '@/components/Social/getSocialMediaFromCMS';
import SocialLink from '@/components/Social/SocialLink';
import { FaPrint, FaRegEnvelope } from 'react-icons/fa6';
import BreakLine from '@/components/BreakLine';
import RelatedEvents from '@/components/Events/RelatedEvent';
import { EventSingle } from '../event-single/page';
import Newsettler from '@/components/Newsettler';

export interface ContributorSingle {
  _id: string
  title?: string
  name?: string
  slug?: {
    current: string
  }
  photo?: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
          aspectRatio: number
        }
        lqip?: string
      }
    }
  }
  gender?: 'male' | 'female'
  designation?: string
  organization?: string
  country?: string
  emailId?: string
  emailDisplay?: boolean
  orcidId?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  facebook?: string
  website?: string
  featuredProfile?: boolean
  shortBio?: string
  bio?: PortableTextBlock
  relatedProfiles?: Array<{
    _id: string
    name: string
    title?: string
    slug?: {
      current: string
    }
  }>
  articleDisplay?: boolean
  eventsDisplay?: boolean
  event?: {
    _id: string
    title?: string
    slug?: {
      current: string
    }
  }
  header?: string
  profileColour?: string
  textColour?: string
}


const ContributorSingle = async () => {
  const contributorSingle = await sanityClient.fetch(
    `*[_type == "contributorSingle"][0]{
        _id,
        title,
        name,
        slug,
        photo {
        asset->{
            url,
            metadata { dimensions, lqip }
        }
        },
        gender,
        designation,
        organization,
        country,
        emailId,
        emailDisplay,
        orcidId,
        twitter,
        linkedin,
        instagram,
        facebook,
        website,
        featuredProfile,
        shortBio,
        bio,
        relatedProfiles[]->{
        _id,
        name,
        title,
        slug
        },
        articleDisplay,
        eventsDisplay,
        event->{
          _id,
          title,
          slug
        },
        "events": *[_type == "eventSingle" && references(^._id)]{
          _id,
          eventHeading,
          slug,
          startDateTime,
          eventImage {
            asset->{
              url
            }
          }
        },
        header,
        profileColour,
        textColour
    }`
    );


  if (!contributorSingle) {
    return <p>No contributor found.</p>;
  }

  const socialLinks = getSocialLinksFromCMS(contributorSingle);

  return (
    <>
      <ContainerBig className='mt-25'>
        {contributorSingle.featuredProfile && (
          <>
            <div className='flex justify-between mb-5'>
            <h2 className="text-6xl">Featured Profile</h2>
            <ButtonPrimary href='/' width={253.5}>
              View all profiles
            </ButtonPrimary>
            </div>
            <p className='mb-24'>
              Transforming education for global citizenship and sustainable development. We work to wards transforming education for global citizenship and sustainable.
            </p>
          </>
        )}
      </ContainerBig>

      <section className='bg-background-darker p-24'>
        <ContainerBig>
          <div className='flex gap-x-16 items-center'>
            {contributorSingle.photo.asset.url && (
              <div className='w-[490px] h-[490px]'>
                <img src={contributorSingle.photo.asset.url} alt="" className='w-full h-full object-contain'/>
              </div>
            )}
            <div className='flex flex-col h-auto'>
              {contributorSingle.gender && (
                <p className='text-xl text-titles font-semibold mb-5'>
                  {contributorSingle.gender === 'male'
                    ? 'He/Him'
                    : contributorSingle.gender === 'female'
                    ? 'She/Her'
                    : ''}
                </p>
              )}
              {contributorSingle.name && <h2 className='text-[40px] text-titles font-bold mb-1'>{contributorSingle.name}</h2>}
              {contributorSingle.designation && <h3 className='text-[26px] text-titles font-semibold mb-6.5'>{contributorSingle.designation}</h3>}
              {contributorSingle.organization && <h3 className='text-[26px] text-primary font-medium mb-2'>{contributorSingle.organization}</h3>}
              {contributorSingle.country && <h3 className='text-xl text-titles font-medium mb-7'>{contributorSingle.country}</h3>}
              {contributorSingle.emailId && contributorSingle.emailDisplay && (
                <div className='flex flex-row items-center mb-4'>
                  <SocialLink
                    href={`mailto:${contributorSingle.emailId}`}
                    icon={<FaRegEnvelope />}
                    variant="button"
                    hoverColor="bg-primary"
                    className='mr-3.5'
                  />
                  <p className='text-xl font-medium text-titles'>{contributorSingle.emailId}</p>
                </div>
              )}
              <div className='flex flex-row'>
                <div className='flex gap-4 mr-31.5'>
                  {socialLinks && socialLinks.map((link) => (
                    <SocialLink
                      key={link.href}
                      href={link.href}
                      icon={<link.icon />}
                      variant="button"
                    />
                  ))}
                </div>
                <div className='flex flex-row items-center'>
                  <SocialLink
                    href={`www.wikipedia.com`}
                    icon={<FaPrint />}
                    variant="button"
                    className='mr-3.5'
                  />
                  <span className='font-inter font-normal text-[16px] text-borders'>Print</span>
                </div>
              </div>
            </div>
          </div>
        </ContainerBig>
      </section>

      <section className='h-12 bg-primary mb-30'>
        <ContainerBig>
          {contributorSingle.featuredProfile && (
            <div className='flex h-12 items-center'>
              <img src="/images/check.svg" alt="" className='w-5 h-5 mr-5.5'/>
              <p className='text-white text-lg font-medium'>Featured profile</p>
            </div>
          )}
        </ContainerBig>
      </section>

      <ContainerBig>
        <p className='text-[42px] text-titles font-semibold font-poppins mb-3.5'>Biography</p>
        {contributorSingle.bio && <PortableText value={contributorSingle.bio}/>}
        <BreakLine className='mt-7.5'/>
        <section className='flex justify-between py-4.5'>
          <p>Sharing:</p>
          <div className='flex gap-8'>
            {socialLinks.map((link) => (
              <SocialLink
                key={link.href}
                href={link.href}
                icon={<link.icon />}
                label={link.label}
                variant="inline"
              />
            ))}
              <SocialLink
              href={`www.wikipedia.com`}
              icon={<FaPrint />}
              variant="inline"
              label='Print'
            />
          </div>
        </section>
        <BreakLine className='mb-30'/>
      </ContainerBig>
      <section className='py-[154px] bg-[#C6E3DF]'>
        <ContainerBig>
          {contributorSingle.events && contributorSingle.events.length > 0 && (
            <>
              <h2 className='text-[42px] mb-3.5'>Events By {contributorSingle.name}</h2>
              <p className='mb-15'>Transforming education for global citizenship and sustainable The Global Citizen ship Foundation continues commitment Preparing young people for a smart future.</p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {contributorSingle.events.map((event: EventSingle) => (
                <RelatedEvents event={event} key={event._id}/>
              ))}
              </div>
            </>
          )}
        </ContainerBig>
      </section>
      <Newsettler />
    </>
  );
};

export default ContributorSingle;
