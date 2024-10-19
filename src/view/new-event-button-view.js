import {createNewEventButtonTemplate} from './templates/new-event-button-template.js';
import AbstractView from '../framework/view/abstract-view.js';

export default class NewEventButtonView extends AbstractView {
  #handleButtonClick = null;
  constructor({onNewEventButtonClick}) {
    super();
    this.#handleButtonClick = onNewEventButtonClick;

    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  setDisabled(isDisabled) {
    this.element.disabled = isDisabled;
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}

