import {render} from './render.js';
import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import EventsSortView from './view/events-sort-view';
// import TripEventsMessageView from './view/trip-events-message-view.js';

const headerElement = document.querySelector('.trip-main');
const tripEventsElement = document.body.querySelector('.trip-events');

render(new TripInfoView(), headerElement);
render(new TripFiltersView(), headerElement);
render(new NewEventButtonView(), headerElement);

// render(new TripEventsMessageView(), tripEventsElement);
render(new EventsSortView(), tripEventsElement);
