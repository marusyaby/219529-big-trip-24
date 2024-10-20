import TripInfoView from '../view/trip-info-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import {render} from '../framework/render';

export default class TripInfoPresenter {
  #eventsModel = null;
  #events = [];

  constructor({headerContainer, eventsModel}) {
    this.headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#events = [...this.#eventsModel.events];
  }

  init() {
    this.#renderTripInfo();
    // this.#renderNewEventButton();
  }

  #renderTripInfo() {
    if (this.#events.length > 0) {
      render(new TripInfoView, this.headerContainer);
    }
  }

  #renderNewEventButton() {
    render(new NewEventButtonView(), this.headerContainer);
  }
}
