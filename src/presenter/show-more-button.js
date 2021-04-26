import ShowMoreButtonView from '../views/show-more-button.js';

import { render, RenderPosition, remove } from '../utils/render.js';
import { FILM_COUNT_PER_STEP } from '../const.js';

export default class MovieList {
  constructor(container, renderMovies) {
    this._renderMovies = renderMovies;

    this._container = container;
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._renderFilmCountPerStep = FILM_COUNT_PER_STEP;
  }

  init(movies) {
    this._movies = movies.slice();
    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    render(this._container, this._showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _handleShowMoreButtonClick() {
    this._renderMovies(this._movies.slice(this._renderFilmCountPerStep, this._renderFilmCountPerStep + FILM_COUNT_PER_STEP));
    this._renderFilmCountPerStep += FILM_COUNT_PER_STEP;

    if(this._movies.length <= this._renderFilmCountPerStep) {
      this._showMoreButtonComponent.removeClickHandler();
      remove(this._showMoreButtonComponent);
    }
  }
}
