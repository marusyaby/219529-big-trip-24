export const SORT_VALUES = [
  'day',
  'event',
  'time',
  'price',
  'offers'
];

const activeSortItem = SORT_VALUES[0];
const disabledSortItems = [SORT_VALUES[1], SORT_VALUES[4]];

const createEventsSortItemTemplate = (value, isChecked, isDisabled) => `
            <div class="trip-sort__item  trip-sort__item--${value}">
              <input id="sort-${value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${value}" ${isDisabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}>
              <label class="trip-sort__btn" for="sort-${value}">${value}</label>
            </div>
`;

export const createEventsSortListTemplate = () => {
  const eventSortItems = SORT_VALUES.map((value) =>
    createEventsSortItemTemplate(value, value === activeSortItem, disabledSortItems.includes(value)))
    .join('');

  return `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${eventSortItems}
  </form>`;
};
