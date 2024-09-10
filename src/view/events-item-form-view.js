import {createElement} from '../render.js';
import {createEventsItemFormTemplate} from './templates/events-item-form-template.js';

export default class EventsItemFormView {
  constructor(isNewItem) {
    this.isNewItem = isNewItem;
  }

  getTemplate() {
    return createEventsItemFormTemplate(this.isNewItem);
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
