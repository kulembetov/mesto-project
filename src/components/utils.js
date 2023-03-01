import {
  popupProfile,
  popupImage,
  popupAvatar,
  nameInput,
  infoInput,
  titleInput,
  imageLinkInput,
  avatarLinkInput,
  profileAvatar,
  profileName,
  profileInfo,
  listCard,
} from '../components/variables.js';

import { closePopup } from '../components/modal.js';

import { createCard } from '../components/card.js';

// Отмена отправки формы с добавлением информации в профиль

function cancelProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupProfile);
}

// Отмена отправки формы с добавлением картинок

function cancelImageForm(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = imageLinkInput.value;
  listCard.prepend(createCard(link, title));
  evt.target.reset();
  closePopup(popupImage);
}

// Отмена отправки формы с изменением изображения пользователя

function cancelAvatarForm(evt) {
  evt.preventDefault();
  const link = avatarLinkInput.value;
  profileAvatar.src = link;
  evt.target.reset();
  closePopup(popupAvatar);
}

export {
  cancelProfileForm,
  cancelImageForm,
  cancelAvatarForm
};
