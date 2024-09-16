import EventsSortView from '../view/events-sort-view.js';
import {render} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemFormView from '../view/events-item-form-view.js';
import EventsItemView from '../view/events-item-view.js';

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
    this.eventsItemNewForm = new EventsItemFormView(true);
    render(this.eventsItemNewForm, this.eventsList.getElement());
  }

  renderEventsItemEditForm() {
    this.eventsItemEditForm = new EventsItemFormView(false);
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
