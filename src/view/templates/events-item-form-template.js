import {capitalizeFirstLetter} from '../../utils.js';

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
const OFFERS_COUNT = 1;
const PHOTOS_COUNT = 8;
const activeType = EVENT_TYPES[2];

const createEventTypeItem = (value, isChecked) => `
    <div class="event__type-item">
                          <input id="event-type-${value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${value}" ${isChecked ? 'checked' : ''}>
                          <label class="event__type-label  event__type-label--${value}" for="event-type-${value}-1">${capitalizeFirstLetter(value)}</label>
                        </div>
`;

const createDestinationsItemOptionTemplate = (value = 'Geneva') => `
                      <option value="${value}"></option>
`;

const createRollupButtonTemplate = () => `
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
`;

const createOfferTemplate = () => `
                    <div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
                        <label class="event__offer-label" for="event-offer-luggage-1">
                          <span class="event__offer-title">Add luggage</span>
                          +€&nbsp;
                          <span class="event__offer-price">30</span>
                        </label>
                      </div>
`;
const createOffersTemplate = () => {
  const offers = [...new Array(OFFERS_COUNT)].map(() => createOfferTemplate()).join('');
  return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>


                    ${offers}

                    </div>
                  </section>
`;
};

const createDestinationPhotoTemplate = () => `
  <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
`;

const createDestinationTemplate = () => {
  const photos = [...new Array(PHOTOS_COUNT)].map(() => createDestinationPhotoTemplate()).join('');
  return `<section class="event__section  event__section--destination">
    <h3
      class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">Geneva is a city in Switzerland
      that lies at the southern tip of expansive Lac Léman (Lake Geneva).
      Surrounded by the Alps and Jura mountains, the city has views of dramatic
      Mont Blanc.</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos}
      </div>
    </div>
  </section>`;
};

const createFormDetailsTemplate = () => {
  return `
  <section class="event__details">
${createOffersTemplate()}
${createDestinationTemplate()}
</section>
`;
};

export const createEventsItemFormTemplate = (isNewEvent) => {
  const eventTypeItems = EVENT_TYPES.map((value) => createEventTypeItem(value, value === activeType)).
    join('');

  return `
            <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${activeType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${eventTypeItems}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
                    <datalist id="destination-list-1">

                    ${createDestinationsItemOptionTemplate()}

                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">${isNewEvent ? 'Cancel' : 'Delete'}</button>

                  ${isNewEvent ? '' : createRollupButtonTemplate()}

                </header>

                ${createFormDetailsTemplate()}

              </form>
            </li>
`;
};
