import AbstractView from '../framework/view/abstract-view';

export default class RadioListView extends AbstractView {
  _items = [];
  _handleItemChange = null;

  constructor({items, onItemChange}){
    super();

    this._items = items;
    this._handleItemChange = onItemChange;

    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  #itemChangeHandler = (evt) => {
    evt.preventDefault();
    if (this._handleItemChange) {
      this._handleItemChange(evt.target.dataset.item);
    }
    // this._handleItemChange?.(evt.target.dataset.item);
  };
}
