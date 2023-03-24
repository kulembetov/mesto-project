import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupConfig) {
    super(popupSelector, popupConfig);
    this._image = document.querySelector(popupConfig.popupImageSelector);
    this._caption = document.querySelector(popupConfig.popupCaptionSelector);
  }

  openPopup(data) {
    super.openPopup();
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
  }
}
