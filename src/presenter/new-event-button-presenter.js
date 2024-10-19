import {render} from '../framework/render.js';
import NewEventButtonView from '../view/new-event-button-view.js';

export default class NewEventButtonPresenter {
  #headerContainer = null;
  #newEventButton = null;
  #handleNewEventButtonClick = null;

  constructor({headerContainer, onButtonClick}) {
    this.#headerContainer = headerContainer;
    this.#handleNewEventButtonClick = onButtonClick;
  }

  init() {
    this.#newEventButton = new NewEventButtonView({
      onNewEventButtonClick: this.#handleNewEventButtonClick
    });
    render(this.#newEventButton, this.#headerContainer);
  }

  disable() {
    this.#newEventButton.setDisabled(true);
  }

  enable() {
    this.#newEventButton.setDisabled(false);
  }
}
