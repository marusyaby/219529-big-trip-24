import {createElement} from '../render.js';
import {createEventsSortListTemplate} from './templates/events-sort-template.js';

export default class EventsSortView {
  getTemplate() {
    return createEventsSortListTemplate();
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
