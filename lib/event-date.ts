export const eventData = (data: string) => {
  const formatData = new Date(data);
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'CET',
  });

  return dateFormatter.format(formatData);
};
