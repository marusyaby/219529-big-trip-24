import {createEventsItemDestinationTemplate} from './templates/events-item-destination-template.js';
import {createElement} from '../render.js';

export default class EventsItemDestinationView {
  getTemplate() {
    return createEventsItemDestinationTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
