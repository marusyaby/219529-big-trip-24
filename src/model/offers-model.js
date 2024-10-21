export default class OffersModel {
  #offers = [];
  #eventsApiService = null;
  constructor({eventsApiService}) {
    this.#eventsApiService = eventsApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#eventsApiService.offers;
    } catch (error) {
      this.#offers = [];
    }
  }

  getOffersByType(type) {
    const offers = this.#offers;
    return offers.find((item) => item.type === type).offers;
  }

  getOffersById(type, ids) {
    const offers = this.getOffersByType(type);
    return offers.filter((item) => ids.find((id) => item.id === id));
  }
}
