import { sanityClient } from '../../client';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Container from '@/components/ContainerRegular';
import ButtonRegular from '@/components/ButtonRegular';
import EventData from './components/EventData/EventData';

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
}

const EventSingle = async () => {
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
      addToCalendarUrl
    }`
  );

  if (!eventSingle) {
    return <p>No posts found.</p>;
  }

  return (
    <div className='flex flex-col bg-background-primary'>
      {eventSingle.eventImage?.asset && (
        <div className='flex w-full items-center'>
          <img className='flex w-full' src={eventSingle.eventImage.asset.url} alt="Event-image" />
        </div>
      )}
      {eventSingle.eventHeading && <h1>{eventSingle.eventHeading}</h1>}
      <Container>
          {eventSingle.introText && (
            <PortableText value={eventSingle.introText} />
          )}
      </Container>
      <Container className='mb-11'>
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
            components={{
              block: {
                normal: ({ children }) => <p className="mb-0">{children}</p>,
              },
            }}
          />
         )}
        </div>
      </Container>
      <Container >
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
      </Container>
      <div className='flex flex-col gap-[15px]'>
        <span className='text-subtitles font-semibold text-2xl pl-[50px]'>Intro Video</span>
        <div className='flex w-full '></div>
      </div>
    </div>
  );
};

export default EventSingle;
