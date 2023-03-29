import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupConfig, { submitCallbackForm }) {
    super(popupSelector, popupConfig);
    this._formElement = this._popupItem.querySelector(popupConfig.popupFormSelector);
    this._formInputs = this._formElement.querySelectorAll('.popup__input');
    this._submitCallbackForm = submitCallbackForm;
  }

  // Получение данных с инпутов
  _getInputValues() {
    this._formValues = {};
    this._formInputs.forEach((inputElement) => {
      this._formValues[inputElement.name] = inputElement.value;
    });

    return this._formValues;
  }

  // Установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallbackForm(this._getInputValues());
    });
  }

  // Закрытие попапа
  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }
}
