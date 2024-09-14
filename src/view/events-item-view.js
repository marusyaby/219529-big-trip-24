import {createElement} from '../render.js';
import {createEventsItemTemplate} from './templates/events-item-template.js';

export default class EventsItemView {
  constructor({event, destination, offers}) {
    this.event = event;
    this.destination = destination;
    this.offers = offers;
  }

  getTemplate() {
    return createEventsItemTemplate(this.event, this.destination, this.offers);
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
