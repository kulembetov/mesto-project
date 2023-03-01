import {
  settings
} from './variables.js';

// Показ сообщения об ошибке

const showInputError = (form, input, errorMessage, settings) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  error.classList.add(settings.errorClass);
  error.textContent = errorMessage;
};

// Скрытие сообщения об ошибке

const hideInputError = (form, input, settings) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  error.classList.remove(settings.errorClass);
  error.textContent = '';
};

// Валидация

function checkInputValidity(form, input, settings) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
}

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

// Изменение состояния кнопки отправки

const toggleButtonState = (inputs, button, settings) => {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  }
};

// Установка слушателей

const setEventListeners = (form, settings) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputs, button, settings);
  form.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputs, button, settings);
    }, 0);
  });
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputs, button, settings);
    });
  });
};

// Включение валидации и отключение стандартной браузерной

const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    form.setAttribute('novalidate', true);
  });
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, settings);
  });
};

export {
  enableValidation
};
