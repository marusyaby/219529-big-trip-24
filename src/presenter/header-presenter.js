import {render} from '../render.js';
import TripInfoView from '../view/trip-info-view.js';
import TripFiltersView from '../view/trip-filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';

export default class HeaderPresenter {
  constructor(headerContainer) {
    this.headerContainer = headerContainer;
  }

  init() {
    render(new TripInfoView, this.headerContainer);
    render(new TripFiltersView(), this.headerContainer);
    render(new NewEventButtonView(), this.headerContainer);
  }
}
