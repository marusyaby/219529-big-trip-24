import {createTripFiltersTemplate} from './templates/trip-filters-template.js';
import {FILTER_VALUES} from './templates/trip-filters-template.js';
import {createElement} from '../render.js';

const checkedFilter = FILTER_VALUES[0];

export default class TripFiltersView {
  getTemplate() {
    return createTripFiltersTemplate(checkedFilter);
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
