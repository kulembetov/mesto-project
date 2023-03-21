// Показ сообщения об ошибке
export default class FormValidator {
  constructor(
    {
      submitButtonSelector,
      inputErrorClass,
      errorClass,
      inactiveButtonClass,
      inputSelector,
      formSelector,
    },
    form
  ) {
    this._form = form;
    this._button = form.querySelector(submitButtonSelector);
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputSelector = inputSelector;
    this._formSelector = formSelector;
  }

  // Показать сообщение об ошибке
  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = errorMessage;
  }

  // Скрытие сообщения об ошибке
  _hideInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
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
  _toggleButtonState(inputs) {
    if (this._hasInvalidInput(inputs)) {
      this._button.disabled = true;
      this._button.classList.add(this._inactiveButtonClass);
    } else {
      this._button.disabled = false;
      this._button.classList.remove(this._inactiveButtonClass);
    }
  }

  // Установка слушателей
  _setEventListeners() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._toggleButtonState(inputs);
    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState(inputs);
      }, 0);
    });
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs);
      });
    });
  }

  // Включение валидации и отключение стандартной браузерной
  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
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

  // Сброс валидации
  resetValidation() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));

    inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState(inputs);
  }
}
