import EventsItemView from '../view/events-item-view.js';
import EventsItemFormView from '../view/events-item-form-view.js';
import {render, replace} from '../framework/render.js';

const BLANK_EVENT = {
  'id': '',
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight',
};

export default class EventPresenter {
  #eventsListContainer = null;
  #eventItem = null;
  #eventItemForm = null;
  #destinationsModel = null;
  #offersModel = null;
  #destinations = [];
  #eventsItemNewForm = null;

  constructor({eventsListContainer, destinationsModel, offersModel}) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#destinations = [...this.#destinationsModel.destinations];
  }

  init({event, destination, activeOffers}) {
    this.#eventItem = new EventsItemView({
      event,
      destination,
      activeOffers,
      onOpenEditButtonClick: this.#handleOpenEditButtonClick,
    });

    this.#eventItemForm = new EventsItemFormView({
      isNewItem: false,
      event,
      destination,
      activeOffers,
      allDestinations: this.#destinations,
      allOffers: [...this.#offersModel.getOffersByType(event.type)],
      onCloseEditButtonClick: this.#handleCloseEditButtonClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    render(this.#eventItem, this.#eventsListContainer);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceEventToForm() {
    replace(this.#eventItemForm, this.#eventItem);
  }

  #replaceFormToEvent() {
    replace(this.#eventItem, this.#eventItemForm);
  }

  #handleOpenEditButtonClick = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleCloseEditButtonClick = () => {
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = () => {
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #renderEventItemNewForm() {
    this.#eventsItemNewForm = new EventsItemFormView({
      isNewItem: true,
      event: BLANK_EVENT,
      destination: BLANK_EVENT.destination,
      offers: BLANK_EVENT.offers,
      allDestinations: this.#destinations,
      allOffers: this.#offersModel.getOffersByType(BLANK_EVENT.type),
    });

    render(this.#eventsItemNewForm, this.#eventsListContainer);
  }
}
