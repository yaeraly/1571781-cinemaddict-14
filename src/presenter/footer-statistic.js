import FooterStatisticView from '../views/footer-statistic.js';

import { render, RenderPosition } from '../utils/render.js';

export default class FooterStatistic {
  constructor(container) {
    this._container = container;
  }

  init(movies) {
    render(this._container, new FooterStatisticView(movies.length).getElement(), RenderPosition.BEFOREEND);
  }
}
