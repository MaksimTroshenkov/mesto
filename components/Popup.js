export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeEscape = this._closeEsc.bind(this);
    this._POPUP_ACTIVE_CLASS = "popup_active";
  }

  open() {
    this._popup.classList.add(this._POPUP_ACTIVE_CLASS);
    document.addEventListener("keydown", this._closeEscape);
  }

  close() {
    this._popup.classList.remove(this._POPUP_ACTIVE_CLASS);
    document.removeEventListener("keydown", this._closeEscape);
  }

  _closeEsc(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListener() {
    this._popup.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("popup_active")) {
        this.close();
      }
      if (e.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}