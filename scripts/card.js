export class Card {
  constructor(name, link,  selector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;

    this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector(".element__list").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._element.querySelector(".element__text").textContent = this._name; 
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    //this._cardName.textContent = this._name; 
    //this._cardImage.src = this._link;
    //this._cardImage.alt = this._name;

    return this._element;
  }

  _likeElement() {
    this._element.querySelector(".element__button").classList.toggle("element__button_active");
  }

  _removeElement() {
    this._element.remove();
  }

  _setEventListener() {
    this._element.querySelector(".card-item__action_type_delete").addEventListener("click", () => {
      this._element.remove();
    });

    this._element.querySelector(".element__button").addEventListener("click", () => {
      this._likeElement();
    });

    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}