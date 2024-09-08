const OFFERS_COUNT = 1;
const createEventsItemOfferTemplate = () => `
                    <div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
                        <label class="event__offer-label" for="event-offer-luggage-1">
                          <span class="event__offer-title">Add luggage</span>
                          +€&nbsp;
                          <span class="event__offer-price">30</span>
                        </label>
                      </div>
`;
export const createEventsItemOffersTemplate = () => {
  const offers = [...new Array(OFFERS_COUNT)].map(() => createEventsItemOfferTemplate()).join('');
  return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>


                    ${offers}

                    </div>
                  </section>
`;
};


