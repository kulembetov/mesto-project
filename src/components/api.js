import { request } from './utils.js';

// Объект настроек

const settings = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: '7705f7d6-50a3-4e15-b4ba-203407e7d971',
    'Content-Type': 'application/json',
  },
};

// Получение данных профиля

const getProfileRequest = () => {
  return request(`${settings.baseUrl}/users/me`, {
    method: 'GET',
    headers: settings.headers,
  });
};

// Изменение данных профиля

const setProfileRequest = (nameInput, aboutInput) => {
  return request(`${settings.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      name: nameInput,
      about: aboutInput,
    }),
  });
};

// Обновление изображения профиля

const changeAvatarRequest = (linkInput) => {
  return request(`${settings.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      avatar: linkInput,
    }),
  });
};

// Получение карточек

const getCardsRequest = () => {
  return request(`${settings.baseUrl}/cards`, {
    method: 'GET',
    headers: settings.headers,
  });
};

// Добавление карточек

const addCardRequest = (titleInput, linkInput) => {
  return request(`${settings.baseUrl}/cards`, {
    method: 'POST',
    headers: settings.headers,
    body: JSON.stringify({
      name: titleInput,
      link: linkInput,
    }),
  });
};

// Удаление карточки

const removeCardRequest = (cardId) => {
  return request(`${settings.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  });
};

// Установка лайка

const setLikeRequest = (cardId) => {
  return request(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: settings.headers,
  });
};

// Снятие лайка

const removeLikeRequest = (cardId) => {
  return request(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  });
};

export {
  settings,
  getProfileRequest,
  setProfileRequest,
  changeAvatarRequest,
  getCardsRequest,
  addCardRequest,
  removeCardRequest,
  setLikeRequest,
  removeLikeRequest,
};
