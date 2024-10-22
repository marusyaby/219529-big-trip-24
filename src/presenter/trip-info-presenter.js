import TripInfoView from '../view/trip-info-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import {UpdateType} from './events-presenter.js';
import {sortEvents} from '../utils.js';
import {SortType} from '../view/events-sort-view.js';

export default class TripInfoPresenter {
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #events = [];
  #tripDestinations = [];
  #tripStartDay = null;
  #tripEndDay = null;
  #tripPrice = null;

  #tripInfo = null;

  constructor({headerContainer, eventsModel, offersModel, destinationsModel}) {
    this.headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#tripInfo = new TripInfoView({
      tripDestinations: this.#tripDestinations,
      tripStartDay: this.#tripStartDay,
      tripEndDay: this.#tripEndDay,
      tripPrice: this.#tripPrice,
    });
  }

  init() {
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  #renderTripInfo() {
    render(this.#tripInfo, this.headerContainer, RenderPosition.AFTERBEGIN);
  }

  #clearTripInfo() {
    remove(this.#tripInfo);
  }

  #handleModelEvent = (updateType) => {
    if (updateType === UpdateType.ERROR) {
      return;
    }

    this.#events = sortEvents[SortType.DAY](this.#eventsModel.events);

    if (!this.#events.length) {
      this.#clearTripInfo();
      return;
    }

    this.#renderTripInfo();
  };
}
