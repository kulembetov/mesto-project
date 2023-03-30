import "../src/index.css";
import FormValidator from "./components/FormValidator.js";
import Api from "./components/Api.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import {
  errorImage,
  settings,
  cardSelectors,
  popupConfig,
  userConfig,
  editButton,
  addButton,
  forms,
  formValidators,
  avatarElement,
  profileForm,
  imageForm,
  avatarForm,
} from "./utils/constants.js";
import { hideLoading } from "./utils/utils.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "7705f7d6-50a3-4e15-b4ba-203407e7d971",
    "Content-Type": "application/json",
  },
});

function createCard(userId, cardData) {
  const newCard = new Card(
    cardData,
    cardSelectors,
    userId,
    deleteCard,
    likeEvent,
    openImageZoomPopup
  );
  const cardElement = newCard.generate()
  return cardElement;
}

const cardSection = new Section(cardSelectors.cardsContainerSelector, {
  renderer: (userId, cardData) => createCard(userId, cardData)
});

// Экземпляр класса PopupWithImage
const imageZoomPopup = new PopupWithImage("#popup-image-zoom", popupConfig);
imageZoomPopup.setEventListeners();

// Экземпляр класса PopupWithConfirmation
const confirmationDeletePopup = new PopupWithConfirmation(
  "#popup-confirmation",
  popupConfig,
  {
    submitCallbackForm: async (card) => {
      try {
        const res = await api.removeCardRequest(card._cardId);
        card.removeCard(res);
        confirmationDeletePopup.closePopup();
      } catch (err) {
        console.log(err);
      }
    },
  }
);
confirmationDeletePopup.setEventListeners();

// Экземпляр класса PopupWithForm
const avatarPopup = new PopupWithForm("#popup-avatar", popupConfig, {
  submitCallbackForm: async (formValues) => {
    try {
      const res = await api.changeAvatarRequest(formValues.avatar);
      userInfo.setUserAvatar(res.avatar);
    } catch (err) {
      console.log(err);
    }
  },
});
avatarPopup.setEventListeners();

// Экземпляр класса PopupWithForm
const profilePopup = new PopupWithForm("#popup-profile", popupConfig, {
  submitCallbackForm: async (formValues) => {
    profilePopup.renderLoading(true);
    try {
      const res = await api.setProfileRequest(
        formValues.userName,
        formValues.userAbout
      );
      userInfo.setUserInfo(res.name, res.about);
    } catch (err) {
      console.log(err);
    }
  },
});
profilePopup.setEventListeners();

// Экземпляр класса PopupWithForm
const imageAddPopup = new PopupWithForm("#popup-image-add", popupConfig, {
  submitCallbackForm: async (formValues) => {
    imageAddPopup.renderLoading(true);
    try {
      const cardData = await api.addCardRequest(formValues.title, formValues.link);
      const newCard = cardSection.renderItem(cardData.owner._id, cardData);
      cardSection.addItem(newCard)
    } catch (err) {
      console.log(err);
    }
  },
});
imageAddPopup.setEventListeners();

// Удаление карточки
const deleteCard = (card) => {
  confirmationDeletePopup.openPopup();
  confirmationDeletePopup.setCard(card);
};

const likeEvent = (card) => {
  if (card._likeStatus) {
    api
      .removeLikeRequest(card._cardId)
      .then((res) => {
        card.removeLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .setLikeRequest(card._cardId)
      .then((res) => {
        card.addLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Экземпляр класса UserInfo
const userInfo = new UserInfo(userConfig);

// Отрисовка элементов на странице
async function renderElements() {
  try {
    const [profile, cards] = await Promise.all([
      api.getProfileRequest(),
      api.getCardsRequest(),
    ]);
    userInfo.setUserInfo(profile.name, profile.about);
    userInfo.setUserAvatar(profile.avatar);
    cards.reverse().forEach(card => {

      const newCard = cardSection.renderItem(profile._id, card);
      cardSection.addItem(newCard)
    });
    hideLoading();
  } catch (err) {
    console.log(err);
  }
}

renderElements();

// Открытие попапа с изменением информации в профиле
editButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  const data = userInfo.getUserInfo();
  profilePopup.setInputValues(data)
  profilePopup.openPopup();
});

// Открытие попапа с добавлением картинок
addButton.addEventListener("click", () => {
  imageFormValidator.resetValidation();
  imageAddPopup.openPopup();
});

// Открытие попапа с изменением изображения профиля
avatarElement.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.openPopup();
});

// Добавление изображения с ошибкой
avatarElement.addEventListener("error", () => {
  avatarElement.setAttribute("src", errorImage);
});

// Открытие попапа с открытым изображением
const openImageZoomPopup = (card) => {
  imageZoomPopup.openPopup(card._title, card._link);
};

// Валидация форм
forms.forEach((form) => {
  const formValidator = new FormValidator(settings, form);
  formValidators[form.id] = formValidator;
  formValidator.enableValidation();
});

// Экземпляры FormValidator
const profileFormValidator = new FormValidator(settings, profileForm);
const avatarFormValidator = new FormValidator(settings, avatarForm);
const imageFormValidator = new FormValidator(settings, imageForm);

// Включение валидации для форм
profileFormValidator.enableValidation(settings);
avatarFormValidator.enableValidation(settings);
imageFormValidator.enableValidation(settings);
