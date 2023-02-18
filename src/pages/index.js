import './index.css';

import { 
  dataUser, 
  openProfileBtn, 
  popupBtnAvatar, 
  openCardBtn, 
  textInput, 
  nameInput, 
  setting, } from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from "../components/FormValidator.js";
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
    userInfo.setUserInfo(user);
    dataUser.userInfo = user;
    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

  const userInfo = new UserInfo({
    userName: '.profile__name', 
    userDesc: '.profile__text',
    avatar: '.profile__avatar'
  });
// функция редактирования профиля
const editUserInfo = fieldObj => {
  api.editUserInfo(fieldObj)
  .then(res => {
    userInfo.setUserInfo(res);
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
  api.editAvatar(fieldObj)
  .then(() => {
    userInfo.setUserAvatar(fieldObj);
    popupWithAvatar.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupWithAvatar.renderLoading(false);
  });
}
// popup open/close

const openPopupProfile = () => {
  popupWithProfile.open();

  const usersInfo = userInfo.getUserInfo();

  nameInput.value = usersInfo.name;
  textInput.value = usersInfo.desc;
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
  popupSelector: '.popup_delete-card',
  deleteCard: card => {
    deleteCard(card);
}});
popupWithConfirmation.setEventListeners();

const createCard = item => {
  const card = new Card( 
    item, 
    '.list-item-template', {
    dataUser,  
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: () => {
      popupWithConfirmation.open();
      popupWithConfirmation.setCardDelete(card);
    },
    handleSetLikes: () => {
      if(!card.isMyLiked()) {
        likeCard(card);
      } else {
        deleteLikeCard(card);
      }
    }
  })
  const element = card.generateCard();
  return element;
};

const section = new Section({ 
  renderer: (item) => {
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
//валидация форм
const formValidators = {};
const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(setting, formElement)
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}
enableValidation(setting);
// события
openProfileBtn.addEventListener('click', openPopupProfile);
openCardBtn.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  popupWithCard.open();
});
popupBtnAvatar.addEventListener('click', () => {
  formValidators['avatar'].resetValidation();
  popupWithAvatar.open();
});