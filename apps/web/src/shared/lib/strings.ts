function formatLabel(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (ch) => ch.toUpperCase());
}

export function formatLabels(tags: string[]): Record<string, string> {
  return tags.reduce<Record<string, string>>((acc, key) => {
    acc[key] = formatLabel(key);
    return acc;
  }, {});
}
