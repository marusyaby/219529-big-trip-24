import dayjs from 'dayjs';

export const Format = {
  DATE: 'MMM[ ]DD',
  TIME: 'HH:mm',
  FULL_DATE: 'DD/MM/YY[ ]HH:mm'
};

export const capitalizeFirstLetter = (value) =>
  value.toString().charAt(0).toUpperCase() + value.slice(1);

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const getRandomElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];

export const formatDate = (date, format) =>
  dayjs(date).format(format);

export const getDuration = (dateFrom, dateTo) => {
  const duration = dayjs(dayjs(dateTo).diff(dateFrom));

  if (dayjs(duration).get('hours') < 1) {
    return duration.format('mm[M]');
  }

  if (dayjs(duration).get('hours') < 24) {
    return duration.format('HH[H] mm[M]');
  }

  return duration.format('DD[D] HH[H] mm[M]');
};
