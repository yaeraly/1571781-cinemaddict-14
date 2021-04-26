import FilmDetailView from '../views/film-details/film-details.js';

import { render, RenderPosition, remove } from '../utils/render.js';

export default class MovieDetail {
  constructor(container) {
    this._container = container;
  }

  init(movie) {
    this._container.parentElement.classList.add('hide-overflow');

    const filmDetailComponent = new FilmDetailView(movie);

    filmDetailComponent.setClickHandler(() => {
      this._container.parentElement.classList.remove('hide-overflow');
      filmDetailComponent.removeClickHandler();
      remove(filmDetailComponent);
    });

    filmDetailComponent.setWatchlistClickHandler(() => alert('watch'));
    filmDetailComponent.setWatchedClickHandler(() => alert('watched'));
    filmDetailComponent.setFavoriteClickHandler(() => alert('favorite'));

    render(this._container, filmDetailComponent.getElement(), RenderPosition.BEFOREEND);
  }
}
