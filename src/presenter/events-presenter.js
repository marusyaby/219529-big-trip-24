import EventsSortView from '../view/events-sort-view.js';
import {render} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemFormView from '../view/events-item-form-view.js';
import EventsItemView from '../view/events-item-view.js';

const BLANK_EVENT = {
  'id': '',
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight',
};

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({eventsContainer, eventsModel, destinationsModel, offersModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  #renderEventsSort() {
    render(new EventsSortView, this.#eventsContainer);
  }

  #renderEventsList() {
    this.eventsList = new EventsListView();
    render(this.eventsList, this.#eventsContainer);
  }

  #renderEventsItemNewForm() {
    const allDestinations = [...this.#destinationsModel.destinations];
    const allOffers = this.#offersModel.getOffersByType(BLANK_EVENT.type);

    this.eventsItemNewForm = new EventsItemFormView({
      isNewItem: true,
      event: BLANK_EVENT,
      destination: BLANK_EVENT.destination,
      offers: BLANK_EVENT.offers,
      allDestinations,
      allOffers,
    });
    render(this.eventsItemNewForm, this.eventsList.element);
  }

  #renderEventsItemEditForm() {
    this.events = [...this.#eventsModel.events];
    const event = this.events[0];
    const destination = this.#destinationsModel.getDestinationsById(
      this.events[0].destination);
    const offers = this.#offersModel.getOffersById(
      this.events[0].type, this.events[0].offers);
    const allDestinations = [...this.#destinationsModel.destinations];
    const allOffers = this.#offersModel.getOffersByType(this.events[0].type);

    this.eventsItemEditForm = new EventsItemFormView({
      isNewItem: false,
      event,
      destination,
      offers,
      allDestinations,
      allOffers});
    render(this.eventsItemEditForm, this.eventsList.element);
  }

  #renderEventItem(event, destination, offers) {
    const eventItem = new EventsItemView({
      event,
      destination,
      offers,
    });

    const eventItemForm = new EventsItemFormView({
      isNewItem: false,
      event,
      destination,
      offers,
      allDestinations: [...this.#destinationsModel.destinations],
      allOffers: this.#offersModel.getOffersByType(event.type),
    });

    render(eventItemForm, this.eventsList.element);
  }

  #renderEventItems() {
    const events = [...this.#eventsModel.events];

    events.forEach((event) => {
      const destination = this.#destinationsModel.getDestinationsById(
        event.destination);
      const offers = this.#offersModel.getOffersById(
        event.type, event.offers);

      this.#renderEventItem(event, destination, offers);
    });
  }

  init() {
    this.#renderEventsSort();
    this.#renderEventsList();
    // this.#renderEventsItemNewForm();
    // this.#renderEventsItemEditForm();
    this.#renderEventItems();
  }
}
