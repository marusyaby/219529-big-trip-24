import EventsSortView from '../view/events-sort-view.js';
import {render} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemFormView from '../view/events-item-form-view.js';
import EventsItemView from '../view/events-item-view.js';

const BLANK_EVENT = {
  'id': '',
  'basePrice': '',
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight',
};

export default class EventsPresenter {
  constructor({eventsContainer, eventsModel, destinationsModel, offersModel}) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  renderEventsSort() {
    render(new EventsSortView, this.eventsContainer);
  }

  renderEventsList() {
    this.eventsList = new EventsListView();
    render(this.eventsList, this.eventsContainer);
  }

  renderEventsItemNewForm() {
    const allDestinations = [...this.destinationsModel.getDestinations()];
    const allOffers = this.offersModel.getOffersByType(BLANK_EVENT.type);

    this.eventsItemNewForm = new EventsItemFormView(true, BLANK_EVENT, BLANK_EVENT.destination, BLANK_EVENT.offers, allDestinations, allOffers);
    render(this.eventsItemNewForm, this.eventsList.getElement());
  }

  renderEventsItemEditForm() {
    this.events = [...this.eventsModel.getEvents()];
    const event = this.events[0];
    const destination = this.destinationsModel.getDestinationsById(
      this.events[0].destination);
    const offers = this.offersModel.getOffersById(
      this.events[0].type, this.events[0].offers);
    const allDestinations = [...this.destinationsModel.getDestinations()];
    const allOffers = this.offersModel.getOffersByType(this.events[0].type);

    this.eventsItemEditForm = new EventsItemFormView(false, event, destination, offers, allDestinations, allOffers);
    render(this.eventsItemEditForm, this.eventsList.getElement());
  }

  renderEventsItems() {
    this.events = [...this.eventsModel.getEvents()];

    for (let i = 1; i < this.events.length; i++) {
      const event = this.events[i];
      const destination = this.destinationsModel.getDestinationsById(
        this.events[i].destination);
      const offers = this.offersModel.getOffersById(
        this.events[i].type, this.events[i].offers);

      render(new EventsItemView({event, destination, offers}),
        this.eventsList.getElement());
    }
  }

  init() {
    this.renderEventsSort();
    this.renderEventsList();
    this.renderEventsItemNewForm();
    this.renderEventsItemEditForm();
    this.renderEventsItems();
  }
}
