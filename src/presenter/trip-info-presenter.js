import TripInfoView from '../view/trip-info-view.js';
import {render} from '../framework/render.js';

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
  }

  #renderTripInfo() {
    if (this.#events.length > 0) {
      render(new TripInfoView, this.headerContainer);
    }
  }
}
