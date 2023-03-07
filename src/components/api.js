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
  return fetch(`${settings.baseUrl}/users/me`, {
    method: 'GET',
    headers: settings.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Изменение данных профиля

const setProfileRequest = (nameInput, aboutInput) => {
  return fetch(`${settings.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      name: nameInput,
      about: aboutInput,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
};

// Обновление изображения профиля

const changeAvatarRequest = (linkInput) => {
  return fetch(`${settings.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      avatar: linkInput,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Получение карточек

const getCardsRequest = () => {
  return fetch(`${settings.baseUrl}/cards`, {
    method: 'GET',
    headers: settings.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Добавление карточек

const addCardRequest = (titleInput, linkInput) => {
  return fetch(`${settings.baseUrl}/cards`, {
    method: 'POST',
    headers: settings.headers,
    body: JSON.stringify({
      name: titleInput,
      link: linkInput,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Удаление карточки

const removeCardRequest = (cardId) => {
  return fetch(`${settings.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Установка лайка

const setLikeRequest = (cardId) => {
  return fetch(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: settings.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Снятие лайка

const removeLikeRequest = (cardId) => {
  return fetch(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
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
