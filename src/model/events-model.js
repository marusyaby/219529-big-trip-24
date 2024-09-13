import {getRandomElement} from '../utils.js';
import {EVENTS} from '../mock/events.js';

const EVENTS_COUNT = 4;

export default class EventsModel {
  events = Array.from({length: EVENTS_COUNT}, () => getRandomElement(EVENTS));

  getEvents() {
    return this.events;
  }

}
