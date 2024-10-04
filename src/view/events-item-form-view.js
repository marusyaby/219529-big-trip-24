import {createEventsItemFormTemplate} from './templates/events-item-form-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export const BLANK_EVENT = {
  'id': '',
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight',
};

export default class EventsItemFormView extends AbstractView {
  #isNewItem = null;
  #event = null;
  #destination = null;
  #activeOffers = [];
  #allDestinations = [];
  #allOffers = [];
  #handleCloseFormClick = null;
  #handleFormSubmit = null;

  constructor({
    isNewItem,
    event,
    destination,
    activeOffers,
    allDestinations,
    allOffers,
    onCloseFormClick,
    onFormSubmit,
  }) {
    super();
    this.#isNewItem = isNewItem;
    this.#event = event;
    this.#destination = destination;
    this.#activeOffers = activeOffers;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleCloseFormClick = onCloseFormClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#setEventListeners();
  }

  get template() {
    return createEventsItemFormTemplate(this.#isNewItem, this.#event,
      this.#destination, this.#activeOffers, this.#allDestinations, this.#allOffers);
  }

  #setEventListeners() {
    if (!this.#isNewItem) {
      this.element.querySelector('.event__rollup-btn').
        addEventListener('click', this.#closeFormClickHandler);
    }

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  #closeFormClickHandler = (evt) => {
    evt.preventDefault(evt);
    this.#handleCloseFormClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault(evt);
    this.#handleFormSubmit(this.#event);
  };
}
