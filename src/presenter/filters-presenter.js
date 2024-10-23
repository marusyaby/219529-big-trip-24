import {remove, render, replace} from '../framework/render.js';
import {generateFilterTypes} from '../utils.js';
import FiltersView from '../view/filters-view.js';
import {UpdateType} from './events-presenter.js';

export default class FiltersPresenter {
  #headerContainer = null;
  #eventsModel = null;
  #filtersModel = null;
  #filtersComponent = null;
  #filterTypes = [];
  #currentFilterType = null;

  constructor({headerContainer, eventsModel, filtersModel}) {
    this.#headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#filtersModel = filtersModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#currentFilterType = this.#filtersModel.filter;
    const previousFiltersComponent = this.#filtersComponent;
    this.#filterTypes = generateFilterTypes(this.#eventsModel.events, this.#currentFilterType);

    this.#filtersComponent = new FiltersView({
      items: this.#filterTypes,
      onItemChange: this.#handleFilterTypeChange,
    });

    if (!previousFiltersComponent) {
      render(this.#filtersComponent, this.#headerContainer);
      return;
    }

    replace(this.#filtersComponent, previousFiltersComponent);
    remove(previousFiltersComponent);
  }

  #handleFilterTypeChange = (filterType) => {
    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
