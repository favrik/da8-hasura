const isoDate = () => {
  const today = new Date();

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    literal: '-'
  };

  const format = new Intl.DateTimeFormat('en-US', options);
  const [{ value: month },,{ value: day },,{ value: year }] = format.formatToParts();

  return `${year}-${month}-${day}`;
}

export default isoDate;
