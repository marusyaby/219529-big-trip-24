import dayjs from 'dayjs';
import {FilterType} from './view/trip-filters-view.js';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const Format = {
  DATE: 'MMM[ ]DD',
  TIME: 'HH:mm',
  FULL_DATE: 'DD/MM/YY[ ]HH:mm',
  DURATION: {
    MINUTES: 'mm[M]',
    HOURS: 'HH[H] mm[M]',
    DAYS: 'DD[D] HH[H] mm[M]',
  }
};

export const currentDate = dayjs();

export const capitalizeFirstLetter = (value) =>
  value.toString().charAt(0).toUpperCase() + value.slice(1);

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const getRandomElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];

export const formatDate = (date, format) =>
  dayjs(date).format(format);

export const getDuration = (dateFrom, dateTo) =>
  (dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))));

export const formatDuration = (dayjsDuration) => {
  if (dayjsDuration.get('hours') < 1) {
    return dayjsDuration.format(Format.DURATION.MINUTES);
  }
  if (dayjsDuration.get('hours') < 24) {
    return dayjsDuration.format(Format.DURATION.HOURS);
  }
  return dayjsDuration.format(Format.DURATION.DAYS);
};

const isFutureEvent = (event) => dayjs(event.dateFrom) > currentDate;
const isPastEvent = (event) => dayjs(event.dateTo) < currentDate;
const isPresentEvent = (event) => dayjs(event.dateTo) >= currentDate && dayjs(event.dateFrom) <= currentDate;

const isFiltered = {
  [FilterType.EVERYTHING]: (events) => events.length > 0,
  [FilterType.FUTURE]: (events) => events.some((event) => isFutureEvent(event)),
  [FilterType.PRESENT]: (events) => events.some((event) => isPresentEvent(event)),
  [FilterType.PAST]: (events) => events.some((event) => isPastEvent(event)),
};

const filteredEvents = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isPresentEvent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event)),
};

export const generateFilters = (events, activeFilterName) =>
  Object.entries(isFiltered).map(
    ([filterName, isFilterClickable]) => ({
      name: filterName,
      isClickable: isFilterClickable(events),
      isActive: filterName === activeFilterName,
      filteredEvents: filteredEvents[filterName](events),
    }),
  );

