import type { EventPartnerGroup, EventSingleType } from '@gcf/types';
import { uniqById } from './uniqById';

export function getPartnerGroups(event: EventSingleType): EventPartnerGroup[] {
  const groups = event.partners ?? [];
  return groups
    .filter((g): g is EventPartnerGroup => Boolean(g && g.type && Array.isArray(g.items)))
    .map((g) => ({ ...g, items: uniqById(g.items) }))
    .filter((g) => g.items.length > 0);
}
