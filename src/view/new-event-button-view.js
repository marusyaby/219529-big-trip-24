import {createNewEventButtonTemplate} from './templates/new-event-button-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class NewEventButtonView extends AbstractView {
  get template() {
    return createNewEventButtonTemplate();
  }
}

