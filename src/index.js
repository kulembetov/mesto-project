import "../src/index.css";
import { enableValidation } from "./components/validate.js";
import { openPopup, closePopup } from "./components/modal.js";
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
  profileAvatar,
  profileName,
  profileInfo,
} from "./components/variables.js";
import {
  cancelProfileForm,
  cancelImageForm,
  cancelAvatarForm,
} from "./components/utils.js";

// Нахождение попапа, внутри которого находится крести и его закрытие

buttonCloseList.forEach(function (button) {
  const popup = button.closest(".popup");
  button.addEventListener("click", function () {
    closePopup(popup);
  });
});

// Попап с изменением информации в профиле

profileButtonEdit.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
  openPopup(popupProfile);
});

// Попап с добавлением картинок

profileButtonAdd.addEventListener("click", function () {
  openPopup(popupImage);
});

// Попап с изменением изображения профиля

profileAvatar.addEventListener("click", function () {
  openPopup(popupAvatar);
});

profileForm.addEventListener("submit", cancelProfileForm);

imageForm.addEventListener("submit", cancelImageForm);

avatarForm.addEventListener("submit", cancelAvatarForm);

enableValidation(settings);
