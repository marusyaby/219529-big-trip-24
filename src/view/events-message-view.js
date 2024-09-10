import {createEventsMessageTemplate} from './templates/trip-events-message-template.js';
import {createElement} from '../render.js';

export default class EventsMessageView {
  getTemplate() {
    return createEventsMessageTemplate();
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
