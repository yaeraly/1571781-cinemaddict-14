import AbstractView from './abstract';

export default class Smart extends AbstractView {
  restoreHandlers() {
    alert('абстрактный метод');
  }

  updateElement() {
    alert('обычный метод');
  }

  updateData() {
    alert('обычный метод');
  }
}
