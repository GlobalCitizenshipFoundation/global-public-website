import { isRecord } from "./isRecord";

type VenueLocationLike = { address?: unknown };

export function asVenueLocationLike(x: unknown): VenueLocationLike | null {
  return isRecord(x) ? (x as VenueLocationLike) : null;
}
