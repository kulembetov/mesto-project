// Скрытие иконки загрузки страницы
const hideLoading = () => {
  const loading = document.querySelector('.loading');
  loading.classList.remove('loading_active');
};

export { hideLoading };
