import {createEventsMessageTemplate} from './templates/trip-events-message-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class EventsMessageView extends AbstractView {
  get template() {
    return createEventsMessageTemplate();
  }
}
