import {getRandomElement} from '../utils.js';
import {eventsMock} from '../mock/events-mock.js';

const EVENTS_COUNT = 5;

export default class EventsModel {
  events = Array.from({length: EVENTS_COUNT}, () => getRandomElement(eventsMock));

  getEvents() {
    return this.events;
  }

}
