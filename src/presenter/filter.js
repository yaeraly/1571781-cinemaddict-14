import FilterView from '../views/filter.js';

import { render, RenderPosition, replace, remove } from '../utils/render.js';

export default class MovieList {
  constructor(container) {
    this._container = container;
    this._filterComponent = null;
  }

  init(filter) {
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(filter);

    if(prevFilterComponent === null) {
      render(this._container, this._filterComponent.getElement(), RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }
}
