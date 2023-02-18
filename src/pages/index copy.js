import './index.css';

import { 
  dataUser, 
  openProfileBtn, 
  popupBtnAvatar, 
  openCardBtn, 
  textInput, 
  nameInput } from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
//import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

// API OOP

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "658a05ad-e0ae-4a38-b4b6-8589e1bc4948",
    "Content-Type": "application/json"
  }
});

// Функции для взаимодействия с сервером

// Информация профиля и создание карточек

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    //setUserInfo(user);
    //userInfo.setUserAvatar(user.avatar);
    //dataUser.userInfo = user;
    //section.renderItems(cards);
    console.log(user)
  })
  .catch((err) => {
    console.log(err);
  });
// функция редактирования профиля
const editUserInfo = fieldObj => {
  api.editUserInfo(fieldObj)
  .then(res => {
    setUserInfo(res);
    popupWithProfile.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupWithProfile.renderLoading(false);
  });
}
// функция добавления карточки
const addCard = fieldObj => {
  api.addCard(fieldObj)
  .then(res => {
    section.addItem(createCard(res));
    popupWithCard.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupWithCard.renderLoading(false);
  });
}
// функция удаления карточки
const deleteCard = card => {
  api.deleteCard(card.cardId)
  .then(() => {
    card._element.remove();
    popupWithConfirmation.close();
  })
  .catch(err => console.log(err));
}
// лайк карточки
const likeCard = card => {
  api.likeCard(card.cardId)
  .then(res => {
    card.setLikes(res);
  })
  .catch(err => console.log(err));
}
// удаление лайка с карточки
const deleteLikeCard = card => {
  api.deleteLikeCard(card.cardId)
  .then(res => {
    card.setLikes(res);
  })
  .catch(err => console.log(err));
}
// функция изменения аватара
const editAvatar = fieldObj => {
  api.editAvatar(fieldObj.edit)
  .then(() => {
    userInfo.setUserAvatar(fieldObj.edit);
    popupWithAvatar.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupWithAvatar.renderLoading(false);
  });
}
// popup open/close
const userInfo = new UserInfo({
  userName: '.profile__name', 
  userDesc: '.profile__text',
  avatar: '.profile__avatar'
});
const setUserInfo = obj => {
  userInfo.setUserInfo(obj);
}
const openPopupProfile = () => {
  popupWithProfile.open();

  const usersInfo = userInfo.getUserInfo();

  nameInput.value = usersInfo.name;
  textInput.value = usersInfo.desc;
}
const openPopupCard = () => {
  popupWithCard.open();
}
const openPopupAvatar = () => {
  popupWithAvatar.open();
}
// profile edit
const popupWithProfile = new PopupWithForm({
  popupSelector: '.popup_edit-form', 
  handleFormSubmit: fieldObj => {
    editUserInfo(fieldObj);
    popupWithProfile.renderLoading(true);
}});
popupWithProfile.setEventListeners();
// все, что связано с карточками
const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();
const popupWithConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup__delete-card',
  deleteCard: card => {
    deleteCard(card);
}});
popupWithConfirmation.setEventListeners();

const createCard = item => {
  const card = new Card(item, '.list-item-template', {
    dataUser,  
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: () => {
      popupWithConfirmation.open();
      popupWithConfirmation.setCardDelete(card);
    },
    handleSetLikes: () => {
      if(!card.isCardLiked()) {
        likeCard(card);
      } else {
        deleteLikeCard(card);
      }
    }
  })
  const element = card.generateCard();
  return element;
};

const section = new Section({ renderer: (item) => {
  section.addItem(createCard(item));
}}, ".element");
// popup добавления карточки пользователем
const popupWithCard = new PopupWithForm({
  popupSelector: '.popup_add-form',
  handleFormSubmit: fieldObj => {  
  addCard(fieldObj);
  popupWithCard.renderLoading(true);
}});
popupWithCard.setEventListeners();
// avatar edit
const popupWithAvatar = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleFormSubmit: fieldObj => {
  editAvatar(fieldObj);
  popupWithAvatar.renderLoading(true);
}});
popupWithAvatar.setEventListeners();
// события
openProfileBtn.addEventListener('click', openPopupProfile);
openCardBtn.addEventListener('click', openPopupCard);
popupBtnAvatar.addEventListener('click', openPopupAvatar);

/* const validationProfile = new FormValidator(enableValidation, popupProfileForm);
validationProfile.enableValidation();

const validationCard = new FormValidator(enableValidation, popupFormCard);
validationCard.enableValidation(); */