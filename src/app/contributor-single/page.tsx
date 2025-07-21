import ContainerBig from '@/components/ContainerBig';
import { sanityClient } from '../../client';
import type { PortableTextBlock } from '@portabletext/types';
import { ppid } from 'process';
import { PortableText } from '@portabletext/react';

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
          title,
          slug,
          image {
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
              <button className='w-[183.5px] flex justify-center items-center bg-primary rounded-tl-[10px] rounded-bl-[10px]'>View all profiles</button>
              <button className='h-full bg-white flex justify-center items-center border-[1.5px] border-frames solid rounded-tr-[10px] rounded-br-[10px]'>Arrow here</button>
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
                contributorSingle.gender === 'male' ? (
                  <p className=''>He/Him</p>
                ) : contributorSingle.gender === 'female' ? (
                  <p>She/Her</p>
                ) : null
              )}
              {contributorSingle.name && <h3>{contributorSingle.name}</h3>}
              {contributorSingle.designation && <h4>{contributorSingle.designation}</h4>}
              {contributorSingle.organization && <h4>{contributorSingle.organization}</h4>}
              {contributorSingle.country && <p>{contributorSingle.country}</p>}
              <div className='flex flex-row'>
                {contributorSingle.emailId && contributorSingle.emailDisplay && (
                  <>
                    <div>icon</div>
                    <p>{contributorSingle.emailId}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </ContainerBig>
      </div>

      <div className='h-12 bg-primary'>
        <ContainerBig>
          {contributorSingle.featuredProfile && (
            <div className='flex h-12 items-center'>
              <p>icon</p>
              <p className=''>Featured profile</p>
            </div>
          )}
        </ContainerBig>
      </div>

      <ContainerBig>
        <p>Biography</p>
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
      <ContainerBig>
        {contributorSingle.events && contributorSingle.events.length > 0 && (
          <section className='mt-20'>
            <h2 className='text-3xl mb-4'>Related Events</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {contributorSingle.events.map(event => (
                <div key={event._id} className='border p-4 rounded-md'>
                  {event.image?.asset?.url && (
                    <img src={event.image.asset.url} alt={event.title} className='w-full h-40 object-cover mb-4' />
                  )}
                  <h3 className='text-xl font-semibold'>{event.title}</h3>
                  {/* Link to event page if needed */}
                </div>
              ))}
            </div>
          </section>
        )}
      </ContainerBig>
    </>
  );
};

export default ContributorSingle;
