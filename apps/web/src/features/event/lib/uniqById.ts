export function uniqById<T extends { _id: string }>(items?: T[] | null) {
  const safe = items ?? [];
  return Array.from(new Map(safe.map((x) => [x._id, x])).values());
}
