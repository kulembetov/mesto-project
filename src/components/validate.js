// Показ сообщения об ошибке
export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }
  // Показать сообщение об ошибке
  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    error.classList.add(this._settings.errorClass);
    error.textContent = errorMessage;
  }

  // Скрытие сообщения об ошибке
  _hideInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    error.classList.remove(this._settings.errorClass);
    error.textContent = "";
  }

  // Валидация
  _checkInputValidity(input) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  // Изменение состояния кнопки отправки
  _toggleButtonState(inputs, button) {
    if (this._hasInvalidInput(inputs)) {
      button.disabled = true;
      button.classList.add(this._settings.inactiveButtonClass);
    } else {
      button.disabled = false;
      button.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  // Установка слушателей
  _setEventListeners() {
    const inputs = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    const button = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleButtonState(inputs, button);
    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState(inputs, button);
      }, 0);
    });
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, button);
      });
    });
  }

  // Включение валидации и отключение стандартной браузерной
  enableValidation() {
    const forms = Array.from(
      document.querySelectorAll(this._settings.formSelector)
    );
    forms.forEach((form) => {
      form.setAttribute("novalidate", true);
    });
    forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }

  resetValidation() {
    const inputs = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    const button = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState(inputs, button);
  }
}
