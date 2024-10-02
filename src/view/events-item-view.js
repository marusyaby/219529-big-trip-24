import {createEventsItemTemplate} from './templates/events-item-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EventsItemView extends AbstractView {
  #event = null;
  #destination = null;
  #activeOffers = [];
  #onOpenEditButtonClick = null;

  constructor({event, destination, onOpenEditButtonClick, activeOffers}) {
    super();
    this.#event = event;
    this.#destination = destination;
    this.#activeOffers = activeOffers;
    this.#onOpenEditButtonClick = onOpenEditButtonClick;
    this.#setEventListeners();
  }

  get template() {
    return createEventsItemTemplate(this.#event, this.#destination, this.#activeOffers);
  }

  #setEventListeners() {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#openEditButtonClickHandler);
  }

  #openEditButtonClickHandler = (evt) => {
    evt.preventDefault(evt);
    this.#onOpenEditButtonClick();
  };
}
