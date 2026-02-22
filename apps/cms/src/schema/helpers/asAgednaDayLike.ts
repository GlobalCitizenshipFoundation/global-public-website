import { isRecord } from "./isRecord";

type AgendaDayLike = {
  date?: unknown;
  sessions?: unknown;
};

export function asAgendaDayLike(x: unknown): AgendaDayLike | null {
  return isRecord(x) ? (x as AgendaDayLike) : null;
}
