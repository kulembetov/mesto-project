export default class Section {
  constructor(containerSelector, {renderer}) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Добавление новой карточки
  addItem(element) {
    this._container.prepend(element);
  }

  // Отрисовка всех карточек
  renderItem(userData, cardData) {
    return this._renderer(userData, cardData);
  }
}
