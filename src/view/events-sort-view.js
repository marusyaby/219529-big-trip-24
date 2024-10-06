import {createEventsSortListTemplate} from './templates/events-sort-template.js';
import RadioListView from './radio-list-view.js';

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export const EnabledSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFER]: false
};

export default class EventsSortView extends RadioListView {
  get template() {
    return createEventsSortListTemplate(this._items);
  }
}
