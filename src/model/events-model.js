import {getRandomElement} from '../utils.js';
import {eventsMock} from '../mock/events-mock.js';

const EVENTS_COUNT = 3;

export default class EventsModel {
  #events = Array.from({length: EVENTS_COUNT}, () => getRandomElement(eventsMock));

  get events() {
    return this.#events;
  }
}
