import EventsSortView from '../view/events-sort-view.js';
import {render, replace} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemFormView from '../view/events-item-form-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventsMessageView, {EventsMessage} from '../view/events-message-view.js';

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
  #events = [];
  #destinations = [];

  constructor({eventsContainer, eventsModel, destinationsModel, offersModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#events = [...this.#eventsModel.events];
    this.#destinations = [...this.#destinationsModel.destinations];
  }

  init() {
    if (this.#events.length === 0) {
      this.#renderEventsMessage(EventsMessage.EMPTY.EVERYTHING);
      return;
    }

    this.#renderEventsSort();
    this.#renderEventsList();
    this.#renderEventItems();
  }

  #renderEventsSort() {
    render(new EventsSortView, this.#eventsContainer);
  }

  #renderEventsList() {
    this.eventsList = new EventsListView();
    render(this.eventsList, this.#eventsContainer);
  }

  #renderEventItemNewForm() {
    this.eventsItemNewForm = new EventsItemFormView({
      isNewItem: true,
      event: BLANK_EVENT,
      destination: BLANK_EVENT.destination,
      offers: BLANK_EVENT.offers,
      allDestinations: this.#destinations,
      allOffers: this.#offersModel.getOffersByType(BLANK_EVENT.type),
    });

    render(this.eventsItemNewForm, this.eventsList.element);
  }

  #renderEventItem({event, destination, activeOffers}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const onOpenEditButtonClick = () => {
      replaceEventToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    };

    const onCloseEditButtonClick = () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const onFormSubmit = () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const eventItem = new EventsItemView({
      event,
      destination,
      activeOffers,
      onOpenEditButtonClick,
    });

    const eventItemForm = new EventsItemFormView({
      isNewItem: false,
      event,
      destination,
      activeOffers,
      allDestinations: this.#destinations,
      allOffers: [...this.#offersModel.getOffersByType(event.type)],
      onCloseEditButtonClick,
      onFormSubmit,
    });

    function replaceEventToForm() {
      replace(eventItemForm, eventItem);
    }

    function replaceFormToEvent() {
      replace(eventItem, eventItemForm);
    }

    render(eventItem, this.eventsList.element);
  }

  #renderEventItems() {
    this.#events.forEach((event) => {

      this.#renderEventItem({
        event,
        destination: this.#destinationsModel.getDestinationsById(event.destination),
        activeOffers: this.#offersModel.getOffersById(event.type, event.offers)
      });
    });
  }

  #renderEventsMessage(message) {
    render(new EventsMessageView(message), this.#eventsContainer);
  }
}
