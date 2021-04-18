import { render, RenderPosition } from './render.js';
import { FILM_COUNT, FILM_COUNT_PER_STEP } from '../const.js';
import { renderDetail } from '../utils/render-detail.js';

import ShowMoreButtonView from '../views/show-more-button.js';
import CardView from '../views/card.js';
import UserProfileView from '../views/user-profile.js';
import SortView from '../views/sort.js';
import FilmListView from '../views/films/film-list.js';
import FilmView from '../views/films/film.js';
import FilmListContainerView from '../views/films/film-card-container.js';


const isFilmAvailable = (FILM_COUNT > 0) ? true : false;

const filmListComponent     = new FilmListView(isFilmAvailable);
const filmComponent         = new FilmView();
const filmListContainer     = new FilmListContainerView();

const siteBody          = document.body;
const siteHeaderElement = siteBody.querySelector('.header');
const siteMainElement   = siteBody.querySelector('.main');

export const renderFilmList = (films) => {
  render(siteMainElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

  if (films.length === 0) {
    render(filmComponent.getElement(), new FilmListView(isFilmAvailable).getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
  render(filmComponent.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);
  render(filmComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmListComponent.getElement(), filmListContainer.getElement(), RenderPosition.BEFOREEND);

  const firstFiveFilms = films.slice(0, Math.min(films.length, FILM_COUNT_PER_STEP));
  firstFiveFilms.forEach((film) => {
    const cardComponent = new CardView(film);
    cardComponent.setClickHandler(() => renderDetail(film));
    render(filmListContainer.getElement(), cardComponent.getElement(), RenderPosition.BEFOREEND);
  });

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();

    render(filmListComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      const extraFiveFilms = films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP);
      extraFiveFilms.forEach((film) => {
        const cardComponent = new CardView(film);
        cardComponent.setClickHandler(() => renderDetail(film));
        render(filmListContainer.getElement(), cardComponent.getElement(), RenderPosition.BEFOREEND);
      });

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeClickHandler();
        showMoreButtonComponent.removeElement();
      }
    });
  }
};
