export const eventTime = (data: string) => {
    const formatData = new Date(data)
    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'CET',
    });

    return timeFormatter.format(formatData);
}