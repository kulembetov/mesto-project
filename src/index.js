import "../src/index.css";
import FormValidator from "./components/FormValidator.js";
import Api from "./components/Api.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithSubmit from "./components/PopupWithSubmit.js";
import UserInfo from "./components/UserInfo.js";
import {
  errorImage,
  settings,
  user,
  popupConfig,
  userConfig,
  editButton,
  addButton,
  forms,
  formValidators,
  nameInput,
  aboutInput,
  avatarElement,
  nameElement,
  aboutElement,
  cardSelectors,
} from "./components/variables.js";

import Section from "./components/Section.js";
import Card from "./components/Card.js";

import { hideLoading } from "./components/utils.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "7705f7d6-50a3-4e15-b4ba-203407e7d971",
    "Content-Type": "application/json",
  },
});

const imageZoomPopup = new PopupWithImage(".popup__image-zoom", popupConfig);
imageZoomPopup.setEventListeners();

const submitPopup = new PopupWithSubmit("#popup-confirmation", popupConfig, {
  submitCallbackForm: async (card) => {
    submitPopup.renderLoading(true);
    try {
      const res = await api.removeCardRequest(card._cardId);
      card.removeCard(res);
      submitPopup.closePopup();
    } catch (err) {
      console.log(err);
    }
  },
});

submitPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#popup-avatar", popupConfig, {
  submitCallbackForm: async (formValues) => {
    avatarPopup.renderLoading(true);
    try {
      const res = await api.changeAvatarRequest(formValues.avatar);
      avatarElement.src = res.avatar;
      avatarPopup.closePopup();
    } catch (err) {
      console.log(err);
    } finally {
      avatarPopup.renderLoading(false);
    }
  },
});
avatarPopup.setEventListeners();

const profilePopup = new PopupWithForm("#popup-profile", popupConfig, {
  submitCallbackForm: async (formValues) => {
    profilePopup.renderLoading(true);
    try {
      const res = await api.setProfileRequest(
        formValues.name,
        formValues.about
      );
      nameElement.textContent = res.name;
      aboutElement.textContent = res.about;
      profilePopup.closePopup();
    } catch (err) {
      console.log(err);
    } finally {
      profilePopup.renderLoading(false);
    }
  },
});
profilePopup.setEventListeners();

const imageAddPopup = new PopupWithForm("#popup-image-add", popupConfig, {
  submitCallbackForm: async (formValues) => {
    imageAddPopup.renderLoading(true);
    try {
      const userId = await userInfo.getUserInfo();
      const res = await api.addCardRequest(formValues.title, formValues.link);
      const newCard = new Section(
        {
          items: res,
          renderer: (res) => {
            const card = new Card(
              res,
              cardSelectors,
              userId,
              deleteCard,
              likeEvent,
              openZoomImagePopup
            );
            const cardElement = card.generate();
            newCard.addItem(cardElement);
          },
        },
        cardSelectors.cardsContainerSelector
      );
      newCard.renderNewItem();
      imageAddPopup.closePopup();
    } catch (err) {
      console.log(err);
    } finally {
      imageAddPopup.renderLoading(false);
    }
  },
});
imageAddPopup.setEventListeners();

const deleteCard = (card) => {
  api
    .removeCardRequest(card._cardId)
    .then(() => {
      card.removeCard();
    })
    .catch((err) => {
      console.log(err);
    });
};

const openZoomImagePopup = (card) => {
  imageZoomPopup.openPopup(card._title, card._link);
};

const likeEvent = (card) => {
  if (card._likeStatus) {
    api
      .removeLikeRequest(card._cardId)
      .then((res) => {
        console.log(res);
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

const userInfo = new UserInfo(userConfig, {
  getUser: async () => {
    const res = await api.getProfileRequest();
    return res;
  },
});

// Получение данных с сервера

async function renderElements() {
  try {
    const [profile, cards] = await Promise.all([
      api.getProfileRequest(),
      api.getCardsRequest(),
    ]);
    userInfo.setUserInfo(profile.name, profile.about);
    userInfo.setUserAvatar(profile.avatar);
    const cardList = new Section(
      {
        items: cards.reverse(),
        renderer: (cards) => {
          const card = new Card(
            cards,
            cardSelectors,
            profile,
            deleteCard,
            likeEvent,
            openZoomImagePopup
          );
          const cardElement = card.generate();
          cardList.addItem(cardElement);
        },
      },
      cardSelectors.cardsContainerSelector
    );
    cardList.renderItems();
    hideLoading();
  } catch (err) {
    console.log(err);
  }
}

renderElements();

// Открытие попапа с изменением информации в профиле

editButton.addEventListener("click", () => {
  formValidators["profile"].resetValidation();
  userInfo.getUserInfo().then((res) => {
    nameInput.value = res.name;
    aboutInput.value = res.about;
    profilePopup.openPopup();
  });
});

// Открытие попапа с добавлением картинок

addButton.addEventListener("click", () => {
  formValidators["image"].resetValidation();
  imageAddPopup.openPopup();
});

// Открытие попапа с изменением изображения профиля

avatarElement.addEventListener("click", () => {
  formValidators["avatar"].resetValidation();
  avatarPopup.openPopup();
});

// Добавление изображения с ошибкой

avatarElement.addEventListener("error", () => {
  avatarElement.setAttribute("src", errorImage);
});

// Валидация форм
forms.forEach((form) => {
  const formValidator = new FormValidator(settings, form);
  formValidators[form.id] = formValidator;
  formValidator.enableValidation();
});

// submitPopup.setEventListeners();

// const openSubmitPopup = () => {
//   submitPopup.openPopup();
// };

// Открытие попапа с подтверждением удаления

// deleteButton.addEventListener("click", () => {
//   submitPopup.openPopup();
// });
