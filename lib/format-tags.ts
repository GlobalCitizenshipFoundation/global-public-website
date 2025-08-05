export const formatLabels = (tags: string[]): Record<string, string> => {
  return tags.reduce((acc, key) => {
    const formatted = key
      .replace(/([A-Z])/g, ' $1') 
      .replace(/^./, str => str.toUpperCase());

    acc[key] = formatted;
    return acc;
  }, {} as Record<string, string>);
}
