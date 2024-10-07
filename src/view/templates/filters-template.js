const createFilterTemplate = (type, isActive, isClickable) => `
    <div class="trip-filters__filter">
                  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isActive ?
  'checked' : ''} ${isClickable ? '' : 'disabled'} data-item="${type}">
                  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
                </div>
  `;

export const createFiltersTemplate = (filters) => {
  const tripFilterElements = filters.map((filter) =>
    createFilterTemplate(filter.type, filter.isActive, filter.isClickable)).
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
