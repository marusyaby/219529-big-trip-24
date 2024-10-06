import EventsSortView, {SortType} from '../view/events-sort-view.js';
import {render} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView, {EventsMessage} from '../view/events-message-view.js';
import EventPresenter from './event-presenter.js';
import {generateSortTypes, sortEvents, updateItem} from '../utils.js';

export default class EventsPresenter {
  #eventsContainer = null;

  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #events = [];
  #eventsList = null;
  #eventPresenter = null;
  #eventPresenters = new Map();

  #sortTypes = [];
  #defaultSortType = SortType.DAY;
  #currentSortType = this.#defaultSortType;

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
    this.#sortTypes = generateSortTypes(this.#defaultSortType);

    render(new EventsSortView({
      items: this.#sortTypes,
      onItemChange: this.#handleSortTypeChange,
    }), this.#eventsContainer);
  }

  #sortEvents(sortType) {
    this.#currentSortType = sortType;
    this.#events = sortEvents[sortType](this.#events);
  }

  #clearEvents() {
    this.#eventPresenters.forEach((presenter) =>
      presenter.destroy());
    this.#eventPresenters.clear();
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
      onEventItemChange: this.#handleEventItemChange,
      onModeChange: this.#handleModeChange,
    });

    this.#eventPresenter.init(event);
    this.#eventPresenters.set(event.id, this.#eventPresenter);
  }

  #renderEventItems() {
    this.#sortEvents(this.#currentSortType);
    this.#events.forEach((event) => {
      this.#renderEventItem(event);
    });
  }

  #renderEventsMessage(message) {
    render(new EventsMessageView(message), this.#eventsContainer);
  }

  #handleEventItemChange = (updatedEvent) => {
    this.#events = updateItem(updatedEvent, this.#events);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) =>
      presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortEvents(sortType);
    this.#clearEvents();
    this.#renderEventItems();
  };
}
