import AbstractView from './abstract.js';

const createFilterItemTemplate = ({ name, count }) => {
  return `
    <a href="#watchlist" class="main-navigation__item">${ name } <span class="main-navigation__item-count">${ count }</span></a>
  `;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filterItem) => createFilterItemTemplate(filterItem)).join('');

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${ filterItemsTemplate }
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class Filter extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createFilterTemplate(this._filter);
  }
}
