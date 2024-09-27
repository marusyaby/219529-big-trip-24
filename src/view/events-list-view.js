import {createEventsListTemplate} from './templates/events-list-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EventsListView extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}
