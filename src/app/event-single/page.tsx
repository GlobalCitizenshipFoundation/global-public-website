import { sanityClient } from '../../client';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import ButtonRegular from '@/components/ButtonRegular';
import EventData from './components/EventData/EventData';
import ContainerRegular from '@/components/ContainerRegular';
import { ContributorSingle } from '../contributor-single/page';

interface ImageDimensions {
  _type: 'sanity.imageDimensions';
  aspectRatio: number;
  width: number;
  height: number;
}

interface SanityImageAsset {
  url: string;
  metadata: {
    dimensions: ImageDimensions;
    lqip: string;
  };
}

interface SanityImage {
  asset: SanityImageAsset;
}

interface SimpleSpeaker {
  name: string;
  title?: string;
  organization?: string;
  photo?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
          aspectRatio: number;
        };
        lqip?: string;
      };
    };
  };
}

interface EventSingle {
  _id: string;
  eventHeading?: string;
  slug?: {
    _type: 'slug';
    current: string;
  };
  eventImage?: SanityImage;
  pricing?: string;
  status?: string;
  attedanceMode?: string;
  startDateTime?: string;
  endDateTime?: string;
  marketingMention?: PortableTextBlock[];
  price?: number;
  registrationDeadline?: string;
  seatingCapacity?: number;
  currentRegistrations?: number;
  registrationStatus?: string;
  financialAid?: PortableTextBlock[];
  buttonPrimary?: string;
  introText?: PortableTextBlock[];
  body?: PortableTextBlock[];
  venue?: string;
  promoMessage?: PortableTextBlock[];
  buttonSecondary?: string;
  buttonTertiary?: string;
  audience?: string[];
  agendaHeading?: string;
  agendaDescription?: PortableTextBlock[];
  endText?: PortableTextBlock[];
  addToCalendarUrl?: string;
  speakers: SimpleSpeaker[];
  speakersText: PortableTextBlock[];
}

