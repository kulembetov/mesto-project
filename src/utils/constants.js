// Изображение ошибки
import errorImage from '../images/error.png';

// Объект настроек
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
};

const cardSelectors = {
  cardSelector: '.cards__item',
  cardTemplate: document.querySelector('#cards-template').content,
  cardImage: '.cards__image',
  cardTitle: '.cards__title',
  cardsContainerSelector: '.cards',
  deleteButtonSelector: '.cards__button-delete',
  likeButtonSelector: '.cards__button-like',
  cardLikesCounterSelector: '.cards__likes-counter',
  likeButtonActiveClass: 'cards__button-like_active',
  cardLikesCounterActiveClass: 'cards__likes-counter_active',
};

const popupConfig = {
  popupFormSelector: '.popup__form',
  popupSubmitButtonSelector: '.popup__button-submit',
  popupImageSelector: '.popup__image',
  popupCaptionSelector: '.popup__caption',
  popupOpenedClass: 'popup_opened',
  popupCloseButtonClass: 'popup__button-close',
};

const userConfig = {
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar',
};

// Кнопки
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const closeButtonList = document.querySelectorAll('.popup__button-close');

// Формыf
const forms = document.querySelectorAll('.popup__form');
const formValidators = {};
const profileForm = document.forms.profile;
const imageForm = document.forms.image;
const avatarForm = document.forms.avatar;

// Инпуты
const nameInput = profileForm.elements.name;
const aboutInput = profileForm.elements.about;
const titleInput = imageForm.elements.title;

// Элементы профиля
const avatarElement = document.querySelector('.profile__avatar');
const nameElement = document.querySelector('.profile__name');
const aboutElement = document.querySelector('.profile__about');

export {
  errorImage,
  settings,
  popupConfig,
  userConfig,
  cardSelectors,
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
  avatarElement,
  nameElement,
  aboutElement,
};
