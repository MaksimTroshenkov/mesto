export class Card {
  constructor(name, link,  selector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector(".element__list").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();
    
    this._element.querySelector(".element__text").textContent = this._name; 
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    return this._element;
  }

  _likeElement() {
    this._elementLike.classList.toggle("element__button_active");
  }

  _removeElement() {
    this._element.remove();
  }

  _setEventListener() {
    this._elementImage = this._element.querySelector(".element__image");
    this._elementLike = this._element.querySelector(".element__button");

    this._element.querySelector(".card-item__action_type_delete").addEventListener("click", () => {
      this._removeElement();
    });

    this._elementLike.addEventListener("click", () => {
      this._likeElement();
    });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}