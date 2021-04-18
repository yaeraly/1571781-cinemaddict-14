import AbstractView from './abstract.js';

const createFooterStatisticTemplate = (countFilm) => {
  return `<p>${countFilm} movies inside</p>`;
};

export default class FooterStatistic extends AbstractView {
  constructor(countFilm) {
    super();
    this._countFilm = countFilm;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._countFilm);
  }
}
