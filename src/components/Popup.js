export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeEscape = this._closeEsc.bind(this);
    this._POPUP_ACTIVE_CLASS = "popup_active";
  }

  open() {
    this._popupSelector.classList.add(this._POPUP_ACTIVE_CLASS);
    document.addEventListener("keydown", this._closeEscape);
  }

  close() {
    this._popupSelector.classList.remove(this._POPUP_ACTIVE_CLASS);
    document.removeEventListener("keydown", this._closeEscape);
  }

  _closeEsc(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup_active")) {
        this.close();
      }
      if (e.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}