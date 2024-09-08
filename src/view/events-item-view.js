import {createElement} from '../render.js';
import {createEventsItemTemplate} from './templates/events-item-template.js';

export default class EventsItemView {
  getTemplate() {
    return createEventsItemTemplate();
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
