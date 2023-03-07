import '../src/index.css';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/modal.js';
import {
  errorImage,
  settings,
  user,
  cards,
  popupProfile,
  popupImage,
  popupAvatar,
  editButton,
  addButton,
  closeButtonList,
  profileForm,
  imageForm,
  avatarForm,
  nameInput,
  aboutInput,
  titleInput,
  imageLinkInput,
  avatarLinkInput,
  avatarElement,
  nameElement,
  aboutElement,
} from './components/variables.js';

import { createCard, addCard, addCardList } from './components/card.js';

import {
  getProfileRequest,
  setProfileRequest,
  changeAvatarRequest,
  getCardsRequest,
  addCardRequest,
} from './components/api.js';

import { renderLoading, hideLoading } from './components/utils';

// Получение данных с сервера

const onLoad = () => {
  new Promise((res, rej) => {
    window.onload = res;
    window.onerror = rej;
  })
    .then(() => {
      return getProfileRequest().then((profile) => {
        nameElement.textContent = profile.name;
        aboutElement.textContent = profile.about;
        avatarElement.src = profile.avatar;
        user.id = profile._id;
        user.name = profile.name;
      });
    })
    .then(() => {
      getCardsRequest().then((item) => {
        addCardList(item, cards);
        hideLoading();
      });
    })
    .catch((rej) => {
      console.log(rej);
    });
};

// Обработчик формы профиля

const handleProfileForm = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  setProfileRequest(nameInput.value, aboutInput.value)
    .then((res) => {
      nameElement.textContent = res.name;
      aboutElement.textContent = res.about;
    })
    .finally(() => {
      renderLoading(false, evt);
      closePopup(popupProfile);
    });
};

// Обработчик формы с добавлением картинок

const handleImageForm = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  addCardRequest(titleInput.value, imageLinkInput.value)
    .then((card) => {
      addCard(createCard(card), cards);
    })
    .finally(() => {
      renderLoading(false, evt);
      closePopup(popupImage);
      evt.target.reset();
    });
};

// Обработчик формы с изменением изображения пользователя

const handleAvatarForm = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  changeAvatarRequest(avatarLinkInput.value)
    .then((res) => {
      avatarElement.src = res.avatar;
    })
    .finally(() => {
      renderLoading(false, evt);
      closePopup(popupAvatar);
      evt.target.reset();
    });
};

// Нахождение попапа, внутри которого находится крестик и его закрытие

closeButtonList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  });
});

// Открытие попапа с изменением информации в профиле

editButton.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  aboutInput.value = aboutElement.textContent;
  openPopup(popupProfile);
});

// Открытие попапа с добавлением картинок

addButton.addEventListener('click', () => {
  openPopup(popupImage);
});

// Открытие попапа с изменением изображения профиля

avatarElement.addEventListener('click', () => {
  openPopup(popupAvatar);
});

// Добавление изображения с ошибкой

avatarElement.addEventListener('error', () => {
  avatarElement.setAttribute('src', errorImage);
});

// Отправка формы редактирования профиля

profileForm.addEventListener('submit', handleProfileForm);

// Отправка формы добавления изображения

imageForm.addEventListener('submit', handleImageForm);

// Отправка формы изменения изображения профиля

avatarForm.addEventListener('submit', handleAvatarForm);

// Валидация форм

enableValidation(settings);

// Вызов функции получения данных с сервера

onLoad();
