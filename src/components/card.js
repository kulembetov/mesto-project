export default class Card {
  constructor(
    data,
    cardSelectors,
    user,
    handleCardRemove,
    handleCardClick,
    handleLikeClick
  ) {
    this._title = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;

    this._cardSelector = cardSelectors.cardSelector;
    this._cardTemplate = cardSelectors.cardTemplate;
    this._cardImageSelector = cardSelectors.cardImage;
    this._cardTitleSelector = cardSelectors.cardTitle;
    this._deleteButtonSelector = cardSelectors.deleteButtonSelector;
    this._likeButtonSelector = cardSelectors.likeButtonSelector;
    this._likeButtonActiveClass = cardSelectors.likeButtonActiveClass;
    this._cardLikesCounterSelector = cardSelectors.cardLikesCounterSelector;
    this._cardLikesCounterActiveClass =
      cardSelectors.cardLikesCounterActiveClass;
    this._likeStatus = this._checkMyLike();

    this._userId = user.id;

    this._handleCardRemove = handleCardRemove;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _createElement() {
    const cardElement = this._cardTemplate
      .querySelector(this._cardSelector)
      .cloneNode(true);
    return cardElement;
  }

  // Создание карточек
  generate() {
    this._element = this._createElement();
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._cardTitle = this._element.querySelector(this._cardTitleSelector);
    this._deleteButton = this._element.querySelector(
      this._deleteButtonSelector
    );

    this._likeButton = this._element.querySelector(this._likeButtonSelector);
    this._cardLikesCounter = this._element.querySelector(
      this._cardLikesCounterSelector
    );

    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;

    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    }

    this._toggleLikeButtonState()
    this._setEventListeners();

    return this._element;
  }

  // Проверка и установка лайков
  _checkLikes() {
    this._cardLikesCounter.classList.add(this._cardLikesCounterActiveClass);
    this._cardLikesCounter.textContent = this._likes.length;
  }

  // Проверка и установка своего лайка
  _checkMyLike() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  _toggleLikeButtonState() {
    if (this._likeStatus) {
      this._likeButton.classList.add(this._likeButtonActiveClass);
    } else {
      this._likeButton.classList.remove(this._likeButtonActiveClass);
    }
  }

  addLike() {
    this._likeButton.classList.toggle(this._likeButtonActiveClass);
    this._cardLikesCounter.textContent = this._likes.length;
  }

  removeLike() {
    this._likeButton.classList.remove(this._likeButtonActiveClass);
    this._cardLikesCounter.textContent = this._likes.length;
  }

  // Добавление лайка

  removeCard() {
    this._element.remove();
  }

  // Установка слушателей
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
      // this._likeStatus = !this._likeStatus;
      // this._likeButton.addEventListener("click", () => {
      //   this._handleLikeClick(this)
      // });
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleCardRemove(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick;
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
