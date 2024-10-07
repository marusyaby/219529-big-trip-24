import {render} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import {generateFilterTypes} from '../utils.js';

export default class HeaderPresenter {
  #eventsModel = null;
  #events = [];
  #filterTypes = [];

  constructor({headerContainer, eventsModel}) {
    this.headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#events = [...this.#eventsModel.events];
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderNewEventButton();
  }

  #renderTripInfo() {
    if (this.#events.length > 0) {
      render(new TripInfoView, this.headerContainer);
    }
  }

  #renderFilters() {
    this.#filterTypes = generateFilterTypes(this.#events);

    render(new FiltersView({
      items: this.#filterTypes,
    }), this.headerContainer);
  }

  #renderNewEventButton() {
    render(new NewEventButtonView(), this.headerContainer);
  }
}
