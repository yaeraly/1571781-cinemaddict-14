import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { FILM_COUNT } from './const.js';

import UserProfilePresenter from './presenter/user-profile.js';
import SortPresenter from './presenter/sort.js';
import MovieListPresenter from './presenter/movie-list.js';
import FooterStatisticPresenter from './presenter/footer-statistic.js';

const siteBody          = document.body;
const siteHeaderElement = siteBody.querySelector('.header');
const siteMainElement   = siteBody.querySelector('.main');
const siteFooterElement = siteBody.querySelector('.footer');


const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filter = generateFilter(films);

const userProfilePresenter = new UserProfilePresenter(siteHeaderElement);
const sortPresenter = new SortPresenter(siteMainElement);
const movieListPresenter = new MovieListPresenter(siteMainElement);
const footerStatisticPresenter = new FooterStatisticPresenter(siteFooterElement);


userProfilePresenter.init(films, filter);
sortPresenter.init(films);
movieListPresenter.init(films);
footerStatisticPresenter.init(films);
