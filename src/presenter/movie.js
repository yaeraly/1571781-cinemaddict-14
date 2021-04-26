import FilmDetailView from '../views/film-details/film-details.js';
import CardView from '../views/card.js';

import { render, RenderPosition, remove, replace } from '../utils/render.js';

export default class Movie {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._cardComponent = null;
    this._filmDetailComponent = null;

    this._handleWatchlistClick  = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick    = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick   = this._handleFavoriteClick.bind(this);

    this._handlePopupWatchlistClick  = this._handlePopupWatchlistClick.bind(this);
    this._handlePopupWatchedClick    = this._handlePopupWatchedClick.bind(this);
    this._handlePopupFavoriteClick   = this._handlePopupFavoriteClick.bind(this);
  }

  init(movie) {
    this._movie = movie;
    const prevCardComponent = this._cardComponent;

    this._cardComponent = new CardView(this._movie);
    this._cardComponent.setClickHandler(() => this._renderMovieDetail(this._movie));

    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if(prevCardComponent === null) {
      render(this._container, this._cardComponent.getElement(), RenderPosition.BEFOREEND);
      return;
    }

    replace(this._cardComponent, prevCardComponent);
    remove(prevCardComponent);
  }

  _handleWatchlistClick() {
    const returnedTarget = Object.assign({}, this._movie.user_details, {watchlist: !this._movie.user_details.watchlist});
    this._movie.user_details = returnedTarget;
    this._changeData(Object.assign(this._movie));
  }

  _handleWatchedClick() {
    const returnedTarget = Object.assign({}, this._movie.user_details, {already_watched: !this._movie.user_details.already_watched});
    this._movie.user_details = returnedTarget;
    this._changeData(Object.assign(this._movie));
  }

  _handleFavoriteClick() {
    const returnedTarget = Object.assign({}, this._movie.user_details, {favorite: !this._movie.user_details.favorite});
    this._movie.user_details = returnedTarget;
    this._changeData(Object.assign(this._movie));
  }

  _handlePopupWatchlistClick() {
    this._handleWatchlistClick();
    this._renderMovieDetail();
  }

  _handlePopupWatchedClick() {
    this._handleWatchedClick();
    this._renderMovieDetail();
  }

  _handlePopupFavoriteClick() {
    this._handleFavoriteClick();
    this._renderMovieDetail();
  }

  _renderMovieDetail() {
    const body = document.body;
    const prevFilmDetailComponent = this._filmDetailComponent;
    this._filmDetailComponent = new FilmDetailView(this._movie);

    body.classList.add('hide-overflow');

    this._filmDetailComponent.setClickHandler(() => {
      body.classList.remove('hide-overflow');
      this._filmDetailComponent.removeClickHandler();
      remove(this._filmDetailComponent);
    });

    this._filmDetailComponent.setWatchlistClickHandler(this._handlePopupWatchlistClick);
    this._filmDetailComponent.setWatchedClickHandler(this._handlePopupWatchedClick);
    this._filmDetailComponent.setFavoriteClickHandler(this._handlePopupFavoriteClick);

    if(prevFilmDetailComponent === null) {
      render(body, this._filmDetailComponent.getElement(), RenderPosition.BEFOREEND);
      return;
    }
    replace(this._filmDetailComponent, prevFilmDetailComponent);
    remove(prevFilmDetailComponent);
  }
}
