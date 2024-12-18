import EventsItemView from '../view/events-item-view.js';
import EventsItemFormView from '../view/events-item-form-view.js';
import {remove, render, replace} from '../framework/render.js';
import {UpdateType, UserAction} from './events-presenter.js';

const Mode = {
  VIEW_EVENT: 'VIEW_EVENT',
  EDIT_EVENT: 'EDIT_EVENT'
};

export default class EventPresenter {
  #eventsListContainer = null;
  #eventItem = null;
  #eventItemForm = null;

  #destinationsModel = null;
  #offersModel = null;

  #event = null;
  #fullDestination = null;
  #selectedOffers = [];
  #allDestinations = [];

  #mode = Mode.VIEW_EVENT;
  #handleModeChange = null;
  #handleDataChange = null;

  constructor({eventsListContainer, destinationsModel, offersModel, onModeChange, onDataChange}) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#allDestinations = [...this.#destinationsModel.destinations];
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(event) {
    this.#event = event;
    this.#fullDestination = this.#destinationsModel.getDestinationsById(event.destination);
    this.#selectedOffers = this.#offersModel.getOffersById(this.#event.type, this.#event.offers);

    const previousEventItem = this.#eventItem;
    const previousEventItemForm = this.#eventItemForm;

    this.#eventItem = new EventsItemView({
      event: this.#event,
      fullDestination: this.#fullDestination,
      selectedOffers: this.#selectedOffers,
      onOpenFormClick: this.#handleOpenFormClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventItemForm = new EventsItemFormView({
      isNewItem: false,
      event: this.#event,
      fullDestination: this.#fullDestination,
      allDestinations: this.#allDestinations,
      offersByType: [...this.#offersModel.getOffersByType(this.#event.type)],
      onCloseFormClick: this.#handleCloseFormClick,
      onFormSubmit: this.#handleFormSubmit,
      onFormDeleteClick: this.#handleFormDeleteClick,
      getOffersByType : this.#getOffersByType,
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

  setSaving() {
    if (this.#mode === Mode.EDIT_EVENT) {
      this.#eventItemForm.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    this.#eventItemForm.updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  }

  setAborting() {
    if (this.#mode === Mode.VIEW_EVENT) {
      this.#eventItem.shake();
      return;
    }
    if (this.#mode === Mode.EDIT_EVENT) {
      const resetFormState = () => {
        this.#eventItemForm.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      };

      this.#eventItemForm.shake(resetFormState);
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

  #getOffersByType = (type) =>
    [...this.#offersModel.getOffersByType(type)];

  #getDestinationByName = (name) =>
    this.#destinationsModel.getDestinationByName(name);

  #handleOpenFormClick = () => {
    this.#replaceEventToForm();
  };

  #handleCloseFormClick = () => {
    this.resetView();
  };

  #handleFormSubmit = (updatedEvent) => {
    const isMinorUpdate =
      this.#event.dateFrom !== updatedEvent.dateFrom ||
      this.#event.dateTo !== updatedEvent.dateTo ||
      this.#event.basePrice !== updatedEvent.basePrice;

    const currentUpdateType = isMinorUpdate ?
      UpdateType.MINOR : UpdateType.PATCH;

    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      currentUpdateType,
      updatedEvent,
    );
  };

  #handleFormDeleteClick = (deletedEvent) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      deletedEvent
    );
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#event,
        isFavorite: !this.#event.isFavorite,
      },
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.resetView();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
