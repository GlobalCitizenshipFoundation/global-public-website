export const EVENTS_LIST_QUERY = `
  *[_type == "eventSingle"] | order(startDateTime desc) {
    _id,
    slug,
    eventHeading,
    eventImage {
      asset->{
        url,
        metadata { dimensions }
      }
    },
    startDateTime
  }
`;

export const EVENT_BY_SLUG_QUERY = `
  *[_type == "eventSingle" && slug.current == $slug][0]{
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
      slug,
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
      slug,
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
    hostedBy[]->{
      _id,
      slug,
      title,
      logo { asset->{ url } }
    },
    eventPartners[]->{
      _id,
      slug,
      title,
      logo { asset->{ url } }
    },
    knowledgePartners[]->{
      _id,
      slug,
      title,
      logo { asset->{ url } }
    },
    speakersText
  }
`;
