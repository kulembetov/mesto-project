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
    this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
    this._formSelector = formSelector;
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
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

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  // Изменение состояния кнопки отправки
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._button.disabled = true;
      this._button.classList.add(this._inactiveButtonClass);
    } else {
      this._button.disabled = false;
      this._button.classList.remove(this._inactiveButtonClass);
    }
  }

  // Установка слушателей
  _setEventListeners() {
    this._toggleButtonState();
    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Включение валидации и отключение стандартной браузерной
  enableValidation() {
    this._formList.forEach((form) => {
      form.setAttribute("novalidate", true);
    });
    this._formList.forEach((form) => {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }

  // Сброс валидации
  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
}
