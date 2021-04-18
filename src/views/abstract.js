import { createElement } from '../utils/common.js';

export default class Abstract {
  constructor() {
    if(new.target === Abstract) {
      throw new Error('Создавать объекты напрямую из класса Abstract нельзя. От класса Abstract можно только наследоваться');
    }
    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Должен быть реализован метод: ${this.getTemplate.name}`);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
