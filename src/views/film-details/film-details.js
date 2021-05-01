import dayjs from 'dayjs';

import CommentView from './initial/comments.js';

import AbstractView from '../abstract.js';

const createGenresTemplate = (genres) => {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
};


const createFilmDetailTemplate = ({ comments, film_info, user_details, emotion = 'smile', isSmileChecked, isSleepingChecked, isPukeChecked, isAnglryChecked }) => {
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

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
                <img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isSmileChecked ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isSleepingChecked ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isPukeChecked ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isAnglryChecked ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`;
};

export default class FilmDetail extends AbstractView {
  constructor(film) {
    super();
    this._data = FilmDetail.parseMovieToData(film);

    this._clickHandler                = this._clickHandler.bind(this);
    this._clickWatchlistClickHandler  = this._clickWatchlistClickHandler.bind(this);
    this._clickWatchedClickHandler    = this._clickWatchedClickHandler.bind(this);
    this._clickFavoriteClickHandler   = this._clickFavoriteClickHandler.bind(this);
    this._onEscKeyDown                = this._onEscKeyDown.bind(this);


    this._clickSmileClickHandler     = this._clickSmileClickHandler.bind(this);


    this._setInnerHandlers();
  }

  getTemplate() {
    return createFilmDetailTemplate(this._data);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.clickPoster();
    FilmDetail.parseDataToMovie(this._data);
  }

  _onEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._callback.clickPoster();
      FilmDetail.parseDataToMovie(this._data);
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

  _clickSmileClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value,
    });

    this.getElement().querySelector('.film-details__add-emoji-label').scrollIntoView();
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('#watchlist').addEventListener('click', this._clickWatchlistClickHandler);
    this.getElement().querySelector('#watched').addEventListener('click', this._clickWatchedClickHandler);
    this.getElement().querySelector('#favorite').addEventListener('click', this._clickFavoriteClickHandler);
    document.addEventListener('keydown', this._onEscKeyDown);

    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._clickSmileClickHandler);
  }

  static parseMovieToData(movie) {
    return Object.assign(
      {},
      movie,
      {
        emotion: this._emotion,
      },
    );
  }

  static parseDataToMovie(data) {
    data = Object.assign({}, data);

    delete data.emotion;

    return data;
  }
}
