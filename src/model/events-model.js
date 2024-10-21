import {updateItem} from '../utils.js';
import Observable from '../framework/observable.js';
import AdapterService from '../adapter-service.js';
import {UpdateType} from '../presenter/events-presenter.js';

export default class EventsModel extends Observable {
  #events = [];

  #eventsApiService = null;
  #adapterService = new AdapterService();
  #offersModel = null;
  #destinationsModel = null;

  constructor({eventsApiService, offersModel, destinationsModel}) {
    super();
    this.#eventsApiService = eventsApiService;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get events() {
    return this.#events;
  }

  async init() {
    try {
      await Promise.all([this.#offersModel.init(), this.#destinationsModel.init()]);
      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adapterService.adaptToClient);
    } catch (error) {
      this.#events = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updateEvent (updateType, updatedEvent) {
    try {
      const response = await this.#eventsApiService.updateEvent(updatedEvent);
      const adaptedEvent = this.#adapterService.adaptToClient(response);
      this.#events = updateItem(adaptedEvent, this.#events);
      this._notify(updateType, adaptedEvent);
    } catch (error) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent (updateType, newEvent) {
    try {
      const response = await this.#eventsApiService.addEvent(newEvent);
      const adaptedNewEvent = this.#adapterService.adaptToClient(response);
      this.#events = [adaptedNewEvent, ...this.#events];
      this._notify(updateType, adaptedNewEvent);
    } catch (error) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent (updateType, deletedEvent) {
    try {
      await this.#eventsApiService.deleteEvent(deletedEvent);
      this.#events = this.#events.filter((item)=>item.id !== deletedEvent.id);
      this._notify(updateType);
    } catch (error) {
      throw new Error('Can\'t delete event');
    }
  }
}
