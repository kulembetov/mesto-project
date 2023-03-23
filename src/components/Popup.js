import { popups } from "./variables.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._popupItem = document.querySelector(popupSelector);
  }

  // Универсальное открытие и закрытие попапа при нажатии на крестик, ESC, оверлей
  openPopup() {
    this._popupItem.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupEsc);
  }

  closePopup() {
    this._popupItem.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupEsc);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup(document.querySelector(".popup_opened"));
    }
  }

  setEventListeners() {
    popups.forEach(() => {
      this._popupItem.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
          this.closePopup(this._popupItem);
        }
      });
    });
  }
}
