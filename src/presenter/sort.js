import SortView from '../views/sort.js';

import { render, RenderPosition } from '../utils/render.js';

export default class MovieList {
  constructor(container) {
    this._container = container;
  }

  init(movies) {
    if(movies.length === 0) {
      return;
    }
    render(this._container, new SortView().getElement(), RenderPosition.BEFOREEND);
  }
}
