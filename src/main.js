import HeaderPresenter from './presenter/header-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';

const headerElement = document.querySelector('.trip-main');
const eventsElement = document.body.querySelector('.trip-events');

const headerPresenter = new HeaderPresenter(headerElement);
headerPresenter.init();

const eventsPresenter = new EventsPresenter(eventsElement);
eventsPresenter.init();


