import {render} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import TripFiltersView, {DEFAULT_FILTER_NAME} from '../view/trip-filters-view.js';
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
    this.#renderTripFilters();
    this.#renderNewEventButton();
  }

  #renderTripInfo() {
    if (this.#events.length > 0) {
      render(new TripInfoView, this.headerContainer);
    }
  }

  #renderTripFilters() {
    const filters = generateFilters(this.#events, this.#activeFilterName);
    render(new TripFiltersView(filters), this.headerContainer);
  }

  #renderNewEventButton() {
    render(new NewEventButtonView(), this.headerContainer);
  }
}
