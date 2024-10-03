import {render} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView, {DEFAULT_FILTER_NAME} from '../view/filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import {generateFilters} from '../utils.js';

export default class HeaderPresenter {
  #eventsModel = null;
  #events = [];
  #activeFilterName = null;

  constructor({headerContainer, eventsModel}) {
    this.headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#events = [...this.#eventsModel.events];
    this.#activeFilterName = DEFAULT_FILTER_NAME;
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
    const filters = generateFilters(this.#events, this.#activeFilterName);
    render(new FiltersView(filters), this.headerContainer);
  }

  #renderNewEventButton() {
    render(new NewEventButtonView(), this.headerContainer);
  }
}
