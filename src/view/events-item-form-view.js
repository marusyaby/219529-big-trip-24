import {createEventsItemFormTemplate} from './templates/events-item-form-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EventsItemFormView extends AbstractView {
  #isNewItem = null;
  #event = null;
  #destination = null;
  #offers = [];
  #allDestinations = [];
  #allOffers = [];

  constructor({isNewItem, event, destination, offers, allDestinations, allOffers}) {
    super();
    this.#isNewItem = isNewItem;
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
  }

  get template() {
    return createEventsItemFormTemplate(this.#isNewItem, this.#event, this.#destination, this.#offers, this.#allDestinations, this.#allOffers);
  }
}
