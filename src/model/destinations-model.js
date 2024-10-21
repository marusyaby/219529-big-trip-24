export default class DestinationsModel {
  #destinations = [];
  #eventsApiService = null;

  constructor({eventsApiService}) {
    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#eventsApiService.destinations;
    } catch (error) {
      this.#destinations = [];
    }
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationsById(destinationId) {
    return this.#destinations.find((item) => item.id === destinationId);
  }

  getDestinationByName(destinationName) {
    return this.#destinations.find((item) => item.name === destinationName);
  }
}
