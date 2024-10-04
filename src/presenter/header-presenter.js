import {render} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import {filterEvents, isFiltered} from '../utils.js';

export default class HeaderPresenter {
  #eventsModel = null;
  #events = [];
  #filters = [];

  constructor({headerContainer, eventsModel}) {
    this.headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#events = [...this.#eventsModel.events];

    this.#filters = Object.entries(isFiltered).map(
      ([filterType, isFilterClickable], index) => ({
        name: filterType,
        isClickable: isFilterClickable(this.#events),
        isActive: index === 0,
        filteredEvents: filterEvents[filterType](this.#events),
      }),
    );
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
    render(new FiltersView({
      items: this.#filters,
    }), this.headerContainer);
  }

  #renderNewEventButton() {
    render(new NewEventButtonView(), this.headerContainer);
  }
}
