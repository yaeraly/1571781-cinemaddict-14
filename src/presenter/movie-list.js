import FilmView from '../views/films/film.js';
import FilmListView from '../views/films/film-list.js';
import NoFilmListView from '../views/films/no-film-list.js';
import FilmListContainerView from '../views/films/film-card-container.js';

import FilterPresenter from './filter.js';
import MoviePresenter from './movie.js';
import ShowMoreButtonPresenter from './show-more-button.js';

import { render, RenderPosition, remove } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { FILM_COUNT_PER_STEP } from '../const.js';
import { generateFilter } from '../mock/filter.js';

export default class MovieList {
  constructor(container) {
    this._container = container;
    this._filmsComponent = new FilmView();
    this._filmsListComponent = new FilmListView();
    this._cardListComponent = new FilmListContainerView();

    this._filterPresenter = new FilterPresenter(this._container);

    this._renderMovies = this._renderMovies.bind(this);
    this._renderFilmCountPerStep = FILM_COUNT_PER_STEP;

    this._handleMovieChange = this._handleMovieChange.bind(this);

    this._moviePresenter = {};

    this._cardComponent = null;
  }

  init(movies) {
    this._movies = movies.slice();

    this._renderFilter(this._movies);
    this._renderContentContainer();
    if(this._movies.length === 0) {
      this._renderNoMovievContent();
      return;
    }
    this._rednerCardListContainer();
    this._renderMovieList();
  }

  _renderFilter(movies) {
    this._filter = generateFilter(movies);
    this._filterPresenter.init(this._filter);
  }

  _renderContentContainer() {
    render(this._container, this._filmsComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderNoMovievContent() {
    render(this._filmsComponent.getElement(), new NoFilmListView(), RenderPosition.BEFOREEND);
  }

  _rednerCardListContainer() {
    render(this._filmsComponent.getElement(), this._filmsListComponent.getElement(), RenderPosition.BEFOREEND);
    render(this._filmsListComponent.getElement(), this._cardListComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderMovieList() {
    this._showMoreButtonPresenter = new ShowMoreButtonPresenter(this._filmsListComponent.getElement(), this._renderMovies);

    this._renderMovies(this._movies.slice(0, Math.min(this._movies.length, FILM_COUNT_PER_STEP)));
    if(this._movies.length > FILM_COUNT_PER_STEP) {
      this._showMoreButtonPresenter.init(this._movies);
    }
  }

  _renderMovies(movies) {
    movies.forEach((movie) => this._renderMovie(movie));
  }

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(this._cardListComponent, this._handleMovieChange);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _handleMovieChange(updatedMovie) {
    this._movies = updateItem(this._movies, updateItem);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
    this._renderFilter(this._movies);
  }

  _clearMovies() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderFilmCountPerStep = FILM_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }
}
