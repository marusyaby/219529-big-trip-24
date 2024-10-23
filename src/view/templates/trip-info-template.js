import {Format, formatDate, getUniqueElements} from '../../utils.js';
import dayjs from 'dayjs';

const getDestinationsDivider = (tripDestinations) => {
  if (tripDestinations.length > 3) {
    return '&mdash; ... &mdash;';
  }
  if (tripDestinations.length > 1) {
    return '&mdash;';
  }
  return '';
};

const getDestinationsTemplate = (tripDestinations) => {
  const destinations = getUniqueElements(tripDestinations);
  const startDestination = destinations[0];
  const endDestination = destinations.length > 1 ? destinations[destinations.length - 1] : '';
  const middleDestination = destinations.length === 3 ? `${destinations[1]}&mdash;` : '';
  const divider = getDestinationsDivider(destinations);

  return `<h1
      class="trip-info__title">${startDestination} ${divider} ${middleDestination} ${endDestination}</h1>`;
};

const getDays = (startTripDay, endTripDay) => {
  if (dayjs(startTripDay).isSame(endTripDay, 'day')) {
    return `${formatDate(startTripDay, Format.DAY_MONTH)}`;
  }

  return `${formatDate(startTripDay, Format.DAY_MONTH)}&nbsp;&mdash;&nbsp;${formatDate(endTripDay, Format.DAY_MONTH)}`;
};

export const createTripInfoTemplate = (tripDestinations, tripStartDay, tripEndDay, tripPrice) => {
  const destinationTemplate = getDestinationsTemplate(tripDestinations);
  const days = getDays(tripStartDay, tripEndDay);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">

    ${destinationTemplate}

    <p class="trip-info__dates">${days}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPrice}</span>
  </p>
</section>`;
};
