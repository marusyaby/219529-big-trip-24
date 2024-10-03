import EventsItemView from '../view/events-item-view.js';
import EventsItemFormView, {BLANK_EVENT} from '../view/events-item-form-view.js';
import {render, replace} from '../framework/render.js';

export default class EventPresenter {
  #eventsListContainer = null;
  #eventItem = null;
  #eventItemForm = null;
  #eventsItemNewForm = null;

  #destinationsModel = null;
  #offersModel = null;

  #event = null;
  #destination = null;
  #activeOffers = [];
  #allDestinations = [];

  constructor({eventsListContainer, destinationsModel, offersModel}) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#allDestinations = [...this.#destinationsModel.destinations];
  }

  init(event) {
    this.#event = event;
    this.#destination = this.#destinationsModel.getDestinationsById(event.destination);
    this.#activeOffers = this.#offersModel.getOffersById(this.#event.type, this.#event.offers);

    this.#eventItem = new EventsItemView({
      event: this.#event,
      destination: this.#destination,
      activeOffers: this.#activeOffers,
      onOpenEditButtonClick: this.#handleOpenEditButtonClick,
    });

    this.#eventItemForm = new EventsItemFormView({
      isNewItem: false,
      event: this.#event,
      destination: this.#destination,
      activeOffers: this.#activeOffers,
      allDestinations: this.#allDestinations,
      allOffers: [...this.#offersModel.getOffersByType(this.#event.type)],
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
      allDestinations: this.#allDestinations,
      allOffers: this.#offersModel.getOffersByType(BLANK_EVENT.type),
    });

    render(this.#eventsItemNewForm, this.#eventsListContainer);
  }
}
