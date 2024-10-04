import {createFiltersTemplate} from './templates/filters-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const DEFAULT_FILTER_NAME = FilterType.EVERYTHING;

export default class FiltersView extends AbstractView {
  #filters = null;
  activeFilterType;
  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
