import '../src/index.css';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/modal.js';
import {
  settings,
  popupProfile,
  popupImage,
  popupAvatar,
  profileButtonEdit,
  profileButtonAdd,
  buttonCloseList,
  profileForm,
  imageForm,
  avatarForm,
  nameInput,
  infoInput,
  titleInput,
  profileAvatar,
  profileName,
  profileInfo,
  imageLinkInput,
  avatarLinkInput,
  listCard,
} from './components/variables.js';

import { createCard } from './components/card.js';

// Обработчик формы с добавлением информации в профиль

const handleProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupProfile);
}

// Обработчик формы с добавлением картинок

const handleImageForm = (evt) => {
  evt.preventDefault();
  const title = titleInput.value;
  const link = imageLinkInput.value;
  listCard.prepend(createCard(link, title));
  evt.target.reset();
  closePopup(popupImage);
}

// Обработчик формы с изменением изображения пользователя

const handleAvatarForm = (evt) => {
  evt.preventDefault();
  const link = avatarLinkInput.value;
  profileAvatar.src = link;
  evt.target.reset();
  closePopup(popupAvatar);
}

// Нахождение попапа, внутри которого находится крестик и его закрытие

buttonCloseList.forEach(function (button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', function () {
    closePopup(popup);
  });
});

// Открытие попапа с изменением информации в профиле

profileButtonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
  openPopup(popupProfile);
});

// Открытие попапа с добавлением картинок

profileButtonAdd.addEventListener('click', () => {
  openPopup(popupImage);
});

// Открытие попапа с изменением изображения профиля

profileAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
});

// Отправка формы редактирования профиля

profileForm.addEventListener('submit', handleProfileForm);

// Отправка формы добавления изображения

imageForm.addEventListener('submit', handleImageForm);

// Отправка формы изменения изображения профиля

avatarForm.addEventListener('submit', handleAvatarForm);

// Валидация форм

enableValidation(settings);
