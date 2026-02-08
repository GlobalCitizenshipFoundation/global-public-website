export const EVENT_BY_SLUG_QUERY = `
*[_type == "eventSingle" && slug.current == $slug][0]{
  _id,
  eventHeading,
  slug,

  pricing,
  price,

  attendanceMode,
  eventType,
  startDateTime,
  endDateTime,

  videoLink,
  venue,
  eventImage{ asset->{ url, metadata{ dimensions, lqip } } },

  marketingMention,
  introText,
  body,
  promoMessage,
  bodyHeading,

  introHeading,
  videoHeading,

  audience,
  topics,

  panelCtaUpcoming,
  panelCtaStarted,
  panelCtaEnded,

  agendaHeading,
  agendaDescription,
  agenda[]{
    _key,
    date,
    sessions[]{
      _key,
      type,
      "typeLabel": select(
        type == "panel_discussion" => "Panel Discussion",
        type == "learning_session" => "Learning Session",
        type
      ),
      title,
      startAt,
      endAt,
      description,
      moderators[]{
        _key,
        person->{
          _id, slug, name, designation, organization, country,
          photo{ asset->{ url, metadata{ dimensions, lqip } } }
        }
      },
      panelists[]{
        _key,
        person->{
          _id, slug, name, designation, organization, country,
          photo{ asset->{ url, metadata{ dimensions, lqip } } }
        }
      }
    }
  },

  partnersHeading,
  partnersText,
  partners[]{
    _key,
    type,
    "items": coalesce(items[]->{
      _id,
      slug,
      title,
      logo{ asset->{ url } }
    }, [])
  },

  speakersHeading,
  speakersText,
  "speakers": coalesce(speakers[]->{
    _id, slug, name, designation, organization, country,
    photo{ asset->{ url, metadata{ dimensions, lqip } } }
  }, []),

  steeringCommitteeHeading,
  steeringCommitteeText,
  "steeringCommittee": coalesce(steeringCommittee[]->{
    _id, slug, name, designation, organization, country,
    photo{ asset->{ url, metadata{ dimensions, lqip } } }
  }, []),

  buttonSecondary,
  buttonTertiary,

  registrationHeading,
  registrationText
}
`;
