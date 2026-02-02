export function setSearchParams(
  current: URLSearchParams,
  patch: Record<string, string | number | null | undefined>
) {
  const next = new URLSearchParams(current);

  for (const [key, value] of Object.entries(patch)) {
    if (value === null || value === undefined || value === '') {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }
  }

  return next.toString();
}
