import {createFiltersTemplate} from './templates/filters-template.js';
import RadioListView from './radio-list-view.js';

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export default class FiltersView extends RadioListView {

  get template() {
    return createFiltersTemplate(this._items);
  }
}
