const initialCards = [
  {
    name: 'Торонто',
    link: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=690&q=80',
  },
  {
    name: 'Токио',
    link: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1194&q=80',
  },
  {
    name: 'Буэнос-Айрес',
    link: 'https://images.unsplash.com/photo-1576541572620-cbc5457517b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1604324561454-5d28e384aebc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    name: 'Дубай',
    link: 'https://images.unsplash.com/photo-1575538439014-1b8bc5fcaa1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Сан-Франциско',
    link: 'https://images.unsplash.com/photo-1534050359320-02900022671e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  },
];

// Попапы

const popupProfile = document.querySelector('#popup-profile');
const popupImage = document.querySelector('#popup-image-add');
const popupImageZoom = document.querySelector('#popup-image-zoom');
const popupAvatar = document.querySelector('#popup-avatar');

// Кнопки

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profileButtonAdd = document.querySelector('.profile__button-add');
const buttonCloseList = document.querySelectorAll('.popup__button-close');

// Элементы попапа с открытым изображением

const imageZoom = document.querySelector('.popup__image');
const captionZoom = document.querySelector('.popup__caption');

// Формы

const profileForm = document.forms.profile;
const imageForm = document.forms.image;
const avatarForm = document.forms.avatar;

// Инпуты

const nameInput = profileForm.elements.name;
const infoInput = profileForm.elements.info;
const titleInput = imageForm.elements.title;
const imageLinkInput = imageForm.elements.link;
const avatarLinkInput = avatarForm.elements.avatar;

// Изменение изображения профиля

const profileAvatar = document.querySelector('.profile__avatar');

// Элементы профиля

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

// Список, в который будут вставляться карточки

const listCard = document.querySelector('.photo-grid__list');

// Объект настроек

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disable',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
};

export {
  settings,
  initialCards,
  popupProfile,
  popupImage,
  popupImageZoom,
  popupAvatar,
  profileButtonEdit,
  profileButtonAdd,
  buttonCloseList,
  imageZoom,
  captionZoom,
  profileForm,
  imageForm,
  avatarForm,
  nameInput,
  infoInput,
  titleInput,
  imageLinkInput,
  avatarLinkInput,
  profileAvatar,
  profileName,
  profileInfo,
  listCard,
};
