// Проверка ответа от сервера

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

// Визуализация запроса

const renderLoading = (isLoading, evt) => {
  const button = evt.target.querySelector('.popup__button-submit');
  if (isLoading) {
    button.textContent = button.dataset.saving;
  } else {
    button.textContent = button.dataset.save;
  }
};

// Скрытие иконки загрузки страницы

const hideLoading = () => {
  const loading = document.querySelector('.loading');
  loading.classList.remove('loading_active');
};

export { checkResponse, request, renderLoading, hideLoading };
