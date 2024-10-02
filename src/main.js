import HeaderPresenter from './presenter/header-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const headerElement = document.querySelector('.trip-main');
const eventsElement = document.body.querySelector('.trip-events');

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const headerPresenter = new HeaderPresenter({
  headerContainer: headerElement,
  eventsModel
});
const eventsPresenter = new EventsPresenter({
  eventsContainer: eventsElement,
  eventsModel,
  destinationsModel,
  offersModel
});

headerPresenter.init();
eventsPresenter.init();


