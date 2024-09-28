import {createEventsItemFormTemplate} from './templates/events-item-form-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EventsItemFormView extends AbstractView {
  #isNewItem = null;
  #event = null;
  #destination = null;
  #activeOffers = [];
  #allDestinations = [];
  #allOffers = [];
  #onCloseEditButtonClick = null;
  #onFormSubmit = null;

  constructor({
    isNewItem,
    event,
    destination,
    activeOffers,
    allDestinations,
    allOffers,
    onCloseEditButtonClick,
    onFormSubmit,
  }) {
    super();
    this.#isNewItem = isNewItem;
    this.#event = event;
    this.#destination = destination;
    this.#activeOffers = activeOffers;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#onCloseEditButtonClick = onCloseEditButtonClick;
    this.#onFormSubmit = onFormSubmit;
    this.#setEventListeners();
  }

  get template() {
    return createEventsItemFormTemplate(this.#isNewItem, this.#event,
      this.#destination, this.#activeOffers, this.#allDestinations, this.#allOffers);
  }

  #setEventListeners() {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeEditButtonClickHandler);

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  #closeEditButtonClickHandler = (evt) => {
    evt.preventDefault(evt);
    this.#onCloseEditButtonClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault(evt);
    this.#onFormSubmit();
  };
}
