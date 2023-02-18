import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, deleteCard }) {
    super(popupSelector);
    this._submitDeleteCardBtn = document.querySelector(".popup__submit_type_delete");
    this._deleteCard = deleteCard;
  }

  setCardDelete(card) {
    this._card = card;
  }


  setEventListeners() {
    super.setEventListeners();
    this._submitDeleteCardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this._deleteCard(this._card);
    })
  }
}