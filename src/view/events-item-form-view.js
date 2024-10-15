import {createEventsItemFormTemplate} from './templates/events-item-form-template.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

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

const MAX_PRICE = 100000;

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
  #datepickerFrom = null;
  #datepickerTo = null;

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
      .addEventListener('change', this.#eventPriceChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);

    this.#setDatepickers();
  }

  reset(event) {
    this.element.querySelectorAll('.event__input')
      .forEach((input) => input.blur());
    this.updateElement(
      EventsItemFormView.parseEventToState(event, this.#destination,
        this.#offersByType)
    );
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  #setDatepickers = () => {
    const startDateElement = this.element.querySelector('.event__input--time[name="event-start-time"]');
    const endDateElement = this.element.querySelector('.event__input--time[name="event-end-time"]');
    const flatpickrConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(startDateElement, {
      ...flatpickrConfig,
      defaultDate: this._state.dateFrom,
      onClose: this.#startDateCloseHandler,
    });

    this.#datepickerTo = flatpickr(endDateElement, {
      ...flatpickrConfig,
      defaultDate: this._state.dateTo,
      onClose: this.#endDateCloseHandler,
      minDate: this._state.dateFrom
    });

  };

  #startDateCloseHandler = ([enteredDate]) => {
    this.updateElement({
        ...this._state,
        dateFrom: enteredDate ?? ''
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
    this.#validateForm();
  };

  #endDateCloseHandler = ([enteredDate]) => {
    this.updateElement({
        ...this._state,
        dateTo: enteredDate ?? ''
    });
    this.#validateForm();
  };

  #validateForm () {
    const isPriceInvalid =
      !Number.isSafeInteger(this._state.basePrice) ||
      this._state.basePrice <= 0 ||
      this._state.basePrice > MAX_PRICE;
    const isDestinationInvalid = !this._state.destination;
    const isStartDateInvalid = !this._state.dateFrom;
    const isDateInvalid =
      dayjs(this._state.dateTo).isBefore(this._state.dateFrom) ||
      !this._state.dateFrom ||
      !this._state.dateTo;

    if (isPriceInvalid) {
      this.element.querySelector('.event__field-group--price').
        classList.add('event__field-group--invalid');
    }
    if (isDestinationInvalid) {
      this.element.querySelector('.event__field-group--destination').
        classList.add('event__field-group--invalid');
    }
    if (isDateInvalid) {
      this.element.querySelector('.event__field-group--time').
        classList.add('event__field-group--invalid');
    }
    if (isPriceInvalid || isDestinationInvalid || isDateInvalid) {
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

  #eventPriceChangeHandler = (evt) => {
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

  static parseEventToState(event, destination, offersByType) {
    return {...event,
      destination,
      offersByType,
    };
  }

  static parseStateToEvent(state) {
    return {...state};
  }
}
