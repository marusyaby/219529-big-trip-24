import {getRandomElement} from '../utils.js';
import {eventsMock} from '../mock/events-mock.js';
import Observable from '../framework/observable.js';

const EVENTS_COUNT = 5;

export default class EventsModel extends Observable {
  #events = Array.from(new Set(Array.from({length: EVENTS_COUNT}, () =>
    getRandomElement(eventsMock))));

  get events() {
    return this.#events;
  }

  updateEvent (updateType, updatedEvent) {
    const index = this.#events.findIndex((event) => event.id === updatedEvent.id);

    if (index === -1) {
      throw new Error('Unable to update a non-existent point');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      updatedEvent,
      ...this.#events.slice(index + 1),
    ];

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

  getEventById(eventId) {
    return this.#events.find((item) => item.id === eventId);
  }
}
