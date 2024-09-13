import EventsSortView from '../view/events-sort-view.js';
import {render} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemFormView from '../view/events-item-form-view.js';
import EventsItemView from '../view/events-item-view.js';

export default class EventsPresenter {
  eventsList = new EventsListView();
  eventsItemNewForm = new EventsItemFormView(true);
  eventsItemEditForm = new EventsItemFormView(false);

  constructor({eventsContainer, eventsModel}) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];
    console.log(this.events);

    render(new EventsSortView, this.eventsContainer);
    render(this.eventsList, this.eventsContainer);
    render(this.eventsItemNewForm, this.eventsList.getElement());
    render(this.eventsItemEditForm, this.eventsList.getElement());

    [...new Array(this.events.length)].map((event, index) =>
      render(new EventsItemView(this.events[index]), this.eventsList.getElement()));
  }
}
