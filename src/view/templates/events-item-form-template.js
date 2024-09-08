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

export const createEventsItemFormTemplate = (isNewEvent) => {
  const eventTypeItems = EVENT_TYPES.map((value) => createEventTypeItem(value, value === activeType)).
    join('');

  return `<li class="trip-events__item">
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

              </form>
            </li>
`;
};
