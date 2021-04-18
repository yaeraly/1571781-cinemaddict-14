import AbstractView from '../abstract.js';

const createFilmsListTemplate = (isFilmAvailable) => {
  const visuallyHiddenClassName = isFilmAvailable ? 'visually-hidden' : '';
  const titleText = isFilmAvailable ? 'All movies. Upcoming' : 'There are no movies in our database';

  return `<section class="films-list">
      <h2 class="films-list__title ${ visuallyHiddenClassName }">${ titleText }</h2>
    </section>`;
};

export default class FilmList extends AbstractView {
  constructor(isFilmAvailable) {
    super();
    this._isFilmAvailable = isFilmAvailable;
  }
  getTemplate() {
    return createFilmsListTemplate(this._isFilmAvailable);
  }
}
