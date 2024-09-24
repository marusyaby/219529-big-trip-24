import {destinationsMock} from '../mock/destinations-mock.js';

export default class DestinationsModel {
  destinations = destinationsMock;

  getDestinations() {
    return this.destinations;
  }

  getDestinationsById(destinationId) {
    return this.destinations.find((item) => item.id === destinationId);
  }
}
