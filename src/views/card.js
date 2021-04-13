import dayjs from 'dayjs';
import { createElement, render, RenderPosition } from '../util.js';
import { validateStringMaxLength } from '../util.js';
import FilmDetailView from './film-details/film-details.js';

const createCardTemplate = ({ comments, film_info, user_details }) => {
  const { title, total_rating, poster, release, runtime, genre, description} = film_info;
  const { watchlist, already_watched, favorite } = user_details;
  const { date } = release;

  const numOfComments       = comments.length;
  const filmGenre           = genre.join(', ');
  const releaseDate         = dayjs(date).format('YYYY');
  const duration            = `${runtime.$d.hours}h ${runtime.$d.minutes}m`;
  const watchlistClassName  = watchlist ? 'film-card__controls-item--active' : '';
  const watchedClassName    = already_watched ? 'film-card__controls-item--active' : '';
  const favoriteClassName   = favorite ? 'film-card__controls-item--active' : '';
  const shortDescription    = validateStringMaxLength(description) ? description.slice(0, 139) + '...' : description;


  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${total_rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${filmGenre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${numOfComments} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
      </div>
    </article>`;
};

const renderFilm = (film, template) => {
  const cardComponent = template;
  const filmContainer = document.querySelector('.films-list__container');

  const showPopup = () => {
    new FilmDetailView(film).render();
  };

  cardComponent.querySelector('.film-card__poster').addEventListener('click', showPopup);
  cardComponent.querySelector('.film-card__title').addEventListener('click', showPopup);
  cardComponent.querySelector('.film-card__comments').addEventListener('click', showPopup);

  render(filmContainer, cardComponent, RenderPosition.BEFOREEND);
};

export default class Card {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  render() {
    return renderFilm(this._film, this.getElement());
  }
}
