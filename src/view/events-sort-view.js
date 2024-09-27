import {createEventsSortListTemplate} from './templates/events-sort-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EventsSortView extends AbstractView {
  get template() {
    return createEventsSortListTemplate();
  }
}
