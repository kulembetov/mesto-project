import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, popupConfig, {submitCallbackForm}) {
    super(popupSelector, popupConfig);
    this._formElement = this._popupItem.querySelector(popupConfig.popupFormSelector);
    this._submitCallbackForm = submitCallbackForm;
  }

  setCard(card) {
    this._card = card
  }

  // Установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', () => {
      this._submitCallbackForm(this._card)
    });
  }
}
