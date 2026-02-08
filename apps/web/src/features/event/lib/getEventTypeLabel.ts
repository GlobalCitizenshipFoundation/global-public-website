import type { EventSingleType } from '@gcf/types';

export function getEventTypeLabel(eventType?: EventSingleType['eventType']) {
  switch (eventType) {
    case 'conference':
      return 'Conference';
    case 'consultation':
      return 'Consultation';
    case 'panel_discussion':
      return 'Panel Discussion';
    case 'forum':
      return 'Forum';
    default:
      return 'Event';
  }
}
