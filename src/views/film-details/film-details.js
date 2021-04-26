import dayjs from 'dayjs';

import CommentView from './initial/comments.js';
import NewCommentView from './initial/new-comment.js';

import AbstractView from '../abstract.js';

const createGenresTemplate = (genres) => {
  return genres.map((genre) => `
    <span class="film-details__genre">${genre}</span>
    `).join('');
};

const createFilmDetailTemplate = ({ comments, film_info, user_details }) => {
  const { title, alternative_title, total_rating, poster, age_rating, director, writers, actors, release, runtime, genre, description } = film_info;
  const { date, release_country } = release;
  const { watchlist, already_watched, favorite } = user_details;

  const numOfComments       = comments.length;
  const genreTemplate       = createGenresTemplate(genre);
  const genreTitle          = genre.length > 1 ? 'Genres' : 'Genre';
  const filmWriters         = writers.join(', ');
  const filmActors          = actors.join(', ');
  const releaseDate         = dayjs(date).format('DD MMMM YYYY');
  const duration            = `${runtime.$d.hours}h ${runtime.$d.minutes}m`;

  const watchlistClassName  = watchlist ? 'film-details__control-label--watchlist' : '';
  const watchedClassName    = already_watched ? 'film-details__control-label--watched' : '';
  const favoriteClassName   = favorite ? 'film-details__control-label--favorite' : '';

  const commentsTemplate    = new CommentView(comments).getTemplate();
  const newCommentTemplate  = new NewCommentView().getTemplate();


  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${ poster }" alt="">

              <p class="film-details__age">${ age_rating }</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${ title }</h3>
                  <p class="film-details__title-original">Original: ${ alternative_title }</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${ total_rating }</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${ director }n</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${ filmWriters }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${ filmActors }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${ releaseDate }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${ duration }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${ release_country }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${ genreTitle }</td>
                  <td class="film-details__cell">
                    ${ genreTemplate }
                </tr>
              </table>

              <p class="film-details__film-description">
                ${ description }
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label ${ watchlistClassName }">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label ${ watchedClassName }">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label ${ favoriteClassName }">Add to favorites</label>
          </section>

        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${ numOfComments }</span></h3>
            ${ commentsTemplate }
            ${ newCommentTemplate }
          </section>
        </div>
      </form>
    </section>`;
};

export default class FilmDetail extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler                = this._clickHandler.bind(this);
    this._clickWatchlistClickHandler  = this._clickWatchlistClickHandler.bind(this);
    this._clickWatchedClickHandler    = this._clickWatchedClickHandler.bind(this);
    this._clickFavoriteClickHandler   = this._clickFavoriteClickHandler.bind(this);
    this._onEscKeyDown                = this._onEscKeyDown.bind(this);
  }

  getTemplate() {
    return createFilmDetailTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.clickPoster();
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._callback.clickPoster();
    }
  }

  _clickWatchlistClickHandler() {
    this._callback.clickWatchlist();
  }

  _clickWatchedClickHandler() {
    this._callback.clickWatched();
  }

  _clickFavoriteClickHandler() {
    this._callback.clickFavorite();
  }

  setClickHandler(callback) {
    this._callback.clickPoster = callback;
    document.addEventListener('keydown', this._onEscKeyDown);
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector('#watchlist').addEventListener('click', this._clickWatchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement().querySelector('#watched').addEventListener('click', this._clickWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector('#favorite').addEventListener('click', this._clickFavoriteClickHandler);
  }

  removeClickHandler() {
    this.getElement().querySelector('.film-details__close-btn').removeEventListener('click', this._clickHandler);
    this.getElement().querySelector('#watchlist').removeEventListener('click', this._clickWatchlistClickHandler);
    this.getElement().querySelector('#watched').removeEventListener('click', this._clickWatchedClickHandler);
    this.getElement().querySelector('#favorite').removeEventListener('click', this._clickFavoriteClickHandler);
    document.removeEventListener('keydown', this._onEscKeyDown);
  }
}
