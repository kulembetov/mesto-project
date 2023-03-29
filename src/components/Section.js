export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Добавление новой карточки
  addItem(element) {
    this._container.prepend(element);
  }

  // Отрисовка новой карточки
  renderNewItem() {
    this._renderer(this._items);
  }

  // Отрисовка всех карточек
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
