import TripInfoView from '../view/trip-info-view.js';
import {remove, render, RenderPosition, replace} from '../framework/render.js';
import {UpdateType} from './events-presenter.js';
import {sortEvents} from '../utils.js';
import {SortType} from '../view/events-sort-view.js';

export default class TripInfoPresenter {
  #headerContainer = null;
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
    this.#headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#eventsModel.addObserver(this.#ModelEventHandler);
  }

  init() {
    const previousTripInfo = this.#tripInfo;

    this.#tripInfo = new TripInfoView({
      tripDestinations: this.#tripDestinations,
      tripStartDay: this.#tripStartDay,
      tripEndDay: this.#tripEndDay,
      tripPrice: this.#tripPrice,
    });

    if (!previousTripInfo) {
      render(this.#tripInfo, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfo, previousTripInfo);
    remove(previousTripInfo);

    render(this.#tripInfo, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #getEventPrice(event) {
    if (event.offers.length) {
      return this.#offersModel.getOffersById(event.type, event.offers)
        .map((offer) => offer.price)
        .flat()
        .reduce((sum, current) => sum + current, 0)
        + event.basePrice;
    }

    return event.basePrice;
  }

  #getTripData() {
    this.#tripDestinations =
      this.#events.map((event) =>
        this.#destinationsModel.getDestinationsById(event.destination).name);

    this.#tripPrice =
      this.#events.map((event) =>
        this.#getEventPrice(event))
        .reduce((sum, current) => sum + current, 0);

    this.#tripStartDay = this.#events[0]?.dateFrom;
    this.#tripEndDay = this.#events[this.#events.length - 1]?.dateTo;
  }

  #ModelEventHandler = (updateType) => {
    if (updateType === UpdateType.ERROR) {
      return;
    }

    this.#events = sortEvents[SortType.DAY](this.#eventsModel.events);

    if (!this.#events.length) {
      remove(this.#tripInfo);
      return;
    }

    this.#getTripData();
    this.init();
  };
}
