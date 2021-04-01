import { createSortFilmTemplate } from './view/film-sort.js';
import { createFilmListTemplate } from './view/film-list.js';
import { createFilmCardTemplate } from './view/film-card.js';
import { createUserProfileTemplate } from './view/user-profile.js';
import { createFilmNavigationTemplate } from './view/film-navigation.js';
import { createShowMoreButtonTemplate } from './view/show-more-button.js';
import { createFilmFooterStatisticTemplate } from './view/film-footer-statistic.js';


const headerContainer = document.querySelector('header');
const mainContainer   = document.querySelector('main');
const footerContainer = document.querySelector('footer');
const footerStatistic = footerContainer.querySelector('.footer__statistics');

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

render(headerContainer, 'beforeend', createUserProfileTemplate());
render(mainContainer, 'beforeend', createFilmNavigationTemplate());
render(mainContainer, 'beforeend', createSortFilmTemplate());
render(mainContainer, 'beforeend', createFilmListTemplate());
render(footerStatistic, 'beforeend', createFilmFooterStatisticTemplate());

const filmListContainer = mainContainer.querySelectorAll('.films-list__container');

for(let i = 0; i < 3; i++) {
  if (i < 1) {
    for(let j = 0; j < 5; j++) {
      render(filmListContainer[0], 'beforeend', createFilmCardTemplate());
    }
  } else if (i < 2) {
    for(let j = 0; j < 2; j++) {
      render(filmListContainer[1], 'beforeend', createFilmCardTemplate());
    }
  } else {
    for(let j = 0; j < 2; j++) {
      render(filmListContainer[2], 'beforeend', createFilmCardTemplate());
    }
  }
}

render(mainContainer.querySelector('.films-list'), 'beforeend', createShowMoreButtonTemplate());


