// Изображение ошибки
import errorImage from "../images/error.png";

// Объект настроек
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disable",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

const cardSelectors = {
  cardSelector: ".cards__item",
  cardTemplate: document.querySelector("#cards-template").content,
  cardImage: ".cards__image",
  cardTitle: ".cards__title",
  deleteButtonSelector: ".cards__button-delete",
  likeButtonSelector: ".cards__button-like",
  likeButtonActiveClass: "cards__button-like_active",
  cardLikesCounterSelector: ".cards__likes-counter",
  cardLikesCounterActiveClass: "cards__likes-counter_active",
  cardsContainerSelector: ".cards",
};

const popupConfig = {
  popupOpenedClass: "popup_opened",
  popupCloseButtonClass: "popup__button-close",
  popupImageSelector: ".popup__image",
  popupCaptionSelector: ".popup__caption",
};

const userConfig = {
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__about",
  userAvatarSelector: ".profile__avatar",
};

// Объект пользователя
const user = {
  id: "",
  name: "",
};

// Кнопки
const editButton = document.querySelector(".profile__button-edit");
const addButton = document.querySelector(".profile__button-add");
const closeButtonList = document.querySelectorAll(".popup__button-close");

// Формыf
const forms = document.querySelectorAll(".popup__form");
const formValidators = {};
const profileForm = document.forms.profile;
const imageForm = document.forms.image;
const avatarForm = document.forms.avatar;

// Инпуты
const nameInput = profileForm.elements.name;
const aboutInput = profileForm.elements.info;
const titleInput = imageForm.elements.title;
const imageLinkInput = imageForm.elements.link;
const avatarLinkInput = avatarForm.elements.avatar;

// Элементы профиля
const avatarElement = document.querySelector(".profile__avatar");
const nameElement = document.querySelector(".profile__name");
const aboutElement = document.querySelector(".profile__about");

export {
  errorImage,
  settings,
  cardSelectors,
  popupConfig,
  userConfig,
  user,
  editButton,
  addButton,
  closeButtonList,
  forms,
  formValidators,
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
};
