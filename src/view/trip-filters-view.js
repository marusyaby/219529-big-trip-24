import {createTripFiltersTemplate} from './templates/trip-filters-template.js';
import {createElement} from '../render.js';

export default class TripFiltersView {
  getTemplate() {
    return createTripFiltersTemplate();
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
