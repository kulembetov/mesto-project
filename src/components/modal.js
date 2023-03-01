import {
  popupImageZoom,
  buttonCloseList,
  imageZoom,
  captionZoom,
} from '../components/variables.js';

// Универсальное открытие и закрытие попапа при нажатии на крестик, ESC, оверлей

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('mousedown', closePopupMousedown);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('mousedown', closePopupMousedown);
}

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const closePopupMousedown = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

// Создание попапа с открытым изображанием

const createPopupZoomImage = (link, title) => {
  imageZoom.src = link;
  imageZoom.alt = title;
  captionZoom.textContent = title;
  openPopup(popupImageZoom);
}

// Нахождение попапа, внутри которого находится крести и его закрытие

buttonCloseList.forEach(function(button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', function() {
    closePopup(popup);
  });
});

export {
  openPopup,
  closePopup,
  createPopupZoomImage
};
