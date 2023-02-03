import { cards, enableValidation, openProfileBtn, popupProfileForm, nameInput, textInput, list, inputTextCard, inputUrlCard, popupFormCard, openCardBtn } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';


const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListener();

const createCard = (item) => {
  const card = new Card({ name: item.name, link: item.link, selector: '.list-item-template', handleCardClick: (name, link) => {
    popupWithImage.open(name, link);
  }
});
  const element = card.generateCard();
  return element;
}

const cardList = new Section({ data: cards, renderer: (item) => {
  cardList.setItem(createCard(item));
}}, ".element");
cardList.renderItems();

const validationProfile = new FormValidator(enableValidation, popupProfileForm);
validationProfile.enableValidation();

const validationCard = new FormValidator(enableValidation, popupFormCard);
validationCard.enableValidation();

const userInfo = new UserInfo ({name: ".profile__name", text: ".profile__text"});

const popupWithCard = new PopupWithForm({ popupSelector: ".popup_add-form", handleCardFormSubmit: (card) => {
  cardList.setItem(createCard(card));
  popupWithCard.close();
}
});
popupWithCard.setEventListener();

const popupWithProfile = new PopupWithForm({ popupSelector: ".popup_edit-form", handleCardFormSubmit: (text) => {
  userInfo.setUserInfo(text)
  popupWithProfile.close();
}
});
popupWithProfile.setEventListener();


openProfileBtn.addEventListener("click", () => {
  validationCard.resetValidation(); 
  popupWithProfile.open();
  const {name, text} = userInfo.getUserInfo();
  nameInput.value = name;
  textInput.value = text;
});

openCardBtn.addEventListener("click", () => {
  validationCard.resetValidation(); 
  popupWithCard.open();
});