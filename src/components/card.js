export default class Card {
  constructor(
    data,
    cardSelectors,
    user,
    handleCardRemove,
    handleLikeClick,
    handleCardClick
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

    this._userId = user._id;

    this._likeStatus = this._checkMyLike();
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

    this._toggleLikeButtonState();
    this._toggleLikeCounterState();
    this._setEventListeners();

    return this._element;
  }

  // Проверка и установка лайков
  _checkLikes() {
    return this._likes.length;
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

  _toggleLikeCounterState() {
    if (this._checkLikes()) {
      this._cardLikesCounter.classList.add(this._cardLikesCounterActiveClass);
      this._cardLikesCounter.textContent = this._likes.length;
    } else {
      this._cardLikesCounter.classList.remove(
        this._cardLikesCounterActiveClass
      );
      this._cardLikesCounter.textContent = '';
    }
  }

  // Добавление лайка
  addLike(res) {
    this._likes = res.likes;
    this._likeButton.classList.add(this._likeButtonActiveClass);
    this._cardLikesCounter.textContent = this._likes.length;
    this._likeStatus = !this._likeStatus;
    this._toggleLikeCounterState();
  }

  // Удаление лайка
  removeLike(res) {
    this._likes = res.likes;
    this._likeButton.classList.remove(this._likeButtonActiveClass);
    this._cardLikesCounter.textContent = this._likes.length;
    this._likeStatus = !this._likeStatus;
    this._toggleLikeCounterState();
  }

  // Удаление карточки
  removeCard() {
    this._element.remove();
  }

  // Установка слушателей
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleCardRemove(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this);
    });
  }
}
