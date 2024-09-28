import {createTripFiltersTemplate} from './templates/trip-filters-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class TripFiltersView extends AbstractView {
  get template() {
    return createTripFiltersTemplate();
  }
}
