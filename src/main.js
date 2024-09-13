import HeaderPresenter from './presenter/header-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';

const headerElement = document.querySelector('.trip-main');
const eventsElement = document.body.querySelector('.trip-events');

const headerPresenter = new HeaderPresenter(headerElement);
headerPresenter.init();

const eventsModel = new EventsModel();
const eventsPresenter = new EventsPresenter({eventsContainer: eventsElement, eventsModel});
eventsPresenter.init();


