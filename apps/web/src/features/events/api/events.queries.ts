export const EVENTS_LIST_QUERY = `
{
  "total": count(*[
    _type == "eventSingle"
    && defined(slug.current)
    && ($q == "" || eventHeading match $q)
    && ($type == "all" || eventType == $type)
    && (
      $tab == "all"
      || ($tab == "upcoming" && startDateTime > now())
      || ($tab == "past" && coalesce(endDateTime, startDateTime) < now())
    )
  ]),
  "items": *[
    _type == "eventSingle"
    && defined(slug.current)
    && ($q == "" || eventHeading match $q)
    && ($type == "all" || eventType == $type)
    && (
      $tab == "all"
      || ($tab == "upcoming" && startDateTime > now())
      || ($tab == "past" && coalesce(endDateTime, startDateTime) < now())
    )
  ]
  | order(
      select($sort == "title_asc" => eventHeading asc),
      select($sort == "date_asc" => startDateTime asc),
      startDateTime desc
    )
  [$start...$end]{
    _id,
    slug,
    eventHeading,
    eventType,
    eventImage {
      asset->{
        url,
        metadata { dimensions }
      }
    },
    startDateTime
  }
}
`;

export const EVENTS_LIST_BASE = `
{
  "total": count(*[
    _type == "eventSingle"
    && defined(slug.current)
    && ($q == "" || eventHeading match $q)
    && ($type == "all" || eventType == $type)
    && (
      $tab == "all"
      || ($tab == "upcoming" && startDateTime > now())
      || ($tab == "past" && coalesce(endDateTime, startDateTime) < now())
    )
  ]),
  "items": *[
    _type == "eventSingle"
    && defined(slug.current)
    && ($q == "" || eventHeading match $q)
    && ($type == "all" || eventType == $type)
    && (
      $tab == "all"
      || ($tab == "upcoming" && startDateTime > now())
      || ($tab == "past" && coalesce(endDateTime, startDateTime) < now())
    )
  ]
  | ORDER_CLAUSE
  [$start...$end]{
    _id,
    slug,
    eventHeading,
    eventType,
    eventImage { asset->{ url, metadata { dimensions } } },
    startDateTime
  }
}
`;

export const EVENT_BY_SLUG_QUERY = `
  *[_type == "eventSingle" && slug.current == $slug][0]{
    _id,
    eventHeading,
    slug,
    videoLink,
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
