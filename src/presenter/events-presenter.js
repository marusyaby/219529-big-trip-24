import EventsSortView from '../view/events-sort-view.js';
import {render} from '../render.js';
import EventsListView from '../view/events-list-view.js';
import EventsItemFormView from '../view/events-item-form-view.js';
import EventsItemView from '../view/events-item-view.js';

export default class EventsPresenter {
  eventsList = new EventsListView();
  eventsItemNewForm = new EventsItemFormView(true);
  eventsItemEditForm = new EventsItemFormView(false);

  constructor({eventsContainer, eventsModel, destinationsModel, offersModel}) {
    this.eventsContainer = eventsContainer;
    this.eventsModel = eventsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.events = [...this.eventsModel.getEvents()];

    // console.log(this.events);
    // console.log(this.offersModel.getOffers());
    // console.log(this.destinationsModel.getDestinations());
    // console.log(this.offersModel.getOffersByType('taxi'));


    render(new EventsSortView, this.eventsContainer);
    render(this.eventsList, this.eventsContainer);
    render(this.eventsItemNewForm, this.eventsList.getElement());
    render(this.eventsItemEditForm, this.eventsList.getElement());

    [...new Array(this.events.length)].map((element, index) => {
      const event = this.events[index];
      const destination = this.destinationsModel.getDestinationsById(
        this.events[index].destination);
      const offers = this.offersModel.getOffersById(
        this.events[index].type, this.events[index].offers);

      // console.log(this.events[index].offers[0], this.offersModel.getOffersByType(this.events[index].type));

      render(new EventsItemView({event, destination, offers}),
        this.eventsList.getElement());
    });
  }
}
