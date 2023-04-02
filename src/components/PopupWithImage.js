import Popup from './Popup.js';
import {
  errorImage,
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupConfig) {
    super(popupSelector, popupConfig);
    this._image = document.querySelector(popupConfig.popupImageSelector);
    this._caption = document.querySelector(popupConfig.popupCaptionSelector);
  }

  // Добавление изображения с ошибкой
  handleErrorImage() {
    this._image.addEventListener('error', () => {
      this._image.setAttribute('src', errorImage);
    });
  }

  // Открытие попапа
  openPopup(title, link) {
    super.openPopup();
    this._caption.textContent = title;
    this._image.src = link;
    this._image.alt = title;
  }
}
