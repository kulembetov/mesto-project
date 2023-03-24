import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelectors) {
    super(popupSelectors);
    this._image = document.querySelector(popupSelectors.popupImageSelector);
    this._caption = document.querySelector(popupSelectors.popupCaptionSelector);
  }

  openPopup(data) {
    super.openPopup();
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
  }
}
