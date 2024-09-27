import {createEventsItemTemplate} from './templates/events-item-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EventsItemView extends AbstractView {
  #event = null;
  #destination = null;
  #offers = [];
  #onOpenEditButtonClick = null;

  constructor({event, destination, offers, onOpenEditButtonClick}) {
    super();
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#onOpenEditButtonClick = onOpenEditButtonClick;
    this.#setEventListeners();
  }

  get template() {
    return createEventsItemTemplate(this.#event, this.#destination, this.#offers);
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
