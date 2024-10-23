import {Format, formatDate} from '../../utils.js';

const getDestinationsTemplate = (tripDestinations) => {
  const startDestination = tripDestinations[0];
  const endDestination = tripDestinations[tripDestinations.length - 1];
  const middleDestination = tripDestinations.length === 3 ? `${tripDestinations[1]}&mdash;` : '';
  const divider = tripDestinations.length > 3 ? '&mdash; ... &mdash;' : '&mdash;';

  return `<h1
      class="trip-info__title">${startDestination} ${divider} ${middleDestination} ${endDestination}</h1>`;
};

export const createTripInfoTemplate = (tripDestinations, tripStartDay, tripEndDay, tripPrice) => {
  const destinationTemplate = getDestinationsTemplate(tripDestinations);
  const endDay = formatDate(tripEndDay, Format.DAY_MONTH);
  const startDay = formatDate(tripStartDay, Format.DAY_MONTH);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">

    ${destinationTemplate}

    <p class="trip-info__dates">${startDay}&nbsp;&mdash;&nbsp;${endDay}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPrice}</span>
  </p>
</section>`;
};
