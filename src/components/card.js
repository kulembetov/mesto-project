import {
  errorImage,
  user,
  cardTemplate,
  popupImageZoom,
  imageZoom,
  captionZoom,
} from '../components/variables.js';

import { openPopup } from '../components/modal.js';

// Скрытие корзины

const hideCartButton = (owner, button) => {
  if (user.id !== owner) {
    button.remove();
  }
};

// Проверка и установка лайков

const checkLikes = (likes, counter) => {
  if (likes.length > 0) {
    counter.classList.add('cards__likes-counter_active');
    counter.textContent = likes.length;
  } else {
    counter.classList.remove('cards__likes-counter_active');
    counter.textContent = '';
  }
};

// Проверка и установка своего лайка

const checkMyLike = (likes, button) => {
  likes.forEach((like) => {
    if (like.name === user.name) {
      button.classList.add('cards__button-like_active');
    }
  });
};

// Создание карточек

const createCard = (card) => {
  const cardsClone = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardsClone.querySelector('.cards__image');
  const cardTitle = cardsClone.querySelector('.cards__title');
  const cartButton = cardsClone.querySelector('.cards__button-cart');
  const likeButton = cardsClone.querySelector('.cards__button-like');
  const cardLikesCounter = cardsClone.querySelector('.cards__likes-counter');

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener('error', () => {
    cardImage.setAttribute('src', errorImage);
  });

  // Открытие попапа с картинкой

  cardImage.addEventListener('click', () => {
    imageZoom.src = cardImage.src;
    imageZoom.alt = cardImage.alt;
    captionZoom.textContent = cardImage.alt;
    openPopup(popupImageZoom);
  });

  // Лайк карточки

  likeButton.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('cards__button-like_active')) {
      removeLikeRequest(card._id)
        .then((card) => {
          checkLikes(card.likes, cardLikesCounter);
          checkMyLike(card.likes, evt.target);
          evt.target.classList.remove('cards__button-like_active');
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

  cartButton.addEventListener('click', (evt) => {
    removeCardRequest(card._id)
      .then(() => {
        evt.target.closest('.cards__item').remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  hideCartButton(card.owner._id, cartButton);

  checkLikes(card.likes, cardLikesCounter);

  checkMyLike(card.likes, likeButton);

  return cardsClone;
};

// Добавление карточек

const addCard = (card, box) => {
  box.prepend(card);
};

// Заполнение карточек из массива

const addCardList = (cards, box) => {
  cards.reverse().forEach((card) => {
    const item = createCard(card);
    addCard(item, box);
  });
};

export { createCard, addCard, addCardList };
