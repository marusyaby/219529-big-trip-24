import {getRandomElement, updateItem} from '../utils.js';
import {eventsMock} from '../mock/events-mock.js';
import Observable from '../framework/observable.js';
import AdapterService from '../adapter-service.js';

const EVENTS_COUNT = 5;

export default class EventsModel extends Observable {
  #events = Array.from(new Set(Array.from({length: EVENTS_COUNT}, () =>
    getRandomElement(eventsMock))));

  #eventsApiService = null;
  #adapterService = new AdapterService();


  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;

    this.#eventsApiService.events.then((events) => {
      console.log(events);
      console.log('adaptedEvents', events.map(this.#adapterService.adaptToClient));
    });

    this.#eventsApiService.destinations.then((destinations) => {
      console.log(destinations);
    });

    this.#eventsApiService.offers.then((offers) => {
      console.log(offers);
    });
  }

  get events() {
    return this.#events;
  }

  updateEvent (updateType, updatedEvent) {
    this.#events = updateItem(updatedEvent, this.#events);
    this._notify(updateType, updatedEvent);
  }

  addEvent (updateType, updatedEvent) {
    this.#events = [updatedEvent, ...this.#events];
    this._notify(updateType, updatedEvent);
  }

  deleteEvent (updateType, updatedEvent) {
    this.#events = this.#events.filter((item)=>item.id !== updatedEvent.id);
    this._notify(updateType);
  }
}
