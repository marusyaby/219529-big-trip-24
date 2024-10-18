import TripInfoPresenter from './presenter/trip-info-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const headerElement = document.querySelector('.trip-main');
const eventsElement = document.body.querySelector('.trip-events');

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filtersModel = new FiltersModel();

const tripInfoPresenter = new TripInfoPresenter({
  headerContainer: headerElement,
  eventsModel
});
const eventsPresenter = new EventsPresenter({
  eventsContainer: eventsElement,
  eventsModel,
  destinationsModel,
  offersModel,
  filtersModel,
});
const filtersPresenter = new FiltersPresenter({
  headerContainer: headerElement,
  eventsModel,
  filtersModel
});

tripInfoPresenter.init();
eventsPresenter.init();
filtersPresenter.init();


