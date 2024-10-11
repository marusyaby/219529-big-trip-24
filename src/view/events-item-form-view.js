import {createEventsItemFormTemplate} from './templates/events-item-form-template.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

export const BLANK_EVENT = {
  'id': '',
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'flight',
};

export default class EventsItemFormView extends AbstractStatefulView {
  #isNewItem = null;
  #initialEvent = null;
  #destination = null;
  #allDestinations = [];
  #offersByType = [];
  #handleCloseFormClick = null;
  #handleFormSubmit = null;
  #getEventItemOffersByType = null;
  #getDestinationByName = null;

  constructor({
    isNewItem,
    event,
    destination,
    allDestinations,
    offersByType,
    onCloseFormClick,
    onFormSubmit,
    getEventItemOffersByType,
    getDestinationByName,
  }) {
    super();
    this.#isNewItem = isNewItem;
    this.#initialEvent = event;
    this.#destination = destination;
    this.#allDestinations = allDestinations;
    this.#offersByType = offersByType;
    this.#handleCloseFormClick = onCloseFormClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#getEventItemOffersByType = getEventItemOffersByType;
    this.#getDestinationByName = getDestinationByName;
    this._setState(EventsItemFormView.parseEventToState(event, destination, offersByType));
    this._restoreHandlers();
  }

  get template() {
    return createEventsItemFormTemplate(this.#isNewItem, this._state, this.#allDestinations);
  }

  reset(event) {
    this.updateElement(
      EventsItemFormView.parseEventToState(event, this.#destination, this.#offersByType, this.#allDestinations)
    );
  }

  #validateForm () {
    const isPriceInvalid = !Number.isSafeInteger(this._state.basePrice) || this._state.basePrice <= 0;
    const isDestinationInvalid = !this._state.destination;

    if (isPriceInvalid) {
      this.element.querySelector('.event__field-group--price').
        classList.add('event__field-group--invalid');
    }
    if (isDestinationInvalid) {
      this.element.querySelector('.event__field-group--destination').
        classList.add('event__field-group--invalid');
    }
    if (isPriceInvalid || isDestinationInvalid) {
      this.element.querySelector('.event__save-btn')
        .disabled = true;
    }
  }

  #closeFormClickHandler = (evt) => {
    evt.preventDefault(evt);
    this.#handleCloseFormClick(EventsItemFormView.parseStateToEvent(this.#initialEvent));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault(evt);
    this.#handleFormSubmit(EventsItemFormView.parseStateToEvent(this.#initialEvent));
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    this.#offersByType = this.#getEventItemOffersByType(targetType);

    this.updateElement({
      type: targetType,
      offersByType: this.#offersByType,
      offers: [],
    });

    this.#validateForm();
  };

  #eventDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#getDestinationByName(targetDestination);

    this.updateElement({
      destination: newDestination ?? '',
    });

    this.#validateForm();
  };

  #eventPriceInputHandler = (evt) => {
    evt.preventDefault();
    const newPrice = Number(evt.target.value);

    this.updateElement({
      basePrice: newPrice,
    });

    this.#validateForm();
  };

  #offerChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      ...this._state.event,
      offers: selectedOffers.map((offerCheckboxElement) => offerCheckboxElement.id)
    });
  };

  _restoreHandlers() {
    if (!this.#isNewItem) {
      this.element.querySelector('.event__rollup-btn').
        addEventListener('click', this.#closeFormClickHandler);
    }

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#eventDestinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#eventPriceInputHandler);

    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);
  }

  static parseEventToState(event, destination, offersByType, allDestinations) {
    return {...event,
      destination,
      offersByType,
      allDestinations
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};
    return event;
  }
}
