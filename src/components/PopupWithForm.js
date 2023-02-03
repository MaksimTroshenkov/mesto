import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ({ popupSelector, handleCardFormSubmit }) {
    super(popupSelector);
    this._handleCardFormSubmit = handleCardFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    })
    return inputValues;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener("submit", e => {
      e.preventDefault();
      this._handleCardFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}