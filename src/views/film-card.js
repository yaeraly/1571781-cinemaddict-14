import dayjs from 'dayjs';
import { validateStringMaxLength } from '../util.js';

export const createFilmCardTemplate = ({ comments, film_info, user_details }) => {
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


  return `
    <article class="film-card">
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
    </article>
  `;
};
