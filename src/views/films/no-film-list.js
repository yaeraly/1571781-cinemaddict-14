import AbstractView from '../abstract.js';

const createNoFilmsListTemplate = () => {
  return `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`;
};

export default class NoFilmList extends AbstractView {
  getTemplate() {
    return createNoFilmsListTemplate();
  }
}
