export const EVENTS_LIST_BASE = `
{
  "total": count(*[
    _type == "eventSingle"
    && defined(slug.current)
    && ($q == "" || eventHeading match ("*" + $q + "*"))
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
    && ($q == "" || eventHeading match ("*" + $q + "*"))
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
    eventImage{ asset->{ url, metadata{ dimensions } } },
    startDateTime
  }
}
`;
