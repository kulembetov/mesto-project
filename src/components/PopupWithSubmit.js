import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, popupConfig, {submitCallbackForm}) {
    super(popupSelector, popupConfig);
    this._formElement = this._popupItem.querySelector(popupConfig.popupFormSelector);
    this._submitCallbackForm = submitCallbackForm;
    this._submitButton = this._popupItem.querySelector(popupConfig.popupSubmitButtonSelector)
  }

  // Установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', () => {
      this._submitCallbackForm()
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._submitButton.dataset.saving;
    } else {
      this._submitButton.textContent = this._submitButton.dataset.save;
    }
  }
}
