import {render} from './render.js';
import TripInfoView from './view/trip-info-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import NewEventButtonView from './view/new-event-button-view.js';

const siteHeaderElement = document.querySelector('.trip-main');

render(new TripInfoView(), siteHeaderElement);
render(new TripFiltersView(), siteHeaderElement);
render(new NewEventButtonView(), siteHeaderElement);
