const createTripFilterTemplate = (type, isActive, isVisible) => `
    <div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isActive ?
  'checked' :
  ''} ${isVisible ? '' : 'disabled'}>
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
  `;

export const createTripFiltersTemplate = (filters) => {
  const tripFilterElements = filters.map((filter) =>
    createTripFilterTemplate(filter.name, filter.isActive, filter.isClickable)).
    join('');

  return `
    <div class="trip-main__trip-controls  trip-controls">
      <div class="trip-controls__filters">
        <h2 class="visually-hidden">Filter events</h2>
        <form class="trip-filters" action="#" method="get">

        ${tripFilterElements}

          <button class="visually-hidden" type="submit">Accept filter</button>
        </form>
      </div>
    </div>
  `;
};
