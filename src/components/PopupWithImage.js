import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImg = this._popupSelector.querySelector('.popup__image');
      this._popupName = this._popupSelector.querySelector('.popup__image-title');
    }

    open(name, link) {//если ошибка ундефинед
      this._popupImg.alt = name;
      this._popupName.textContent = name;
      this._popupImg.src = link;
      super.open();
    }
  }