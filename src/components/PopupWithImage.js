import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._elementImage = this._popup.querySelector(".popup__image");
    this._elementTitle = this._popup.querySelector(".popup__image-title");
  }

  open(name, link) {
    this._elementImage.src = link;
    this._elementImage.alt = name;
    this._elementTitle.textContent = name;
    super.open();
  }
}