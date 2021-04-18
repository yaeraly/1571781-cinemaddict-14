import { render, RenderPosition } from '../utils/render.js';
import FooterStatisticView from '../views/footer-statistic.js';


export const renderFooterStatistic = (filmCount) => {
  const footerStatElement = document.querySelector('.footer__statistics');
  render(footerStatElement, new FooterStatisticView(filmCount).getElement(), RenderPosition.BEFOREEND);
};
