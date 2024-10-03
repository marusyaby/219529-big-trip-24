import {capitalizeFirstLetter, Format, formatDate} from '../../utils.js';
import dayjs from 'dayjs';

export const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const createEventTypeItem = (value, isChecked) => `
    <div class="event__type-item">
                          <input id="event-type-${value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${value}" ${isChecked ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${capitalizeFirstLetter(value)}</label>
                        </div>
`;

const createDestinationsItemOptionTemplate = (city) =>
  `<option value="${city ? city : ''}"></option>`;

const createOfferTemplate = (offer, activeOffers, id) => {
  const isChecked = activeOffers ? activeOffers.includes(offer) : false;

  return `
                    <div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}-${id}" type="checkbox" name="${offer.title}" ${isChecked ? 'checked' : ''}>
                        <label class="event__offer-label" for="${offer.id}-${id}">
                          <span class="event__offer-title">${offer.title}</span>
                          +€&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>
`;
};

const createOffersTemplate = (activeOffers, allOffers, id) => {
  const offers = allOffers.map((offer) => createOfferTemplate(offer, activeOffers, id)).join('');
  return `
    <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    ${offers}

                    </div>
                  </section>
`;
};

const createDestinationPhotoTemplate = (picture) => `
  <img class="event__photo" src=${picture.src} alt="${picture.description}">
`;

const createDestinationPhotosTemplate = (destination) => {
  const pictures = (destination.pictures).map((picture) =>
    createDestinationPhotoTemplate(picture))
    .join('');

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures}
      </div>
    </div>`;
};

const createDestinationTemplate = (destination) =>
  `<section class="event__section  event__section--destination">
    <h3
      class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description ? destination.description : ''}</p>

    ${destination.pictures.length > 0 ? createDestinationPhotosTemplate(destination) : ''}

  </section>`;

const createFormDetailsTemplate = (destination, activeOffers, allOffers, id) =>
  `<section class="event__details">
${allOffers.length > 0 ? createOffersTemplate(activeOffers, allOffers, id) : ''}
${!!destination.description && !!destination.pictures ? createDestinationTemplate(destination) : ''}
</section>`;

const createRollupButtonTemplate = () => `
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
`;

export const createEventsItemFormTemplate = (isNewEvent, event, destination, activeOffers, allDestinations, allOffers) => {
  const {id, type, dateFrom, dateTo, basePrice} = event;
  const {name} = destination;
  const eventTypeItemsList = EVENT_TYPES.map((value) =>
    createEventTypeItem(value, value === type))
    .join('');
  const citiesDatalist = (allDestinations).map((item) =>
    createDestinationsItemOptionTemplate(item.name))
    .join('');
  const eventStartTime = dayjs(dateFrom).isValid() ? formatDate(dateFrom, Format.FULL_DATE) : '';
  const eventEndTime = dayjs(dateTo).isValid() ? formatDate(dateFrom, Format.FULL_DATE) : '';

  return `
            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${eventTypeItemsList}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${capitalizeFirstLetter(type)}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name ? name : ''}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">

                    ${citiesDatalist}

                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${eventStartTime}">
                    —
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${eventEndTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${isNewEvent ? 'Cancel' : 'Delete'}</button>

                  ${isNewEvent ? '' : createRollupButtonTemplate()}

                </header>

                ${createFormDetailsTemplate(destination, activeOffers, allOffers, id)}

              </form>
            </li>
`;
};
