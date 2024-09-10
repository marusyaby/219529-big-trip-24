import EventsSortView from '../view/events-sort-view.js';
import {render} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemFormView from '../view/events-item-form-view.js';
import EventsItemView from '../view/events-item-view.js';

const EVENTS_COUNT = 3;

export default class EventsPresenter {
  eventsList = new EventsListView();
  eventsItemNewForm = new EventsItemFormView(true);
  eventsItemEditForm = new EventsItemFormView(false);

  constructor(eventsContainer) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new EventsSortView, this.eventsContainer);
    render(this.eventsList, this.eventsContainer);
    render(this.eventsItemNewForm, this.eventsList.getElement());
    render(this.eventsItemEditForm, this.eventsList.getElement());

    [...new Array(EVENTS_COUNT)].map(() =>
      render(new EventsItemView, this.eventsList.getElement()));
  }
}
