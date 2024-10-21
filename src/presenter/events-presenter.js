import EventsSortView, {SortType} from '../view/events-sort-view.js';
import {remove, render} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView, {EventsMessage} from '../view/events-message-view.js';
import EventPresenter from './event-presenter.js';
import {filterEvents, generateSortTypes, sortEvents} from '../utils.js';
import {FilterType} from '../view/filters-view.js';
import NewEventPresenter from './new-event-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

const TimeLimit = {
  LOWER: 350,
  UPPER: 1000,
};

export default class EventsPresenter {
  #eventsContainer = null;

  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;

  #eventsList = null;
  #eventPresenter = null;
  #eventPresenters = new Map();

  #defaultSortType = SortType.DAY;
  #currentSortType = this.#defaultSortType;
  #eventsSort = null;

  #currentFilterType = null;

  #eventsMessage = null;

  #newEventButtonPresenter = null;
  #newEventPresenter = null;

  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER,
    upperLimit: TimeLimit.UPPER,
  });

  constructor({eventsContainer, eventsModel, destinationsModel, offersModel, filtersModel, newEventButtonPresenter}) {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;
    this.#newEventButtonPresenter = newEventButtonPresenter;
    this.#eventsList = new EventsListView();

    this.#newEventPresenter = new NewEventPresenter({
      eventsList: this.#eventsList,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#newEventDestroyHandler,
    });

    this.#filtersModel.addObserver(this.#modelEventHandler);
    this.#eventsModel.addObserver(this.#modelEventHandler);
  }

  get events() {
    this.#currentFilterType = this.#filtersModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filterEvents[this.#currentFilterType](events);
    return sortEvents[this.#currentSortType](filteredEvents);
  }

  init() {
    this.#renderContent();
  }

  newEventButtonClickHandler = () => {
    this.#currentSortType = this.#defaultSortType;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventButtonPresenter.disable();
    if (this.events.length === 0) {
      this.#renderEventsList();
      remove(this.#eventsMessage);
    }
    this.#newEventPresenter.init();
  };

  #renderEventsSort() {
    const sortTypes = generateSortTypes(this.#currentSortType);
    this.#eventsSort = new EventsSortView({
      items: sortTypes,
      onItemChange: this.#handleSortTypeChange,
    });

    render(this.#eventsSort, this.#eventsContainer);
  }

  #renderEventsList() {
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
    this.#eventsMessage = new EventsMessageView(message);
    render(this.#eventsMessage, this.#eventsContainer);
  }

  #renderContent() {
    if (this.#isLoading) {
      this.#renderEventsMessage(EventsMessage.LOADING);
      this.#newEventButtonPresenter.disable();
      return;
    }

    if (!this.events.length) {
      this.#renderEventsMessage(EventsMessage.EMPTY[this.#currentFilterType]);
      return;
    }

    this.#renderEventsSort();
    this.#renderEventsList();
    this.#renderEventItems();
  }

  #clearEvents() {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) =>
      presenter.destroy());
    this.#eventPresenters.clear();
  }

  #clearContent = ({resetSortType = false} = {}) => {
    this.#clearEvents();
    remove(this.#eventsSort);
    remove(this.#eventsList);
    remove(this.#eventsMessage);

    if (resetSortType) {
      this.#currentSortType = this.#defaultSortType;
    }
  };

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) =>
      presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearEvents();
    this.#renderEventItems();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    if (actionType === UserAction.UPDATE_EVENT) {
      this.#eventPresenters.get(update.id).setSaving();
      try {
        await this.#eventsModel.updateEvent(updateType, update);
      } catch (error) {
        this.#eventPresenters.get(update.id).setAborting();
      }
    }
    if (actionType === UserAction.ADD_EVENT) {
      this.#eventsModel.addEvent(updateType, update);
    }
    if (actionType === UserAction.DELETE_EVENT) {
      this.#eventPresenters.get(update.id).setDeleting();
      try {
        await this.#eventsModel.deleteEvent(updateType, update);
      } catch (error) {
        this.#eventPresenters.get(update.id).setAborting();
      }
    }

    this.#uiBlocker.unblock();
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
    if (updateType === UpdateType.INIT) {
      this.#isLoading = false;
      this.#newEventButtonPresenter.enable();
      this.#clearContent();
      this.#renderContent();
    }
    if (updateType === UpdateType.ERROR) {
      this.#isLoading = false;
      this.#newEventButtonPresenter.disable();
      this.#clearContent();
      this.#renderEventsMessage(EventsMessage.FAIL);
    }
  };

  #newEventDestroyHandler = () => {
    this.#newEventButtonPresenter.enable();
    if (this.events.length === 0) {
      this.#renderContent();
    }
  };
}
