import {render} from './render.js';
import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import EventsSortView from './view/events-sort-view.js';
import EventsListView from './view/events-list-view.js';
import EventsItemFormView from './view/events-item-form-view.js';
import EventsItemDetailsView from './view/events-item-details-view.js';
import EventsItemEditOffersView from './view/events-item-offers-view.js';
import EventsItemDestinationView from './view/events-item-destination-view.js';
import EventsItemView from './view/events-item-view.js';
// import EventsMessageView from './view/events-message-view.js';

const headerElement = document.querySelector('.trip-main');
const tripEventsElement = document.body.querySelector('.trip-events');

render(new TripInfoView(), headerElement);
render(new TripFiltersView(), headerElement);
render(new NewEventButtonView(), headerElement);

// render(new EventsMessageView(), tripEventsElement);
render(new EventsSortView(), tripEventsElement);
render(new EventsListView(), tripEventsElement);

const eventsListElement = tripEventsElement.querySelector('.trip-events__list');
render(new EventsItemFormView(true), eventsListElement);

const EventsItemEditElement = eventsListElement.querySelector('.event--edit');
render(new EventsItemDetailsView, EventsItemEditElement);

const eventItemDetailsElement = tripEventsElement.querySelector('.event__details');
render(new EventsItemEditOffersView, eventItemDetailsElement);
render(new EventsItemDestinationView, eventItemDetailsElement);

render(new EventsItemFormView(false), eventsListElement);
render(new EventsItemView, eventsListElement);

