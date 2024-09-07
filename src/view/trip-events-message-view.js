import {TripEventsMessage} from './templates/trip-events-message-template.js';
import {createTripEventsMessageTemplate} from './templates/trip-events-message-template.js';
import {createElement} from '../render.js';

const currentTripEventsMessage = TripEventsMessage.EMPTY.EVERYTHING;

export default class TripEventsMessageView {
  getTemplate() {
    return createTripEventsMessageTemplate(currentTripEventsMessage);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
