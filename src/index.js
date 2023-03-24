import "../src/index.css";
import FormValidator from "./components/FormValidator.js";
import Api from "./components/Api.js";
import PopupWithImage from "./components/PopupWithImage.js";
import {
  errorImage,
  settings,
  user,
  cards,
  popupConfig,
  popupProfile,
  popupImage,
  popupAvatar,
  editButton,
  addButton,
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
  cardSelectors,
} from "./components/variables.js";

import Section from "./components/Section.js";
import Card from "./components/Card.js";

import { renderLoading, hideLoading } from "./components/utils.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "7705f7d6-50a3-4e15-b4ba-203407e7d971",
    "Content-Type": "application/json",
  },
});

const imagePopup = new PopupWithImage(".popup__image-zoom", popupConfig);
imagePopup.setEventListeners();

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

const openImagePopup = (card) => {
  imagePopup.openPopup(card._title, card._link);
};

// const addLike = (card) => {
//   api
//     .setLikeRequest(card._cardId)
//     .then(() => {
//       checkLikes(card.likes, cardLikesCounter);
//       checkMyLike(card.likes, evt.target);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

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

// const deleteLike = (card) => {
//   api
//     .removeLikeRequest(card._cardId)
//     .then(() => {
//       checkLikes(card.likes, cardLikesCounter);
//       evt.target.classList.remove(this._likeButtonActiveClass);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// Получение данных с сервера

Promise.all([api.getProfileRequest(), api.getCardsRequest()])
  .then(([profile]) => {
    nameElement.textContent = profile.name;
    aboutElement.textContent = profile.about;
    avatarElement.src = profile.avatar;
    user.id = profile._id;
    user.name = profile.name;
  })
  .then(() => {
    api.getCardsRequest().then((item) => {
      const cardList = new Section(
        {
          items: item.reverse(),
          renderer: (item) => {
            const card = new Card(
              item,
              cardSelectors,
              user,
              deleteCard,
              likeEvent,
              openImagePopup
            );
            const cardElement = card.generate();
            cardList.addItem(cardElement);
          },
        },
        ".cards"
      );
      cardList.renderItems();
      hideLoading();
    });
  })
  .catch((rej) => {
    console.log(rej);
  });

// Обработчик формы профиля

const handleProfileForm = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  api
    .setProfileRequest(nameInput.value, aboutInput.value)
    .then((res) => {
      nameElement.textContent = res.name;
      aboutElement.textContent = res.about;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
};

// Обработчик формы с добавлением картинок

const handleImageForm = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  api
    .addCardRequest(titleInput.value, imageLinkInput.value)
    .then((item) => {
      const newCard = new Section(
        {
          items: item,
          renderer: (item) => {
            const card = new Card(
              item,
              cardSelectors,
              user,
              deleteCard,
              likeEvent,
              openImagePopup
            );
            const cardElement = card.generate();
            newCard.addItem(cardElement);
          },
        },
        ".cards"
      );
      newCard.renderNewItem();
      closePopup(popupImage);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
};

// Обработчик формы с изменением изображения пользователя

const handleAvatarForm = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  api
    .changeAvatarRequest(avatarLinkInput.value)
    .then((res) => {
      avatarElement.src = res.avatar;
      closePopup(popupAvatar);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
};

// Открытие попапа с изменением информации в профиле

editButton.addEventListener("click", () => {
  formValidators["profile"].resetValidation();
  nameInput.value = nameElement.textContent;
  aboutInput.value = aboutElement.textContent;
  openPopup(popupProfile);
});

// Открытие попапа с добавлением картинок

addButton.addEventListener("click", () => {
  formValidators["image"].resetValidation();
  openPopup(popupImage);
});

// Открытие попапа с изменением изображения профиля

avatarElement.addEventListener("click", () => {
  formValidators["avatar"].resetValidation();
  openPopup(popupAvatar);
});

// Добавление изображения с ошибкой

avatarElement.addEventListener("error", () => {
  avatarElement.setAttribute("src", errorImage);
});

// Отправка формы редактирования профиля

profileForm.addEventListener("submit", handleProfileForm);

// Отправка формы добавления изображения

imageForm.addEventListener("submit", handleImageForm);

// Отправка формы изменения изображения профиля

avatarForm.addEventListener("submit", handleAvatarForm);

// Валидация форм
forms.forEach((form) => {
  const formValidator = new FormValidator(settings, form);
  formValidators[form.id] = formValidator;
  formValidator.enableValidation();
});
