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
    this._cardId = data._id;
    this._likes = data.likes;
    this.id = user.id;
    this._ownerId = data.owner._id;
    this._selector = cardSelectors;
    this._cardSelector = cardSelectors.cardSelector;
    this._cardTemplate = cardSelectors.cardTemplate;
    this._cardImage = cardSelectors.cardImage;
    this._cardTitle = cardSelectors.cardTitle;
    this._cartButtonSelector = cardSelectors.cartButtonSelector;
    this._likeButtonSelector = cardSelectors.likeButtonSelector;
    this._likeButtonActiveClass = cardSelectors.likeButtonActiveClass;
    this._cardLikesCounterSelector = cardSelectors.cardLikesCounterSelector;
    this._cardLikesCounterActiveClass = cardSelectors.cardLikesCounterActiveClass;
    // this._handleCardRemove = handleCardRemove;
    // this._handleCardClick = handleCardClick;
  }

  _createElement() {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  }

  // Создание карточек
  generate() {
    this._element = this._createElement();
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

    this._checkLikes(this._likes, cardLikesCounter);

    this._checkMyLike(this._likes, likeButton);

    if (this.id !== this._ownerId) {
      cartButton.remove();
    }

    return this._element;
  }

  // Проверка и установка лайков
  _checkLikes(likes, counter) {
    if (this._likes.length > 0) {
      counter.classList.add(this._cardLikesCounterActiveClass);
      counter.textContent = likes.length;
    } else {
      counter.classList.remove(this._cardLikesCounterActiveClass);
      counter.textContent = "";
    }
  }

  // Проверка и установка своего лайка
  _checkMyLike(likes, button) {
    likes.forEach((like) => {
      if (like.id === user.id) {
        button.classList.add(this._likeButtonActiveClass);
      }
    });
  }

  // Добавление лайка
  _handleAddLike() {
    сheckLikes(card.likes, cardLikesCounter);
    evt.target.classList.toggle(this._likeButtonActiveClass);
  }
  // Удаление лайка
  _handleRemoveLike() {
    сheckLikes(card.likes, cardLikesCounter);
    evt.target.classList.remove(this._likeButtonActiveClass);
  }

  // Установка слушателей
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeEvent();
      this._likeStatus = !this._likeStatus;
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handlePictureClick();
    });
  }
  // cardImage.addEventListener("click", () => {
  //   imageZoom.src = cardImage.src;
  //   imageZoom.alt = cardImage.alt;
  //   captionZoom.textContent = cardImage.alt;
  //   openPopup(popupImageZoom);
  // });

  // cardImage.addEventListener("error", () => {
  //   cardImage.setAttribute("src", errorImage);
  // });

  // this._cartButtonSelector.addEventListener("click", () => {
  //   this._handleCardRemove(this._element, this._cardId)
  // });

  // this._cardImage.addEventListener("click", () => {
  //   this._handleCardClick(this._title, this._link)
  // });
}
/*
  _setEventListeners() {
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
      if (evt.target.classList.contains(this._likeButtonActiveClass)) {
        removeLikeRequest(card._id)
          .then((card) => {
            checkLikes(card.likes, cardLikesCounter);
            evt.target.classList.remove(this._likeButtonActiveClass);
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
*/
