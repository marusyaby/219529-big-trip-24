import {createEventsItemOffersTemplate} from './templates/events-item-offers-template.js';
import {createElement} from '../render.js';

export default class EventsItemOffersView {
  getTemplate() {
    return createEventsItemOffersTemplate();
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
