export default class Card {
  constructor( cardItem, templateSelector, { dataUser, handleCardClick, handleDeleteClick, handleSetLikes }) {
    this._cardItem = cardItem;
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleSetLikes = handleSetLikes;
    this._likes = cardItem.likes;
    this._owner = cardItem.owner;
    this.cardId = cardItem._id;
    this._userId = dataUser.userInfo._Id;
  }


  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element__list')
      .cloneNode(true);

    return card;
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._cardLikeBtn = this._element.querySelector(".element__button");
    this._cardDeleteBtn = this._element.querySelector(".element__trash");
    this._cardLikeNumber = this._element.querySelector(".element__button-likes");
    this._cardImage = this._element.querySelector(".element__image");

    this._element.querySelector(".element__text").textContent = this._name; 
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;


    if(this._owner && this._owner._id != this._userId) {
      this._cardDeleteBtn.remove();
    }
    if(this._likes) {
      this._likesView();
    }

    this._setEventListeners();

    return this._element;
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _likesView() {
    if(this._likes.length > 0) {
      this._cardLikeNumber.textContent = this._likes.length;
    }
    if(this.isLiked()) {
      this._cardLikeBtn.classList.add('element__button_active');
    } else {
      this._cardLikeBtn.classList.remove('element__button_active');
    }
  }

  setLikes(data) {
    this._likes = data.likes;
    this._likesView();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._cardDeleteBtn.addEventListener('click', () => this._handleDeleteClick());
    this._cardLikeBtn.addEventListener('click', () => this._handleSetLikes());
  }
}