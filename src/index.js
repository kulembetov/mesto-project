import "../src/index.css";
import FormValidator from "./components/FormValidator.js";
import Api from "./components/Api.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import {
  errorImage,
  settings,
  user,
  popupConfig,
  editButton,
  addButton,
  forms,
  formValidators,
  profileForm,
  imageForm,
  nameInput,
  aboutInput,
  titleInput,
  imageLinkInput,
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

const imagePopup = new PopupWithImage(".popup__image-zoom", popupConfig);
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm("#popup-avatar", popupConfig, {
  submitCallbackForm: (formValues) => {
    avatarPopup.renderLoading(true);
    api
      .changeAvatarRequest(formValues.avatar)
      .then((res) => {
        avatarElement.src = res.avatar;
        avatarPopup.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  },
});
avatarPopup.setEventListeners();

const profilePopup = new PopupWithForm("#popup-profile", popupConfig, {
  submitCallbackForm: (formValues) => {
    profilePopup.renderLoading(true);
    api
      .setProfileRequest(formValues.name, formValues.about)
      .then((res) => {
        nameElement.textContent = res.name;
        aboutElement.textContent = res.about;
        profilePopup.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  },
});
profilePopup.setEventListeners();

const imageAddPopup = new PopupWithForm("#popup-image-add", popupConfig, {
  submitCallbackForm: (formValues) => {
    imageAddPopup.renderLoading(true);
    api
      .addCardRequest(formValues.title, formValues.link)
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
        imageAddPopup.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        imageAddPopup.renderLoading(false);
      });
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

const openImagePopup = (card) => {
  imagePopup.openPopup(card._title, card._link);
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

const handleProfileForm = (formValues) => {
  profilePopup.renderLoading(true);
  api
    .setProfileRequest(formValues.name, formValues.about)
    .then((res) => {
      nameElement.textContent = res.name;
      aboutElement.textContent = res.about;
      profilePopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    });
};

// Обработчик формы с добавлением картинок

const handleImageForm = (formValues) => {
  iamgeAddPopup.renderLoading(true);
  api
    .addCardRequest(formValues.title, formValues.link)
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
      imagePopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });
};

// Обработчик формы с изменением изображения пользователя

const handleAvatarForm = (formValues) => {
  avatarPopup.renderLoading(true);
  api
    .changeAvatarRequest(formValues.avatar)
    .then((res) => {
      avatarElement.src = res.avatar;
      avatarPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
};

// Открытие попапа с изменением информации в профиле

editButton.addEventListener("click", () => {
  formValidators["profile"].resetValidation();
  nameInput.value = nameElement.textContent;
  aboutInput.value = aboutElement.textContent;
  profilePopup.openPopup();
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
