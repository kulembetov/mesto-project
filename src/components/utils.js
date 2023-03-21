
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

export { renderLoading, hideLoading };
