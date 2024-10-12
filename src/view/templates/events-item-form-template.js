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

const createTypeItem = (value, isChecked) => `
    <div class="event__type-item">
                          <input id="event-type-${value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${value}" ${isChecked ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${capitalizeFirstLetter(value)}</label>
                        </div>
`;

const createDestinationsItemOptionTemplate = (city) =>
  `<option value="${city ? city : ''}"></option>`;

const createOfferTemplate = (offer, selectedOffers) => {
  const isChecked = selectedOffers.includes(offer.id);

  return `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="${offer.title}" ${isChecked ? 'checked' : ''}>
                        <label class="event__offer-label" for="${offer.id}">
                          <span class="event__offer-title">${offer.title}</span>
                          +€&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>
`;
};

const createOffersTemplate = (selectedOffers, offersByType) => {
  const offersSelectors = offersByType.map((offer) => createOfferTemplate(offer, selectedOffers)).join('');
  return `
    <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                        <div class="event__available-offers">

                    ${offersSelectors}

                        </div>
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

const createFormDetailsTemplate = (destination, selectedOffers, offersByType) =>
  `<section class="event__details">
${offersByType.length > 0 ? createOffersTemplate(selectedOffers, offersByType) : ''}
${!!destination.description && !!destination.pictures ? createDestinationTemplate(destination) : ''}
</section>`;

const createRollupButtonTemplate = () => `
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
`;

const createResetButtonTemplate = (isNewEvent) => `
    <button class="event__reset-btn" type="reset">${isNewEvent ? 'Cancel' : 'Delete'}</button>
`;

export const createEventsItemFormTemplate = (isNewEvent, event, allDestinations) => {
  const {id, type, dateFrom, dateTo, basePrice} = event;
  const capitalizedType = capitalizeFirstLetter(type);
  const city = event.destination.name ?? '';
  const typesList = EVENT_TYPES.map((value) =>
    createTypeItem(value, value === type))
    .join('');
  const citiesDatalist = (allDestinations).map((destinationItem) =>
    createDestinationsItemOptionTemplate(destinationItem.name))
    .join('');
  const startDate = dayjs(dateFrom).isValid() ? formatDate(dateFrom, Format.FULL_DATE) : '';
  const endDate = dayjs(dateTo).isValid() ? formatDate(dateTo, Format.FULL_DATE) : '';
  const rollupButtonTemplate = isNewEvent ? '' : createRollupButtonTemplate();
  const formDetailsTemplate = createFormDetailsTemplate(event.destination, event.offers, event.offersByType);
  const resetButtonTemplate = createResetButtonTemplate(isNewEvent);

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
                      <fieldset class="event__type-group" >
                        <legend class="visually-hidden">Event type</legend>

                        ${typesList}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                      ${capitalizedType}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${city}" list="destination-list-${id}" required autocomplete="off">
                    <datalist id="destination-list-${id}">

                    ${citiesDatalist}

                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startDate}">
                    —
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" name="event-price" value="${basePrice}" required min="1" max="100000" step="1"

                    pattern="\\d+" type="number" autocomplete="off">

                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>

                  ${resetButtonTemplate}

                  ${rollupButtonTemplate}

                </header>

                ${formDetailsTemplate}

              </form>
            </li>
`;
};
