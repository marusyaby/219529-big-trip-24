import EventsItemView from '../view/events-item-view.js';
import EventsItemFormView, {BLANK_EVENT} from '../view/events-item-form-view.js';
import {remove, render, replace} from '../framework/render.js';

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

  #handleEventItemChange = null;

  constructor({eventsListContainer, destinationsModel, offersModel, onEventItemChange}) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#allDestinations = [...this.#destinationsModel.destinations];
    this.#handleEventItemChange = onEventItemChange;
  }

  init(event) {
    this.#event = event;
    this.#destination = this.#destinationsModel.getDestinationsById(event.destination);
    this.#activeOffers = this.#offersModel.getOffersById(this.#event.type, this.#event.offers);

    const previousEventItem = this.#eventItem;
    const previousEventItemForm = this.#eventItemForm;

    this.#eventItem = new EventsItemView({
      event: this.#event,
      destination: this.#destination,
      activeOffers: this.#activeOffers,
      onOpenFormClick: this.#handleOpenFormClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventItemForm = new EventsItemFormView({
      isNewItem: false,
      event: this.#event,
      destination: this.#destination,
      activeOffers: this.#activeOffers,
      allDestinations: this.#allDestinations,
      allOffers: [...this.#offersModel.getOffersByType(this.#event.type)],
      onCloseFormClick: this.#handleCloseFormClick,
      onFormSubmit: this.#handleFormSubmit,
    });

    if (!previousEventItem || !previousEventItemForm) {
      render(this.#eventItem, this.#eventsListContainer);
      return;
    }

    if (this.#eventsListContainer.contains(previousEventItem.element)) {
      replace(this.#eventItem, previousEventItem);
    }
    if (this.#eventsListContainer.contains(previousEventItemForm.element)) {
      replace(this.#eventItemForm, previousEventItemForm);
    }

    remove(previousEventItem);
    remove(previousEventItemForm);
  }

  destroy() {
    remove(this.#eventItem);
    remove(this.#eventItemForm);
  }

  #replaceEventToForm() {
    replace(this.#eventItemForm, this.#eventItem);
  }

  #replaceFormToEvent() {
    replace(this.#eventItem, this.#eventItemForm);
  }

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

  #handleOpenFormClick = () => {
    this.#replaceEventToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleCloseFormClick = () => {
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (event) => {
    this.#handleEventItemChange(event);
    this.#replaceFormToEvent();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleEventItemChange({
      ...this.#event,
      isFavorite: !this.#event.isFavorite
    });
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
