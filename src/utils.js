import dayjs from 'dayjs';
import {FilterType} from './view/filters-view.js';
import duration from 'dayjs/plugin/duration';
import {EnabledSortType, SortType} from './view/events-sort-view.js';
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
  if (dayjsDuration.as('hours') < 1) {
    return dayjsDuration.format(Format.DURATION.MINUTES);
  }
  if (dayjsDuration.as('days') < 1) {
    return dayjsDuration.format(Format.DURATION.HOURS);
  }
  if (dayjsDuration.as('months') > 1) {
    return `${Math.floor(dayjsDuration.asDays())}D ${dayjsDuration.format(Format.DURATION.HOURS)}`;
  }
  return dayjsDuration.format(Format.DURATION.DAYS);
};

const isFutureEvent = (event) => dayjs(event.dateFrom) > currentDate;
const isPastEvent = (event) => dayjs(event.dateTo) < currentDate;
const isPresentEvent = (event) => dayjs(event.dateTo) >= currentDate && dayjs(event.dateFrom) <= currentDate;

export const enableFilterType = {
  [FilterType.EVERYTHING]: (events) => events.length > 0,
  [FilterType.FUTURE]: (events) => events.some((event) => isFutureEvent(event)),
  [FilterType.PRESENT]: (events) => events.some((event) => isPresentEvent(event)),
  [FilterType.PAST]: (events) => events.some((event) => isPastEvent(event)),
};

export const filterEvents = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isPresentEvent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event)),
};

const compareByDateStart = (eventA, eventB) =>
  dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);
const compareByDuration = (pointA, pointB) => {
  const pointADuration = getDuration(pointA.dateFrom, pointA.dateTo);
  const pointBDuration = getDuration(pointB.dateFrom, pointB.dateTo);
  return pointBDuration.asMilliseconds() - pointADuration.asMilliseconds();
};
const compareByPrice = (eventA, eventB) =>
  eventB.basePrice - eventA.basePrice;

export const sortEvents = {
  [SortType.DAY]: (events) => events.toSorted(compareByDateStart),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is disabled`);
  },
  [SortType.TIME]: (events) => events.toSorted(compareByDuration),
  [SortType.PRICE]: (events) => events.toSorted(compareByPrice),
  [SortType.OFFER]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is disabled`);
  },
};

export const generateSortTypes = (defaultSortType) =>
  Object.entries(EnabledSortType).map(
    ([type, isClickable]) => ({
      type,
      isClickable,
      isActive: type === defaultSortType,
    }),
  );

export const generateFilterTypes = (events, activeFilterType) =>
  Object.entries(enableFilterType).map(
    ([type, checkFilterAvailability]) => ({
      type,
      isClickable: checkFilterAvailability(events),
      isActive: type === activeFilterType,
    }),
  );

export const updateItem = (updatedItem, items) =>
  items.map((item) => item.id === updatedItem.id ? updatedItem : item);
