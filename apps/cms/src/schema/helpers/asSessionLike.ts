import { isRecord } from "sanity";

type SessionLike = {
  startAt?: unknown;
  endAt?: unknown;
};

export function asSessionLike(x: unknown): SessionLike | null {
  return isRecord(x) ? (x as SessionLike) : null;
}
