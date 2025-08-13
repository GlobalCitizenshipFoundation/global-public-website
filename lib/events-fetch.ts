import { sanityClient } from "@/client";
import { EventSingleType, RelatedEventProps } from "../utils/event-singleTypes";

export const getEvents = async (): Promise<RelatedEventProps[]> => {
  return await sanityClient.fetch(`
    *[_type == "eventSingle"]{
      _id,
      slug,
      eventHeading,
      eventImage {
        asset->{
          url,
          metadata { dimensions }
        }
      },
      startDateTime,
    }
  `);
};

export const getEventBySlug = async (slug: string): Promise<EventSingleType | null> => {
  return await sanityClient.fetch(
    `*[_type == "eventSingle" && slug.current == $slug][0]{
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
        _id,
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
      steeringCommittee[]->{
        _id,
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
      partners[]->{
        _id,
        slug,
        title,
        logo {
          asset->{
            url,
          }
        }
      },
      speakersText
    }`,
    { slug }
  );
};
