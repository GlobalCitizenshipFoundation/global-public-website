import ContainerBig from '@/components/ContainerBig';
import { sanityClient } from '../../client';
import type { PortableTextBlock } from '@portabletext/types';
import { ppid } from 'process';
import { PortableText } from '@portabletext/react';
import { EventSingle } from '../event-single/page';
import Link from 'next/link';

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

  return (
    <>
      <ContainerBig>
        {contributorSingle.featuredProfile && (
          <>
            <div className='flex justify-between mb-5'>
            <h2 className="text-6xl">Featured Profile</h2>
            <div className='w-[253.5px] h-[59px] flex'>
              <button className='w-[183.5px] flex justify-center items-center bg-primary rounded-tl-[10px] rounded-bl-[10px] text-white text-xl'>View all profiles</button>
              <button className='h-full grow bg-white flex justify-center items-center border-[1.5px] border-frames solid rounded-tr-[10px] rounded-br-[10px]'><img src="/images/arrow.svg" alt="" className=''/></button>
            </div>
            </div>
            <p className='mb-24'>
              Transforming education for global citizenship and sustainable development. We work to wards transforming education for global citizenship and sustainable.
            </p>
          </>
        )}
      </ContainerBig>

      <div className='bg-background-darker p-24'>
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
                <div className='flex flex-row items-center'>
                  <div className='w-[52px] h-[52px] bg-white mr-3.5 flex items-center justify-center rounded-md'>mail</div>
                  <p className='text-xl font-medium text-titles'>{contributorSingle.emailId}</p>
                </div>
              )}
            </div>
          </div>
        </ContainerBig>
      </div>

      <div className='h-12 bg-primary mb-30'>
        <ContainerBig>
          {contributorSingle.featuredProfile && (
            <div className='flex h-12 items-center'>
              <img src="/images/check.svg" alt="" className='w-5 h-5 mr-5.5'/>
              <p className='text-white text-lg font-medium'>Featured profile</p>
            </div>
          )}
        </ContainerBig>
      </div>

      <ContainerBig>
        <p className='text-[42px] text-titles font-semibold font-poppins mb-3.5'>Biography</p>
        {contributorSingle.bio && <PortableText value={contributorSingle.bio}/>}
        <hr />
        <div className='flex justify-between'>
          <p>Sharing:</p>
          <div className='flex gap-2'>
            <p>icon</p>
            <p>icon</p>
          </div>
        </div>
        <hr />
      </ContainerBig>
      <div className='p-[154px] bg-[#C6E3DF]'>
        <ContainerBig>
          {contributorSingle.events && contributorSingle.events.length > 0 && (
            <section className='mt-20'>
              <h2 className='text-3xl mb-4'>Events By {contributorSingle.name}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {contributorSingle.events.map((event: EventSingle) => (
                  <div key={event._id} className='border p-4 rounded-md'>
                    {event && (
                      <img src={event.eventImage?.asset.url} alt={event.eventHeading} className='w-full h-40 object-cover mb-4' />
                    )}
                    <h3 className='text-xl font-semibold'>{event.eventHeading}</h3>
                    <Link href="/event-single" className='bg-emerald-600 p-2 rounded-lg'>
                      <button className='cursor-pointer text-white'>Go to contributor event single</button>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </ContainerBig>
      </div>
    </>
  );
};

export default ContributorSingle;
