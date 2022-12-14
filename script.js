// Попапы
const popupProfile = document.querySelector("#popup-profile");
const popupImage = document.querySelector("#popup-image-add");
const popupImageZoom = document.querySelector("#popup-image-zoom");

// Кнопки
const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileButtonSave = popupProfile.querySelector(".popup__button-save");
const imageButtonAdd = document.querySelector(".profile__button-add");
const imageButtonSave = popupImage.querySelector(".popup__button-save");
const imageZoom = document.querySelector(".popup__image");
const captionZoom = document.querySelector(".popup__caption");
const buttonCloseList = document.querySelectorAll(".popup__button-close");

// Инпуты
const nameProfileInput = document.querySelector("#popup-profile-input");
const jobProfileInput = document.querySelector(".popup__input-job");
const nameImageInput = document.querySelector("#popup-image-input");
const linkImageInput = document.querySelector(".popup__input-link");

// Элементы профиля
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

// Формы
const profileInfoAddForm = document.querySelector("#form_add-profile-info");
const imageAddForm = document.querySelector("#form_add-image");

// Список, в который будут вставляться карточки
const listCard = document.querySelector(".photo-grid__list");

// Шаблон карточки
const templateCard = listCard.querySelector("#photo-grid-template").content;

// Универсальное открытие и закрытие попапа при нажатии на крестик, ESC, оверлей

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("mousedown", closePopupMousedown);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  popup.removeEventListener("mousedown", closePopupMousedown);
}

function closePopupEsc(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopupMousedown(e) {
  if (e.target.classList.contains("popup_opened")) {
    closePopup(e.target);
  }
}

// Добавление информации в профиль

function addProfileInfo() {
  profileName.textContent = nameProfileInput.value;
  profileJob.textContent = jobProfileInput.value;
}

// Создание карточек

function createCard(link, name) {
  const cardsClone = templateCard.querySelector(".photo-grid__item").cloneNode(true);
  const cardImage = cardsClone.querySelector(".photo-grid__image");
  const cardName = cardsClone.querySelector(".photo-grid__title");
  const cartButton = cardsClone.querySelector(".photo-grid__button-cart");

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  cardsClone.querySelector(".photo-grid__button-like").addEventListener("click", function (e) {
    e.target.classList.toggle("photo-grid__button-like_active");
  });

  cardsClone.querySelector(".photo-grid__image").addEventListener("click", function (e) {
    createPopupZoomImage(link, name);
  });

  cartButton.addEventListener("click", function (e) {
    e.stopPropagation();
    cardsClone.remove();
  });

  return cardsClone;
}

// Создание попапа с открытым изображанием

function createPopupZoomImage(link, name) {
  openPopup(popupImageZoom);
  imageZoom.src = link;
  imageZoom.alt = name;
  captionZoom.textContent = name;
}

// Добавление в DOM

function addImage() {
  initialCards.forEach(function (item) {
    listCard.append(createCard(item.link, item.name));
  });
}
addImage();

// Попап с изменением информации в профиле

profileButtonEdit.addEventListener("click", function () {
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileJob.textContent;
  openPopup(popupProfile);
});

// Попап с добавлением фотографий

imageButtonAdd.addEventListener("click", function () {
  openPopup(popupImage);
});

// Нахождение попапа, внутри которого находится крести и его закрытие

buttonCloseList.forEach(function (button) {
  const popup = button.closest(".popup");
  button.addEventListener("click", function () {
    closePopup(popup);
  });
});

// Отмена отправки формы с добавлением информации в профиль

profileInfoAddForm.addEventListener("submit", function (e) {
  e.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileJob.textContent = jobProfileInput.value;
  closePopup(popupProfile);
});

// Отмена отправки формы с добавлением картинок

imageAddForm.addEventListener("submit", function (e) {
  e.preventDefault();
  name = nameImageInput.value;
  link = linkImageInput.value;
  listCard.prepend(createCard(link, name));
  nameImageInput.value = "";
  linkImageInput.value = "";
  closePopup(popupImage);
});
