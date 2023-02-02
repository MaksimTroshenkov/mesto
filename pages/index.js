import { cards, enableValidation, openProfileBtn, popupProfileForm, nameInput, textInput, list, inputTextCard, inputUrlCard, popupFormCard, openCardBtn } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


const popupWithImage = new PopupWithImage(".popup_image");
const handleCardClick = (name, link) => {
  popupWithImage.setEventListener();
  popupWithImage.open(name, link);
};

function createCard(item) {
  const card = new Card(item.name, item.link, '.list-item-template', handleCardClick);
  const element = card.generateCard();

  return element;
}

const cardList = new Section({ data: cards, renderer: (item) => {
  const card = new Card(item.name, item.link, '.list-item-template', handleCardClick);
  const element = card.generateCard();
  cardList.setItem(element);
}}, ".element");
cardList.renderItems();

const validationProfile = new FormValidator(enableValidation, popupProfileForm);
validationProfile.enableValidation();

const validationCard = new FormValidator(enableValidation, popupFormCard);
validationCard.enableValidation();

const userInfo = new UserInfo ({name: ".profile__name", text: ".profile__text"});

const popupWithСard = new PopupWithForm({ popupSelector: ".popup_add-form", handleCardFormSubmit: () => {
    const newCardName = inputTextCard.value;
    const newCardUrl = inputUrlCard.value;
  
    list.prepend(createCard({
      name: newCardName,
      link: newCardUrl
    }));
  popupWithСard.close();
  validationCard.resetValidation(); 
}
});
popupWithСard.setEventListener();

const popupWithProfile = new PopupWithForm({ popupSelector: ".popup_edit-form", handleCardFormSubmit: (text) => {
  userInfo.setUserInfo(text)
  popupWithProfile.close();
}
});
popupWithProfile.setEventListener();


openProfileBtn.addEventListener("click", () => {
  popupWithProfile.open();
  const {name, text} = userInfo.getUserInfo();
  nameInput.value = name;
  textInput.value = text;
});

openCardBtn.addEventListener("click", () => {
  popupWithСard.open();
});