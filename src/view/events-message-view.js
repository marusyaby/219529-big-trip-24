import {createEventsMessageTemplate} from './templates/trip-events-message-template.js';
import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from './filters-view.js';

export const EventsMessage = {
  FAIL: 'Failed to load latest route information',
  LOADING: 'Loading...',
  EMPTY: {
    [FilterType.EVERYTHING]: 'Click New Event to create your first point',
    [FilterType.PAST]: 'There are no past events now',
    [FilterType.PRESENT]: 'There are no present events now',
    [FilterType.FUTURE]: 'There are no future events now',
  }
};

export default class EventsMessageView extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEventsMessageTemplate(this.#message);
  }
}
