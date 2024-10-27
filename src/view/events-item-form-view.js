import {createEventsItemFormTemplate} from './templates/events-item-form-template.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

export const BLANK_EVENT = {
  'id': null,
  'basePrice': 0,
  'dateFrom': null,
  'dateTo': null,
  'destination': null,
  'isFavorite': false,
  'offers': [],
  'type': 'flight',
};

const MAX_PRICE = 100000;

export default class EventsItemFormView extends AbstractStatefulView {
  #isNewItem = null;
  #initialEvent = null;
  #fullDestination = null;
  #allDestinations = [];
  #offersByType = [];
  #handleCloseFormClick = null;
  #handleFormSubmit = null;
  #handleFormDeleteClick = null;
  #getOffersByType = null;
  #getDestinationByName = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #minEndDate = null;

  constructor({
    isNewItem,
    event = BLANK_EVENT,
    fullDestination,
    allDestinations,
    offersByType,
    onCloseFormClick,
    onFormSubmit,
    onFormDeleteClick,
    getOffersByType,
    getDestinationByName,
  }) {
    super();
    this.#isNewItem = isNewItem;
    this.#initialEvent = event;
    this.#fullDestination = fullDestination;
    this.#allDestinations = allDestinations;
    this.#offersByType = offersByType;
    this.#handleCloseFormClick = onCloseFormClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDeleteClick = onFormDeleteClick;
    this.#getOffersByType = getOffersByType;
    this.#getDestinationByName = getDestinationByName;
    this._setState(EventsItemFormView.parseEventToState(event, fullDestination, offersByType));
    this._restoreHandlers();
  }

  get template() {
    return createEventsItemFormTemplate(this.#isNewItem, this._state, this.#allDestinations);
  }

  _restoreHandlers() {
    if (!this.#isNewItem) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeFormClickHandler);
    }

    this.element
      .querySelector('.event__save-btn')
      .addEventListener('click', this.#saveFormClickHandler);

    this.element
      .querySelector('.event--edit')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClicktHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#eventDestinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#eventPriceInputHandler);

    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);

    this.#setDatepickers();
  }

  reset() {
    this.element.querySelectorAll('.event__input')
      .forEach((input) => input.blur());
    this.updateElement(
      EventsItemFormView.parseEventToState(this.#initialEvent, this.#fullDestination,
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

  #validateForm () {
    const isPriceInvalid =
      !Number.isSafeInteger(this._state.basePrice) ||
      this._state.basePrice <= 0 ||
      this._state.basePrice > MAX_PRICE;
    const isDestinationInvalid = !this._state.fullDestination;
    const isDateInvalid =
      dayjs(this._state.dateTo).isBefore(this._state.dateFrom) ||
      dayjs(this._state.dateTo).isSame(this._state.dateFrom) ||
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

    if (!isDateInvalid) {
      this.element.querySelector('.event__field-group--time').
        classList.remove('event__field-group--invalid');
    }
    if (!isPriceInvalid) {
      this.element.querySelector('.event__field-group--price').
        classList.remove('event__field-group--invalid');
    }
    if (!isPriceInvalid && !isDestinationInvalid && !isDateInvalid) {
      this.element.querySelector('.event__save-btn')
        .disabled = false;
    }
  }

  #setMinEndDate = () => {
    const startDateCopy = new Date(this._state?.dateFrom);
    this.#minEndDate = startDateCopy.setMinutes(startDateCopy.getMinutes() + 1);
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
      onChange: this.#startDateChangeHandler,
    });

    this.#datepickerTo = flatpickr(endDateElement, {
      ...flatpickrConfig,
      defaultDate: this._state.dateTo,
      onChange: this.#endDateChangeHandler,
      onOpen: this.#endDateOpenHandler,
      onClose: this.#endDateCloseHandler,
      minDate: this.#minEndDate,
    });
  };

  #startDateChangeHandler = ([enteredDate]) => {
    this._setState({
      ...this._state,
      dateFrom: enteredDate ?? ''
    });

    this.#setMinEndDate();

    this.#validateForm();
  };

  #endDateOpenHandler = () => {
    this.#datepickerTo.set('minDate', this.#minEndDate);
  };

  #endDateChangeHandler = ([enteredDate]) => {
    this._setState({
      ...this._state,
      dateTo: enteredDate ?? ''
    });

    this.#datepickerTo.input.value = flatpickr.formatDate(this._state.dateTo, 'd/m/y H:i');
    this.#validateForm();
  };

  #endDateCloseHandler = () => {
    if (this._state.dateTo) {
      this.#datepickerTo.input.value = flatpickr.formatDate(this._state.dateTo, 'd/m/y H:i');
    }

    this.#validateForm();
  };

  #closeFormClickHandler = (evt) => {
    evt.preventDefault(evt);
    this.#handleCloseFormClick(EventsItemFormView.parseStateToEvent(this.#initialEvent));
  };

  #saveFormClickHandler = () => {
    this.#validateForm();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault(evt);
    this.#handleFormSubmit(EventsItemFormView.parseStateToEvent(this._state));
  };

  #formDeleteClicktHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDeleteClick(this._state);
  };

  #eventTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    this.#offersByType = this.#getOffersByType(targetType);

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
      fullDestination: newDestination ?? '',
    });

    if (newDestination) {
      this._setState({
        ...this._state.event,
        destination: newDestination.id,
      });
    }

    this.#validateForm();
  };

  #eventPriceInputHandler = (evt) => {
    evt.preventDefault();
    const newPrice = Number(evt.target.value);

    this._setState({
      ...this._state.event,
      basePrice: newPrice,
    });

    this.element
      .querySelector('.event__input--price')
      .value = newPrice;

    this.#validateForm();
  };

  #offerChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      ...this._state.event,
      offers: selectedOffers.map((offerCheckboxElement) => offerCheckboxElement.id)
    });
  };

  static parseEventToState(event, fullDestination, offersByType) {
    return {...event,
      fullDestination,
      offersByType,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToEvent(state) {
    return {...state};
  }
}
