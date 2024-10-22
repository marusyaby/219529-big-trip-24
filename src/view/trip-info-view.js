import {createTripInfoTemplate} from './templates/trip-info-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class TripInfoView extends AbstractView {
  #tripDestinations = [];
  #tripStartDay = null;
  #tripEndDay = null;
  #tripPrice = null;

  constructor({tripDestinations, tripStartDay, tripEndDay, tripPrice}) {
    super();
    this.#tripDestinations = tripDestinations;
    this.#tripStartDay = tripStartDay;
    this.#tripEndDay = tripEndDay;
    this.#tripPrice = tripPrice;
  }

  get template() {
    return createTripInfoTemplate(this.#tripDestinations, this.#tripStartDay, this.#tripEndDay, this.#tripPrice);
  }
}
