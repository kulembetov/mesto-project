import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupConfig, { submitCallbackForm }) {
    super(popupSelector, popupConfig);
    this._formElement = this._popupItem.querySelector(".popup__form");
    this._formInputs = this._formElement.querySelectorAll(".popup__input");
    this._submitButton = this._popupItem.querySelector(".popup__button-submit");
    this._submitCallbackForm = submitCallbackForm;
  }

  _getInputValues() {
    this._formValues = {};
    this._formInputs.forEach((inputElement) => {
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

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._submitButton.dataset.saving;
    } else {
      this._submitButton.textContent = this._submitButton.dataset.save;
    }
  }
}
