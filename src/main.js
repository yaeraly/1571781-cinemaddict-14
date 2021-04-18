import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { renderFooterStatistic } from './utils/render-footer-stat.js';
import { FILM_COUNT } from './const.js';
import { renderFilmList } from './utils/render-film-list.js';
import { renderFilter } from './utils/render-filter.js';


const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filter = generateFilter(films);

renderFilter(filter);
renderFilmList(films);
renderFooterStatistic(FILM_COUNT);
