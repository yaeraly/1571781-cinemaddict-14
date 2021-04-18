import dayjs from 'dayjs';

import CommentView from './initial/comments.js';
import FilmControlView from './initial/film-control.js';
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

  const numOfComments       = comments.length;
  const genreTemplate       = createGenresTemplate(genre);
  const genreTitle          = genre.length > 1 ? 'Genres' : 'Genre';
  const filmWriters         = writers.join(', ');
  const filmActors          = actors.join(', ');
  const releaseDate         = dayjs(date).format('DD MMMM YYYY');
  const duration            = `${runtime.$d.hours}h ${runtime.$d.minutes}m`;

  const filmControlTemplate = new FilmControlView(user_details).getTemplate();
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
          ${ filmControlTemplate }
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
    this._clickHandler = this._clickHandler.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
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

  setClickHandler(callback) {
    this._callback.clickPoster = callback;
    document.addEventListener('keydown', this._onEscKeyDown);
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }

  removeClickHandler() {
    this.getElement().querySelector('.film-details__close-btn').removeEventListener('click', this._clickHandler);
    document.removeEventListener('keydown', this._onEscKeyDown);
  }
}
