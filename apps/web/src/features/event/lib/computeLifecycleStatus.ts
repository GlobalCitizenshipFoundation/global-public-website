import type { EventLifecycleStatus, EventSingleType } from "@gcf/types";

export function computeLifecycleStatus(
  event: Pick<EventSingleType, "startDateTime" | "endDateTime">,
): EventLifecycleStatus {
  const start = new Date(event.startDateTime).getTime();
  const end = new Date(event.endDateTime ?? event.startDateTime).getTime();
  const now = Date.now();

  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "started";
}
