import FilmDetailView from '../views/film-details/film-details.js';

export const renderDetail = (film) => {
  const siteBody        = document.body;
  const siteMainElement = siteBody.querySelector('.main');
  siteBody.classList.add('hide-overflow');


  const filmDetailComponent = new FilmDetailView(film);

  filmDetailComponent.setClickHandler(() => {
    siteBody.classList.remove('hide-overflow');
    filmDetailComponent.getElement().remove();

    filmDetailComponent.removeClickHandler();
  });

  siteMainElement.appendChild(filmDetailComponent.getElement());
};
