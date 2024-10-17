import {getRandomElement, updateItem} from '../utils.js';
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
