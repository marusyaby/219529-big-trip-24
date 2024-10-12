import EventsItemView from '../view/events-item-view.js';
import EventsItemFormView, {BLANK_EVENT} from '../view/events-item-form-view.js';
import {remove, render, replace} from '../framework/render.js';

const Mode = {
  VIEW_EVENT: 'VIEW_EVENT',
  EDIT_EVENT: 'EDIT_EVENT'
};

export default class EventPresenter {
  #eventsListContainer = null;
  #eventItem = null;
  #eventItemForm = null;
  #eventsItemNewForm = null;

  #destinationsModel = null;
  #offersModel = null;

  #event = null;
  #destination = null;
  #selectedOffers = [];
  #allDestinations = [];

  #handleEventItemChange = null;
  #mode = Mode.VIEW_EVENT;
  #handleModeChange = null;

  constructor({eventsListContainer, destinationsModel, offersModel, onEventItemChange, onModeChange}) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#allDestinations = [...this.#destinationsModel.destinations];
    this.#handleEventItemChange = onEventItemChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;
    this.#destination = this.#destinationsModel.getDestinationsById(event.destination);
    this.#selectedOffers = this.#offersModel.getOffersById(this.#event.type, this.#event.offers);

    const previousEventItem = this.#eventItem;
    const previousEventItemForm = this.#eventItemForm;

    this.#eventItem = new EventsItemView({
      event: this.#event,
      destination: this.#destination,
      selectedOffers: this.#selectedOffers,
      onOpenFormClick: this.#handleOpenFormClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventItemForm = new EventsItemFormView({
      isNewItem: false,
      event: this.#event,
      destination: this.#destination,
      allDestinations: this.#allDestinations,
      offersByType: [...this.#offersModel.getOffersByType(this.#event.type)],
      onCloseFormClick: this.#handleCloseFormClick,
      onFormSubmit: this.#handleFormSubmit,
      getEventItemOffersByType : this.#getEventItemOffersByType,
      getDestinationByName: this.#getDestinationByName,
    });

    if (!previousEventItem || !previousEventItemForm) {
      render(this.#eventItem, this.#eventsListContainer);
      return;
    }

    if (this.#mode === Mode.VIEW_EVENT) {
      replace(this.#eventItem, previousEventItem);
    }
    if (this.#mode === Mode.EDIT_EVENT) {
      replace(this.#eventItemForm, previousEventItemForm);
    }

    remove(previousEventItem);
    remove(previousEventItemForm);
  }

  destroy() {
    remove(this.#eventItem);
    remove(this.#eventItemForm);
  }

  resetView() {
    if (this.#mode !== Mode.VIEW_EVENT) {
      this.#eventItemForm.reset(this.#event);
      this.#replaceFormToEvent();
    }
  }

  #replaceEventToForm() {
    replace(this.#eventItemForm, this.#eventItem);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDIT_EVENT;
  }

  #replaceFormToEvent() {
    replace(this.#eventItem, this.#eventItemForm);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.VIEW_EVENT;
  }

  #getEventItemOffersByType = (type) =>
    [...this.#offersModel.getOffersByType(type)];

  #getDestinationByName = (name) =>
    this.#destinationsModel.getDestinationByName(name);

  #renderEventItemNewForm() {
    this.#eventsItemNewForm = new EventsItemFormView({
      isNewItem: true,
      event: BLANK_EVENT,
      destination: BLANK_EVENT.destination,
      selectedOffers: BLANK_EVENT.offers,
      allDestinations: this.#allDestinations,
      offersByType: this.#offersModel.getOffersByType(BLANK_EVENT.type),
      getEventItemOffersByType : this.#getEventItemOffersByType,
    });

    render(this.#eventsItemNewForm, this.#eventsListContainer);
  }

  #handleOpenFormClick = () => {
    this.#replaceEventToForm();
  };

  #handleCloseFormClick = (event) => {
    this.#handleEventItemChange(event);
    this.#replaceFormToEvent();

  };

  #handleFormSubmit = (event) => {
    this.#handleEventItemChange(event);
    this.#replaceFormToEvent();
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
      this.#eventItemForm.reset(this.#event);
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
