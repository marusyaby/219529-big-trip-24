import EventsSortView from '../view/events-sort-view.js';
import {render} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView, {EventsMessage} from '../view/events-message-view.js';
import EventPresenter from './event-presenter.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #events = [];
  #eventsList = null;
  #eventPresenter = null;

  constructor({eventsContainer, eventsModel, destinationsModel, offersModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#events = [...this.#eventsModel.events];
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
    this.#eventsList = new EventsListView();
    render(this.#eventsList, this.#eventsContainer);
  }

  #renderEventItem(event) {
    this.#eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsList.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    this.#eventPresenter.init(event);
  }

  #renderEventItems() {
    this.#events.forEach((event) => {
      this.#renderEventItem(event);
    });
  }

  #renderEventsMessage(message) {
    render(new EventsMessageView(message), this.#eventsContainer);
  }
}
