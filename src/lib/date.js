const intlOptions = {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  literal: '-',
  year: 'numeric'
};

const isoDate = () => {
  const today = new Date();
  const options = {
    month: '2-digit',
    day: '2-digit',
  };

  const format = new Intl.DateTimeFormat('default', { ...intlOptions, ...options });
  const [{ value: month },,{ value: day },,{ value: year }] = format.formatToParts();

  return `${year}-${month}-${day}`;
}

const friendlyDate = (dateStr) => {
  const today = new Date(`${dateStr} 00:00`);
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', { ...intlOptions, ...options }).format(today);
}

export { friendlyDate, isoDate as default };
