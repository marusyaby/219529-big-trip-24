import {createEventsMessageTemplate} from './templates/trip-events-message-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export const EventsMessage = {
  FAIL: 'Failed to load latest route information',
  LOADING: 'Loading...',
  EMPTY: {
    EVERYTHING: 'Click New Event to create your first point',
    PAST: 'There are no past events now',
    PRESENT: 'There are no present events now',
    FUTURE: 'There are no future events now',
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
