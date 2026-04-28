import type { EventCard, MagazinSingleType } from "@gcf/types";
import { getEvents } from "@/features/events/api/getEvents";
import { getMagazine } from "@/features/magazine/api/getMagazine";

type HomePageData = {
  featuredEvents: EventCard[];
  magazines: MagazinSingleType[];
};

const HOME_EVENTS_LIMIT = 6;
const HOME_MAGAZINES_LIMIT = 6;

function mergeUniqueEvents(primary: EventCard[], fallback: EventCard[]) {
  const seen = new Set<string>();

  return [...primary, ...fallback]
    .filter((event) => {
      if (!event?._id || seen.has(event._id)) return false;

      seen.add(event._id);
      return true;
    })
    .slice(0, HOME_EVENTS_LIMIT);
}

/**
 * Aggreguje dane potrzebne na stronie głównej.
 *
 * To jest etap 1 integracji Home z Sanity: sekcje nadal mają hardcoded copy,
 * ale slidery nie jadą już na fake data.
 *
 * Logika eventów:
 * - najpierw pokazujemy upcoming,
 * - jeśli upcoming jest za mało, dokładamy najnowsze eventy z całego datasetu,
 * - duplikaty usuwamy po `_id`.
 */
export async function getHomePageData(): Promise<HomePageData> {
  const [upcomingEvents, latestEvents, magazines] = await Promise.all([
    getEvents({ tab: "upcoming", sort: "date_asc", perPage: HOME_EVENTS_LIMIT }),
    getEvents({ tab: "all", sort: "date_desc", perPage: HOME_EVENTS_LIMIT }),
    getMagazine(),
  ]);

  return {
    featuredEvents: mergeUniqueEvents(upcomingEvents.items, latestEvents.items),
    magazines: magazines.slice(0, HOME_MAGAZINES_LIMIT),
  };
}
