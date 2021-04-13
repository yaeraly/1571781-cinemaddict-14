import { createElement } from '../util.js';

const createFooterStatisticTemplate = (countFilm) => {
  return `<p>${countFilm} movies inside</p>`;
};

export default class FooterStatistic {
  constructor(countFilm) {
    this._element = null;
    this._countFilm = countFilm;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._countFilm);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
