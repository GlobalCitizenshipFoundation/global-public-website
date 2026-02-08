import type { EventLifecycleStatus } from '@gcf/types';

export function getLifecycleStatus(
  startDateTime: string,
  endDateTime?: string
): EventLifecycleStatus {
  const now = Date.now();
  const start = new Date(startDateTime).getTime();
  const end = endDateTime ? new Date(endDateTime).getTime() : null;

  if (Number.isNaN(start)) return 'upcoming';

  if (now < start) return 'upcoming';

  // jeśli nie ma endDateTime, traktuj jako "started" po starcie
  if (!end || Number.isNaN(end)) return 'started';

  if (now >= start && now < end) return 'started';

  return 'ended';
}
