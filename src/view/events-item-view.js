import {createEventsItemTemplate} from './templates/events-item-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EventsItemView extends AbstractView {
  #event = null;
  #destination = null;
  #selectedOffers = [];
  #handleOpenFormClick = null;
  #handleFavoriteClick = null;

  constructor({event, destination, selectedOffers, onOpenFormClick, onFavoriteClick}) {
    super();
    this.#event = event;
    this.#destination = destination;
    this.#selectedOffers = selectedOffers;
    this.#handleOpenFormClick = onOpenFormClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#setEventListeners();
  }

  get template() {
    return createEventsItemTemplate(this.#event, this.#destination, this.#selectedOffers);
  }

  #setEventListeners() {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#openFormClickHandler);

    this.element
      .querySelector('.event__favorite-icon')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  #openFormClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleOpenFormClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
