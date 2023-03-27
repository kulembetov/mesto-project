import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallbackForm) {
    super(popupSelector);
    this._formElement = this._popupItem.querySelector(".popup__form");
    this._submitCallbackForm = submitCallbackForm;
  }

  _getInputValues() {
    const inputList = this._formElement.elements;
    this._formValues = {};
    inputList.forEach((inputElement) => {
      this._formValues[inputElement.name] = inputElement.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallbackForm(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }
}
