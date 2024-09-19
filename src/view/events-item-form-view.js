import {createElement} from '../render.js';
import {createEventsItemFormTemplate} from './templates/events-item-form-template.js';

export default class EventsItemFormView {
  constructor(isNewItem, event, destination, offers, allDestinations, allOffers) {
    this.isNewItem = isNewItem;
    this.event = event;
    this.destination = destination;
    this.offers = offers;
    this.allDestinations = allDestinations;
    this.allOffers = allOffers;
  }

  getTemplate() {
    return createEventsItemFormTemplate(this.isNewItem, this.event, this.destination, this.offers, this.allDestinations, this.allOffers);
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
