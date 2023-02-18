import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      console.log(this._popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._inputList = this._popupSelector.querySelectorAll('.popup__input');
      this._popupForm = this._popupSelector.querySelector(".popup__form");
      this._submitButton = this._popupForm.querySelector(".popup__submit");
    }

    _getInputValues() {
      this._inputValues = {};
      this._inputList.forEach(input => {
          this._inputValues[input.name] = input.value;

      });
      return this._inputValues;
    }

    setEventListeners() {
      super.setEventListeners()
      this._popupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        this._handleFormSubmit(this._getInputValues())
      })
    }

    /*setInputValues(data) {
      this._inputList.forEach((input) => {
        input.value = data[input.name];
      });
    } */

    close() {
      this._popupForm.reset();
      super.close();
    }

    renderLoading(isLoading) {
      if (isLoading) {
        this._submitButton.textContent = "Сохранение...";
      } else {
        this._submitButton.textContent = "Сохранить";
      }
    }
  }
