import { sanityClient } from '../../client';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

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

  console.log(eventSingle.eventImage?.asset.url)

  return (
    <div className='flex flex-col bg-background-primary'>
      {eventSingle.eventImage?.asset && (
        <div className='flex w-full items-center'>
          <img className='flex w-full' src={eventSingle.eventImage.asset.url} alt="Event-image" />
        </div>
      )}
      {eventSingle.eventHeading && <h1>{eventSingle.eventHeading}</h1>}
      {/* {eventSingle.agendaDescription && <PortableText value={eventSingle.introText} />} */}
      <div className='flex flex-col w-full bg-background-panel px-7 pt-7 pb-6 rounded-xl'>
        <h4 className='text-primary-darker mb-3.5'>Panel Discussion</h4>
        <h2 className='text-3xl'>Celebrating Gender Inclusive Learning Spaces: Unpacking the Secrets to Gender-Inclusive Learning Spaces</h2>
      </div>
    </div>
  );
};

export default EventSingle;
