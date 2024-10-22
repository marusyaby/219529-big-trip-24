import TripInfoPresenter from './presenter/trip-info-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import NewEventButtonPresenter from './presenter/new-event-button-presenter.js';
import EventsApiService from './events-api-service.js';

const AUTHORIZATION = 'Basic mashaBestProgrammer';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const headerElement = document.querySelector('.trip-main');
const eventsElement = document.body.querySelector('.trip-events');

const eventsApiService = new EventsApiService(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel({
  eventsApiService
});
const destinationsModel = new DestinationsModel({
  eventsApiService
});
const eventsModel = new EventsModel({
  eventsApiService,
  offersModel,
  destinationsModel
});

const filtersModel = new FiltersModel();

const tripInfoPresenter = new TripInfoPresenter({
  headerContainer: headerElement,
  eventsModel,
  offersModel,
  destinationsModel
});
const filtersPresenter = new FiltersPresenter({
  headerContainer: headerElement,
  eventsModel,
  filtersModel
});
const newEventButtonPresenter = new NewEventButtonPresenter({
  headerContainer: headerElement,
  onButtonClick: getButtonClickHandler,
});
const eventsPresenter = new EventsPresenter({
  eventsContainer: eventsElement,
  eventsModel,
  destinationsModel,
  offersModel,
  filtersModel,
  newEventButtonPresenter
});

function getButtonClickHandler() {
  return eventsPresenter.newEventButtonClickHandler();
}

tripInfoPresenter.init();
filtersPresenter.init();
newEventButtonPresenter.init();
eventsModel.init();
eventsPresenter.init();
