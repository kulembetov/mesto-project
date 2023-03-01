import {
  initialCards,
  listCard,
} from '../components/variables.js';

import {
  createPopupZoomImage
} from '../components/modal.js';

// Создание карточек

function createCard(link, title) {
  const templateCard = listCard.querySelector('#photo-grid-template').content;
  const cardsClone = templateCard
    .querySelector('.photo-grid__item')
    .cloneNode(true);
  const cardImage = cardsClone.querySelector('.photo-grid__image');
  const cardName = cardsClone.querySelector('.photo-grid__title');
  const cartButton = cardsClone.querySelector('.photo-grid__button-cart');

  cardImage.src = link;
  cardImage.alt = title;
  cardName.textContent = title;
  cardsClone
    .querySelector('.photo-grid__button-like')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('photo-grid__button-like_active');
    });

  cardsClone
    .querySelector('.photo-grid__image')
    .addEventListener('click', function () {
      createPopupZoomImage(link, title);
    });

  cartButton.addEventListener('click', function (evt) {
    evt.stopPropagation();
    cardsClone.remove();
  });

  return cardsClone;
}

// Добавление в DOM

function addImage() {
  initialCards.forEach(function (item) {
    listCard.append(createCard(item.link, item.name));
  });
}
addImage();

export {
  createCard
};
