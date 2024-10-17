import {
  capitalizeFirstLetter,
  Format,
  formatDate, formatDuration,
  getDuration,
} from '../../utils.js';

const createOfferTemplate = (title, price) => `
                  <li class="event__offer">
                    <span class="event__offer-title">${title}</span>
                    +€&nbsp
                    <span class="event__offer-price">${price}</span>
                  </li>
`;

const createOffersTemplate = (selectedOffers) =>
  selectedOffers ?
    selectedOffers.map((offer) => createOfferTemplate(offer.title, offer.price)).
      join('') : '';

export const createEventsItemTemplate = (event, destination, selectedOffers) => {
  const {basePrice, isFavorite, type, dateFrom, dateTo} = event;
  // const city = capitalizeFirstLetter(destination.name);
  const city = destination ? capitalizeFirstLetter(destination.name) : event.destination.name;
  const capitalizedType = capitalizeFirstLetter(type);
  const startDate = formatDate(dateFrom, Format.DATE);
  const startTime = formatDate(dateFrom, Format.TIME);
  const endTime = formatDate(dateTo, Format.TIME);
  const duration = formatDuration(getDuration(dateFrom, dateTo));
  const offersTemplate = createOffersTemplate(selectedOffers);

  return `
            <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${startDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${capitalizedType} ${city}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${startTime}</time>
                    —
                    <time class="event__end-time" datetime="${dateTo}">${endTime}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">

                ${offersTemplate}

                </ul>
                <button class="event__favorite-btn
                    ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
`;
};
