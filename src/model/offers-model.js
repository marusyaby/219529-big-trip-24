import {offersMock} from '../mock/offers-mock.js';

export default class OffersModel {
  offers = offersMock;

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    const offers = this.getOffers();
    return offers.find((item) => item.type === type).offers;
  }

  getOffersById(type, ids) {
    const offers = this.getOffersByType(type);
    return offers.filter((item) => ids.find((id) => item.id === id));
  }

}