const EventSingle = async () => {
  const audienceLabels = {
    educators: 'Educators',
    educationLeaders: 'Education Leaders',
    youth: 'Youth',
    institutions: 'Institutions',
  };

  const eventSingle: EventSingle = await sanityClient.fetch(
    `*[_type == "eventSingle"][0]{
      _id,
      eventHeading,
      slug,
      eventImage{
        asset->{
          url,
          metadata { dimensions, lqip }
        }
      },
      pricing,
      status,
      attedanceMode,
      startDateTime,
      endDateTime,
      marketingMention,
      price,
      registrationDeadline,
      seatingCapacity,
      currentRegistrations,
      registrationStatus,
      financialAid,
      buttonPrimary,
      introText,
      body,
      venue,
      promoMessage,
      buttonSecondary,
      buttonTertiary,
      audience,
      agendaHeading,
      agendaDescription,
      endText,
      addToCalendarUrl,
      speakers[]->{
        name,
        designation,
        organization,
        photo{
          asset->{
            url,
            metadata { dimensions, lqip }
          }
        }
      },
      speakersText
    }`
  );

  const firstSpeaker = eventSingle.speakers[0];

  const cloneSpeakers = Array(8).fill(firstSpeaker);

  const speakers = cloneSpeakers.map(speaker => ({
    imageURL: speaker.photo?.asset?.url ?? '',
    name: speaker.name ?? '',
    position: speaker.designation ?? '',
    organization: speaker.organization ?? '',
  }));

  if (!eventSingle) {
    return <p>No posts found.</p>;
  }

  console.log(eventSingle.speakersText)

  return (
    <div className='flex flex-col bg-background-primary'>
      <div className='w-full max-w-[1610px] mx-auto px-4'>
        <div
          className="
            grid
            gap-y-14
            grid-cols-[1050px_500px]
            gap-[60px]
          "
        >
          <div className="order-1 2xl-custom:order-1">
            {eventSingle.eventImage?.asset && (
              <div className='flex w-full items-center mb-10'>
                <img className='flex w-full' src={eventSingle.eventImage.asset.url} alt="Event-image" />
              </div>
            )}
            <ContainerRegular className='text-sm mb-9'>
                {eventSingle.introText && (
                  <PortableText value={eventSingle.introText} />
                )}
            </ContainerRegular>
            <div className='flex flex-col gap-[15px] mb-11'>
              <span className='lg:pl-0 text-subtitles font-semibold text-2xl pl-[50px]'>Intro Video</span>
              <div className='flex w-full '></div>
            </div>
            <ContainerRegular className='text-2xl mb-11'>
              {eventSingle.body && (
                <PortableText value={eventSingle.body}/>
              )}
            </ContainerRegular>
            <ContainerRegular className='flex flex-col gap-6 mb-11'>
              <h2 className='text-2xl text-titles'>Who is this event for :</h2>
              <div className='flex flex-wrap gap-2.5'>
                {eventSingle.audience?.map((element, index) => (
                  <div key={index + element} className='flex justify-center items-center py-2.5 px-4 border-1 rounded-4xl border-secondary-borders'>
                    <span>{audienceLabels[element] ?? element}</span>
                  </div>
                ))}
              </div>
            </ContainerRegular>
            <ContainerRegular className='flex flex-col gap-1.5 mb-14'>
              <h2 className='text-2xl text-titles'>{eventSingle.agendaHeading}</h2>
              <PortableText value={eventSingle.agendaDescription}/>
            </ContainerRegular>
            <ContainerRegular className='flex flex-col'>
              <h2 className='text-2xl text-titles mb-1.5'>Speakers</h2>
              <div className='mb-10'>
                <PortableText value={eventSingle.agendaDescription}/>
              </div>
              <div className='lg:grid-cols-4 grid grid-cols-2 gap-x-3.5 gap-y-8'>
                {speakers.map((speaker, index) => (
                  <div key={index + speaker.name} className='flex flex-col'>
                    <img className='flex rounded-lg w-full mb-5' src={speaker.imageURL} alt={`Image-speaker--${index}`} />
                    <h3 className='mb-2'>{speaker.name}</h3>
                    <span className='font-normal text-lg text-primary mb-2.5'>{speaker.position}</span>
                    <span>Organization
                      <br />
                      {speaker.organization}
                    </span>
                  </div>
                ))}
              </div>
            </ContainerRegular>
          </div>
          <div className='order-2 2xl-custom:order-2'>
            <ContainerRegular className='mb-11'>
              <div 
                className='flex flex-col w-full bg-background-panel px-7 pt-7 pb-6 rounded-xl border-white border-5.5 border-b-5 border-dashed' 
              >
                <h4 className='text-primary-darker mb-3.5'>Panel Discussion</h4>
                <h2 className='text-3xl mb-8'>Celebrating Gender Inclusive Learning Spaces: Unpacking the Secrets to Gender-Inclusive Learning Spaces</h2>
                <div className='flex gap-1.5 uppercase text-gray-600 text-base font-semibold mb-6'>
                  <span>{eventSingle.pricing === 'free' 
                    ? eventSingle.pricing 
                    : `${eventSingle.price?.amount}${eventSingle.price?.currency}`}</span>
                  <span>{eventSingle.attedanceMode}</span>
                  <span>Event</span>
                </div>
                <div className='flex flex-col gap-4 mb-11'>
                  <span className='uppercase text-light-gray font-medium text-sm'>Start TIME</span>
                  <EventData data={eventSingle.startDateTime} />
                </div>
                <div className='flex flex-col gap-4 mb-11'>
                  <span className='uppercase text-light-gray font-medium text-sm'>End TIME</span>
                  <EventData data={eventSingle.endDateTime} />
                </div>
                <div className='flex flex-col gap-4'>
                  <span className='uppercase text-light-gray font-medium text-sm'>THIS EVENT HAS</span>
                  <span className='uppercase text-primary-darker font-semibold text-3xl'>{eventSingle.status}</span>
                </div>
              </div>
              <div className='flex flex-col px-7 pt-10 pb-6 bg-background-panel rounded-xl'>
               {eventSingle.marketingMention && (
                <div className='mb-4'>
                  <PortableText value={eventSingle.marketingMention} />
                </div>
               )}
               <ButtonRegular className='mb-4'>
                  <span className='text-white text-base font-medium '>Watch replay</span>
               </ButtonRegular>
               {eventSingle.financialAid && (
                <PortableText 
                  value={eventSingle.financialAid} 
                />
               )}
              </div>
            </ContainerRegular>
            <ContainerRegular >
              <div className='flex flex-col gap-1.5 w-full mb-9'>
                <span className='text-subtitles font-semibold text-2xl'>Venue Location</span>
                <span className='text-borders font-normal text-sm'>{eventSingle.venue}</span>
              </div>
              <div className='flex flex-col gap-1.5 w-full mb-9'>
                <span className='text-subtitles font-semibold text-2xl'>Rich Text Box</span>
                <span className='text-borders font-normal text-sm'>{eventSingle.venue}</span>
              </div>
              <ButtonRegular className='mb-4 bg-white border-borders border-1'>
                <span className='text-gray text-base font-medium '>Concept Note</span>
              </ButtonRegular>
              <ButtonRegular className='mb-14'>
                <span className='text-white text-base font-medium '>Resources</span>
              </ButtonRegular>
              <div className='flex flex-col gap-7'>
               <h3 className='text-3xl'>Share the Event</h3>
               <div className='flex w-full justify-between'>
                <img src="" alt="" />
               </div>
              </div>
            </ContainerRegular>
          </div>
 
        </div>
      </div>

 
    </div>
  );
};

export default EventSingle;
