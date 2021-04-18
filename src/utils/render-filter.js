import { render, RenderPosition } from './render.js';

import FilterView from '../views/filter.js';

export const renderFilter = (filters) => {
  render(document.querySelector('.main'), new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
};
