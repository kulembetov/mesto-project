import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupConfig) {
    super(popupSelector, popupConfig);
    this._image = document.querySelector(popupConfig.popupImageSelector);
    this._caption = document.querySelector(popupConfig.popupCaptionSelector);
  }

  openPopup(name, link) {
    super.openPopup();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  }
}
