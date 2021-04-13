import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { render, RenderPosition } from './util.js';


import UserProfileView from './views/user-profile.js';
import FilterView from './views/filter.js';
import SortView from './views/sort.js';
import FilmView from './views/films/film.js';
import FilmListView from './views/films/film-list.js';
import FilmListContainerView from './views/films/film-list-container.js';
import NoFilmListView from './views/films/no-film.js';
import CardView from './views/card.js';
import ShowMoreButtonView from './views/show-more-button.js';
import FooterStatisticView from './views/footer-statistic.js';

const FILM_COUNT = 10;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filter = generateFilter(films);

const siteBody          = document.body;
const siteHeaderElement = siteBody.querySelector('.header');
const siteMainElement   = siteBody.querySelector('.main');
const siteFooterElement = siteBody.querySelector('.footer');
const footerStatElement = siteFooterElement.querySelector('.footer__statistics');

const userProfileComponent  = new UserProfileView();
const filterComponent       = new FilterView(filter);
const sortComponent         = new SortView();
const filmComponent         = new FilmView();
const filmListComponent     = new FilmListView();
const filmListContainer     = new FilmListContainerView();
const noFilmListComponent   = new NoFilmListView();
const footerStatComponent   = new FooterStatisticView(FILM_COUNT);

render(siteHeaderElement, userProfileComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filterComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, sortComponent.getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
render(filmComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);
render(footerStatElement, footerStatComponent.getElement(), RenderPosition.BEFOREEND);


const renderFilms = (films) => {
  if (films.length === 0) {
    render(filmComponent.getElement(), noFilmListComponent.getElement(), RenderPosition.AFTERBEGIN);
    sortComponent.getElement().remove();
    return;
  }

  render(filmListComponent.getElement(), filmListContainer.getElement(), RenderPosition.BEFOREEND);

  films
    .slice(0, Math.min(films.length, FILM_COUNT_PER_STEP))
    .forEach((film) => new CardView(film).render());

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    const showMoreButtonElement   = showMoreButtonComponent.getElement();

    render(filmListComponent.getElement(), showMoreButtonElement, RenderPosition.BEFOREEND);

    const showMoreFilms = (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => new CardView(film).render());

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        showMoreButtonElement.removeEventListener('click', showMoreFilms);
        showMoreButtonElement.remove();
      }
    };

    showMoreButtonElement.addEventListener('click', showMoreFilms);
  }
};

renderFilms(films);
