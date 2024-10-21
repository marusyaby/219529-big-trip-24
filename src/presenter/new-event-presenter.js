import EventsItemFormView, {BLANK_EVENT} from '../view/events-item-form-view.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import {UpdateType, UserAction} from './events-presenter.js';
import {nanoid} from 'nanoid';

export default class NewEventPresenter {
  #eventsList = null;
  #destinationsModel = null;
  #offersModel = null;
  #newEventItemForm = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({eventsList, destinationsModel, offersModel, onDataChange, onDestroy}) {
    this.#eventsList = eventsList;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newEventItemForm) {
      return;
    }

    this.#newEventItemForm = new EventsItemFormView({
      isNewItem: true,
      allDestinations: this.#destinationsModel.destinations,
      offersByType: [...this.#offersModel.getOffersByType(BLANK_EVENT.type)],
      onFormSubmit: this.#handleFormSubmit,
      onFormDeleteClick: this.#handleCancelClick,
      getOffersByType : this.#getOffersByType,
      getDestinationByName: this.#getDestinationByName,
    });

    render(this.#newEventItemForm, this.#eventsList.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (!this.#newEventItemForm) {
      return;
    }
    this.#newEventItemForm.element.querySelectorAll('.event__input')
      .forEach((input) => input.blur());

    this.#handleDestroy();

    remove(this.#newEventItemForm);
    this.#newEventItemForm = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving = () => {
    this.#newEventItemForm.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#newEventItemForm.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newEventItemForm.shake(resetFormState);
  };

  #getOffersByType = (type) =>
    [...this.#offersModel.getOffersByType(type)];

  #getDestinationByName = (name) =>
    this.#destinationsModel.getDestinationByName(name);

  #handleCancelClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (newEvent) => {
    this.#handleDataChange (
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {...newEvent,
        id: nanoid(),
      },
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
