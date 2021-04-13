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
import FilmDetailView from './views/film-details/film-details.js';
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


const renderFilmDetail = (film) => {
  siteBody.classList.add('hide-overflow');
  const filmDetailPopupElement = new FilmDetailView(film).getElement();
  siteMainElement.appendChild(filmDetailPopupElement);
  const closePopupButton = filmDetailPopupElement.querySelector('.film-details__close-btn');

  const сlosePopup = () => {
    siteMainElement.removeChild(filmDetailPopupElement);
    closePopupButton.removeEventListener('click', сlosePopup);
    document.removeEventListener('keydown', onEscKeyDown);
    siteBody.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      сlosePopup();
    }
  };

  document.addEventListener('keydown', onEscKeyDown);
  closePopupButton.addEventListener('click', сlosePopup);
};

const renderFilm = (filmContainer, film) => {
  const cardComponent = new CardView(film);

  const addClickPosterHandler = () => {
    renderFilmDetail(film);
  };

  cardComponent.getElement().querySelector('.film-card__poster').addEventListener('click', addClickPosterHandler);
  cardComponent.getElement().querySelector('.film-card__title').addEventListener('click', addClickPosterHandler);
  cardComponent.getElement().querySelector('.film-card__comments').addEventListener('click', addClickPosterHandler);

  render(filmContainer, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilms = (films, filter) => {
  const filmFilter = new FilterView(filter);
  const filmComponent = new FilmView();
  const filmListComponent = new FilmListView();
  const filmListContainerComponent = new FilmListContainerView();
  const userProfileComponent = new UserProfileView();
  const filmSortComponent = new SortView();

  render(siteMainElement, filmFilter.getElement(), RenderPosition.BEFOREEND);
  render(siteMainElement, filmSortComponent.getElement(), RenderPosition.BEFOREEND);
  render(siteMainElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

  if (films.length === 0) {
    render(filmComponent.getElement(), new NoFilmListView().getElement(), RenderPosition.AFTERBEGIN);
    filmSortComponent.getElement().remove();
    return;
  }

  render(siteHeaderElement, userProfileComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmListComponent.getElement(), filmListContainerComponent.getElement(), RenderPosition.BEFOREEND);

  films
    .slice(0, Math.min(films.length, FILM_COUNT_PER_STEP))
    .forEach((film) => renderFilm(filmListContainerComponent.getElement(), film));

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    const showMoreButtonElement   = showMoreButtonComponent.getElement();

    render(filmListComponent.getElement(), showMoreButtonElement, RenderPosition.BEFOREEND);

    const showMoreFilms = (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmListContainerComponent.getElement(), film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        showMoreButtonElement.removeEventListener('click', showMoreFilms);
        showMoreButtonElement.remove();
        showMoreButtonComponent.removeElement();
      }
    };

    showMoreButtonElement.addEventListener('click', showMoreFilms);
  }
};

render(footerStatElement, new FooterStatisticView(FILM_COUNT).getElement(), RenderPosition.BEFOREEND);

renderFilms(films, filter);
