const createEventsSortItemTemplate = (type, isActive, isClickable) => `
            <div class="trip-sort__item  trip-sort__item--${type}">
              <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
              value="sort-${type}" ${isClickable ? '' : 'disabled'} ${isActive ? 'checked' : ''} data-item="${type}">
              <label class="trip-sort__btn" for="sort-${type}">${type}</label>
            </div>
`;

export const createEventsSortListTemplate = (sortTypes) => {
  const eventSortItems = sortTypes.map((sortType) =>
    createEventsSortItemTemplate(sortType.type, sortType.isActive, sortType.isClickable))
    .join('');

  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${eventSortItems}
  </form>`;
};

