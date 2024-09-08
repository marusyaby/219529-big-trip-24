import {createElement} from '../render.js';
import {createEventsItemDetailsTemplate} from './templates/events-item-details-template.js';

export default class EventsItemDetailsView {
  getTemplate() {
    return createEventsItemDetailsTemplate();
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
