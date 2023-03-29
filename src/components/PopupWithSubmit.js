import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, popupConfig) {
    super(popupSelector, popupConfig);
    this._formElement = this._popupItem.querySelector('.popup__form');
  }

  // Открытие попапа
  openPopup(card) {
    super.openPopup();
    this._element = card;
  }

  // Установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
}
