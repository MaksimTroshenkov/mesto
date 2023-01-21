import { Card } from "./Card.js";
import { cards, enableValidation } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

const POPUP_ACTIVE_CLASS = "popup_active";
const popups = document.querySelectorAll(".popup");
const openProfileBtn = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector('.popup_edit-form');
const popupProfileForm = document.forms["profile-form"];
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const nameInput = document.querySelector(".popup__input_type_name");
const textInput = document.querySelector(".popup__input_type_text");
const list = document.querySelector(".element");
const inputTextCard = document.querySelector(".popup__input_type_name-card");
const inputUrlCard = document.querySelector(".popup__input_type_link-card");
const popupFormCard = document.forms["card-form"];
const formCard = document.querySelector(".popup_add-form");
const openCardBtn = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup_image");
const popupTitle = document.querySelector(".popup__image-title");
const popupImageElement = document.querySelector(".popup__image");
const body = document.querySelector(".body");
const sumbitCard = document.querySelector(".popup__submit_type_card");

const validationProfile = new FormValidator(enableValidation, popupProfileForm);
validationProfile.enableValidation();

const validationCard = new FormValidator(enableValidation, popupFormCard);
validationCard.enableValidation();

function openPopup(popups) {
  popups.classList.add(POPUP_ACTIVE_CLASS);
  body.addEventListener('keydown', closeEscape);
};

popups.forEach((item) => {
  item.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_active")) {
      closePopup(item)
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(item)
    }
  })
})

function closeEscape (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_active');
    closePopup(popupOpened);
  }
}

function setInputValuesEditProfile () {
  nameInput.value = profileName.innerText;
  textInput.value = profileText.innerText;
}

openProfileBtn.addEventListener("click", () => {
  validationProfile.resetValidation();
  openPopup(profilePopup);
  setInputValuesEditProfile();
});

function editProfile (evt) {
  evt.preventDefault();
  profileName.innerText = nameInput.value;
  profileText.innerText = textInput.value;
  closePopup(profilePopup);
};  
popupProfileForm.addEventListener("submit", editProfile);

const handleCardClick = (name, link) => {
  popupImageElement.src = link;
  popupTitle.textContent = name;
  popupImageElement.alt = name;
  openPopup(popupImage);
}

function createCard(item) {
  const card = new Card(item.name, item.link, '.list-item-template', handleCardClick);
  const element = card.generateCard();

  return element;
}

cards.forEach((item) => {
  list.append(createCard(item));
});

openCardBtn.addEventListener("click", () => {
  validationCard.resetValidation();
  openPopup(formCard);
});

function closePopup(element) {
  element.classList.remove(POPUP_ACTIVE_CLASS);
  body.removeEventListener('keydown', closeEscape);
};

const handleCardFormSubmit = (event) => {
  event.preventDefault();

  const newCardName = inputTextCard.value;
  const newCardUrl = inputUrlCard.value;

  list.prepend(createCard({
    name: newCardName,
    link: newCardUrl
  }));
  closePopup(formCard); 
  popupFormCard.reset();
  validationCard.buttonOff(sumbitCard);
};
popupFormCard.addEventListener("submit", handleCardFormSubmit);