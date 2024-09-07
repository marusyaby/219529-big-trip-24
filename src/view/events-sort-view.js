import {createElement} from '../render.js';
import {createEventsSortListTemplate} from './templates/events-sort-template.js';
import {SORT_VALUES} from './templates/events-sort-template.js';

const activeSortItem = SORT_VALUES[0];
const disabledSortItems = [SORT_VALUES[1], SORT_VALUES[4]];
export default class EventsSortView {
  getTemplate() {
    return createEventsSortListTemplate(activeSortItem, disabledSortItems);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }
}
