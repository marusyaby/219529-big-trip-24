import {createEventsItemTemplate} from './templates/events-item-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EventsItemView extends AbstractView {
  #event = null;
  #destination = null;
  #offers = [];

  constructor({event, destination, offers}) {
    super();
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
  }

  get template() {
    return createEventsItemTemplate(this.#event, this.#destination, this.#offers);
  }
}
