import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import {render} from './render.js';
import TripFiltersView from './view/trip-filters-view';

const siteHeaderElement = document.querySelector('.trip-main');

render(new TripInfoView(), siteHeaderElement);
render(new TripFiltersView(), siteHeaderElement);
render(new NewEventButtonView(), siteHeaderElement);
