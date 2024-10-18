import EventsSortView, {SortType} from '../view/events-sort-view.js';
import {remove, render} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView, {EventsMessage} from '../view/events-message-view.js';
import EventPresenter from './event-presenter.js';
import {generateSortTypes, sortEvents} from '../utils.js';

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export default class EventsPresenter {
  #eventsContainer = null;

  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #eventsList = null;
  #eventPresenter = null;
  #eventPresenters = new Map();

  #defaultSortType = SortType.DAY;
  #currentSortType = this.#defaultSortType;
  #eventsSort = null;

  constructor({eventsContainer, eventsModel, destinationsModel, offersModel}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventsModel.addObserver(this.#modelEventHandler);
  }

  get events() {
    const events = this.#eventsModel.events;
    return sortEvents[this.#currentSortType](events);
  }

  init() {
    this.#renderContent();
  }

  #renderEventsSort() {
    const sortTypes = generateSortTypes(this.#currentSortType);
    this.#eventsSort = new EventsSortView({
      items: sortTypes,
      onItemChange: this.#handleSortTypeChange,
    });

    render(this.#eventsSort, this.#eventsContainer);
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
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    this.#eventPresenter.init(event);
    this.#eventPresenters.set(event.id, this.#eventPresenter);
  }

  #renderEventItems() {
    this.events.forEach((event) => {
      this.#renderEventItem(event);
    });
  }

  #renderEventsMessage(message) {
    render(new EventsMessageView(message), this.#eventsContainer);
  }

  #renderContent() {
    if (this.events.length === 0) {
      this.#renderEventsMessage(EventsMessage.EMPTY.EVERYTHING);
      return;
    }

    this.#renderEventsSort();
    this.#renderEventsList();
    this.#renderEventItems();
  }

  #clearEvents() {
    this.#eventPresenters.forEach((presenter) =>
      presenter.destroy());
    this.#eventPresenters.clear();
  }

  #clearContent = ({resetSortType = false} = {}) => {
    this.#clearEvents();
    remove(this.#eventsSort);
    remove(this.#eventsList);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) =>
      presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearEvents();
    this.#renderEventItems();
  };

  #handleViewAction = (actionType, updateType, update) => {
    if (actionType === UserAction.UPDATE_EVENT) {
      this.#eventsModel.updateEvent(updateType, update);
    }
    if (actionType === UserAction.ADD_EVENT) {
      this.#eventsModel.addEvent(updateType, update);
    }
    if (actionType === UserAction.DELETE_EVENT) {
      this.#eventsModel.deleteEvent(updateType, update);
    }
  };

  #modelEventHandler = (updateType, data) => {
    if (updateType === UpdateType.PATCH) {
      this.#eventPresenters?.get(data.id)?.init(data);
    }
    if (updateType === UpdateType.MINOR) {
      this.#clearContent();
      this.#renderContent();
    }
    if (updateType === UpdateType.MAJOR) {
      this.#clearContent({resetSortType: true});
      this.#renderContent();
    }
  };
}
