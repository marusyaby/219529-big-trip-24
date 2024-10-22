export const createTripInfoTemplate = (tripDestinations, tripStartDay, tripEndDay, tripPrice) => {
  const startDestination = tripDestinations.pop();
  const endDestination = tripDestinations.shift();

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1
      class="trip-info__title">${startDestination} &mdash; ... &mdash; ${endDestination}</h1>

    <p class="trip-info__dates">${tripStartDay}&nbsp;&mdash;&nbsp;${tripEndDay}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPrice}</span>
  </p>
</section>`;
};
