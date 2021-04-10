import { render } from './util.js';
import { createSortFilmTemplate } from './views/film-sort.js';
import { createFilmListTemplate } from './views/film-list.js';
import { createFilmCardTemplate } from './views/film-card.js';
import { createUserProfileTemplate } from './views/user-profile.js';
import { createFilterTemplate } from './views/filter.js';
import { createShowMoreButtonTemplate } from './views/show-more-button.js';
import { createFilmFooterStatisticTemplate } from './views/film-footer-statistic.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
// import { generateFilter } from './mock/filter.js';

import { createFilmDetailTemplate } from './views/film-details/film-details.js';

const FILM_COUNT = 30;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filter = generateFilter(films);

const headerContainer = document.querySelector('header');
const mainContainer   = document.querySelector('main');
const footerContainer = document.querySelector('footer');
const footerStatistic = footerContainer.querySelector('.footer__statistics');

const filmNameElements  = mainContainer.querySelectorAll('.film-card__title');
const commentsElements  = mainContainer.querySelectorAll('.film-card__comments');


render(headerContainer, 'beforeend', createUserProfileTemplate());
render(mainContainer, 'beforeend', createFilterTemplate(filter));
render(mainContainer, 'beforeend', createSortFilmTemplate());
render(mainContainer, 'beforeend', createFilmListTemplate());
render(footerStatistic, 'beforeend', createFilmFooterStatisticTemplate(films));

const filmListContainer = mainContainer.querySelector('.films-list__container');

const createEventListener = (element, film) => {
  const addClickPosterHandler = () => {
    render(footerContainer, 'afterend', createFilmDetailTemplate(film));
    const popupContainer    = document.querySelector('.film-details');
    const closePopupButton  = popupContainer.querySelector('.film-details__close-btn');

    const addClosePopupButtonHandler = () => {
      closePopupButton.removeEventListener('click', addClosePopupButtonHandler);
      popupContainer.remove();
    };

    closePopupButton.addEventListener('click', addClosePopupButtonHandler);
  };

  element.addEventListener('click', addClickPosterHandler);
};

const renderFilm = (films) => {
  const filmTemplates = films.map((film) => createFilmCardTemplate(film)).join(''); // Collect All Film Cards

  render(filmListContainer, 'beforeend', filmTemplates);                            // Draw them in HTML


  const posterElements = mainContainer.querySelectorAll('.film-card__poster');
  for (let i = 0; i < posterElements.length; i++) {
    createEventListener(posterElements[i], films[i]);
  }
};

renderFilm(films.slice(0, FILM_COUNT_PER_STEP));

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;

  render(mainContainer.querySelector('.films-list'), 'beforeend', createShowMoreButtonTemplate());

  const showMoreButton = mainContainer.querySelector('.films-list__show-more');

  const addShowMoreButtonHandler = (evt) => {
    evt.preventDefault();
    renderFilm(films.slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP));

    const posterElements = mainContainer.querySelectorAll('.film-card__poster');

    for (let i = renderedFilmCount; i < posterElements.length; i++) {
      createEventListener(posterElements[i], films[i]);
    }


    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
      showMoreButton.removeEventListener('click', addShowMoreButtonHandler);
    }
  };

  showMoreButton.addEventListener('click', addShowMoreButtonHandler);
}
