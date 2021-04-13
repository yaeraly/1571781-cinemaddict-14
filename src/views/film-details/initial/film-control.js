import { createElement } from '../../../util.js';

const createFilmControlTemplate = ({ watchlist, already_watched, favorite }) => {

  const watchlistClassName  = watchlist ? 'film-details__control-label--watchlist' : '';
  const watchedClassName    = already_watched ? 'film-details__control-label--watched' : '';
  const favoriteClassName   = favorite ? 'film-details__control-label--favorite' : '';

  return `<section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
      <label for="watchlist" class="film-details__control-label ${ watchlistClassName }">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
      <label for="watched" class="film-details__control-label ${ watchedClassName }">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
      <label for="favorite" class="film-details__control-label ${ favoriteClassName }">Add to favorites</label>
    </section>`;
};


export default class FilmControl {
  constructor(filmDetail) {
    this._element = null;
    this._filmDetail = filmDetail;
  }

  getTemplate() {
    return createFilmControlTemplate(this._filmDetail);
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
}
