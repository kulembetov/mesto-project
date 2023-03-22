import {
  errorImage,
  user,
  popupImageZoom,
  imageZoom,
  captionZoom,
} from "./variables.js";

import { openPopup } from "./modal.js";

export default class Card {
  constructor(data, cardSelectors) {
    this._title = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._selector = cardSelectors;
    this._cardSelector = cardSelectors.cardSelector;
    this._cardTemplate = cardSelectors.cardTemplate;
    this._cardImage = cardSelectors.cardImage;
    this._cardTitle = cardSelectors.cardTitle;
    this._cartButtonSelector = cardSelectors.cartButtonSelector;
    this._likeButtonSelector = cardSelectors.likeButtonSelector;
    this._likeActiveButtonClass = cardSelectors.likeActiveButtonClass;
    this._cardLikesCounterSelector = cardSelectors.cardLikesCounterSelector;
  }

  _getElement() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  // Создание карточек
  generate() {
    this._element = this._getElement();
    const cardImage = this._element.querySelector(this._cardImage);
    const cardTitle = this._element.querySelector(this._cardTitle);
    const cartButton = this._element.querySelector(this._cartButtonSelector);
    const likeButton = this._element.querySelector(this._likeButtonSelector);
    const cardLikesCounter = this._element.querySelector(
      this._cardLikesCounterSelector
    );

    cardTitle.textContent = this._title;
    cardImage.src = this._link;
    cardImage.alt = this._title;

    this.hideCartButton(this._ownerId, cartButton);

    this.checkLikes(this._likes, cardLikesCounter);

    this.checkMyLike(this._likes, likeButton);

    return this._element;
  }

  // Скрытие корзины
  hideCartButton(owner, button) {
    if (user.id !== owner) {
      button.remove();
    }
  }

  // Проверка и установка лайков
  checkLikes(likes, counter) {
    if (this._likes.length > 0) {
      counter.classList.add("cards__likes-counter_active");
      counter.textContent = likes.length;
    } else {
      counter.classList.remove("cards__likes-counter_active");
      counter.textContent = "";
    }
  }

  // Проверка и установка своего лайка
  checkMyLike(likes, button) {
    likes.forEach((like) => {
      if (like.id === user.id) {
        button.classList.add("cards__button-like_active");
      }
    });
  }
}

/*
  _setEventListners() {
    // Открытие попапа с картинкой
    cardImage.addEventListener("click", () => {
      imageZoom.src = cardImage.src;
      imageZoom.alt = cardImage.alt;
      captionZoom.textContent = cardImage.alt;
      openPopup(popupImageZoom);
    });

    cardImage.addEventListener("error", () => {
      cardImage.setAttribute("src", errorImage);
    });

    // Лайк карточки
    likeButton.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("cards__button-like_active")) {
        removeLikeRequest(card._id)
          .then((card) => {
            checkLikes(card.likes, cardLikesCounter);
            evt.target.classList.remove("cards__button-like_active");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setLikeRequest(card._id)
          .then((card) => {
            checkLikes(card.likes, cardLikesCounter);
            checkMyLike(card.likes, evt.target);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    // Удаление карточки
    cartButton.addEventListener("click", (evt) => {
      removeCardRequest(card._id)
        .then(() => {
          evt.target.closest(".cards__item").remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  // Добавление карточек
  addCard(card, box) {
    box.prepend(card);
  }

  // Заполнение карточек из массива
  addCardList(cards, box) {
    cards.reverse().forEach((card) => {
      const item = createCard(card);
      addCard(item, box);
    });
  }
}
*/
