const POPUP_ACTIVE_CLASS = "popup_active";
const popups = document.querySelectorAll(".popup");
const openProfileBtn = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector('.popup_edit-form');
const popupProfileForm = profilePopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const nameInput = document.querySelector(".popup__input_type_name");
const textInput = document.querySelector(".popup__input_type_text");
const list = document.querySelector(".element");
const template = document.querySelector("#list-item-template").content.querySelector(".element__list");
const inputTextCard = document.querySelector(".popup__input_type_name-card");
const inputUrlCard = document.querySelector(".popup__input_type_link-card");
const popupFormCard = document.querySelector(".popup__form-cards");
const formCard = document.querySelector(".popup_add-form");
const openCardBtn = document.querySelector(".profile__add-button");
const popupImage = document.querySelector(".popup_image");
const popupTitle = document.querySelector(".popup__image-title");
const popupImageElement = document.querySelector(".popup__image");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const body = document.querySelector(".body");

function openPopup(popups) {
  popups.classList.add(POPUP_ACTIVE_CLASS);
  body.addEventListener('keydown', closeEscape);
};

popups.forEach(function(item) {
  item.addEventListener("click",function(evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(item);
    }
  });
});

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
  openPopup(profilePopup);
  setInputValuesEditProfile ();
});

function editProfile (evt) {
  evt.preventDefault();
  profileName.innerText = nameInput.value;
  profileText.innerText = textInput.value;
  closePopup(profilePopup);
};  
popupProfileForm.addEventListener("submit", editProfile);

const createCard = (item) => {
  const element = template.cloneNode(true);
  const elementLikeButton = element.querySelector(".element__button");
  const removeBtn = element.querySelector(".card-item__action_type_delete");
  const cardName = element.querySelector(".element__text");
  const cardUrl = element.querySelector(".element__image");

  cardName.textContent = item.name; 
  cardUrl.src = item.link;
  cardUrl.alt = item.name;

  removeBtn.addEventListener("click", () => removeCard(element));
  cardUrl.addEventListener("click", () => {
    openPopup(popupImage); 
    popupTitle.textContent = cardName.textContent; 
    popupImageElement.src = cardUrl.src; 
    popupImageElement.alt = cardName.textContent; 
  });

  elementLikeButton.addEventListener("click", () => {
    elementLikeButton.classList.toggle("element__button_active");
  });

  return element;
};

cards.forEach(element => {
  list.prepend(createCard(element));
});

openCardBtn.addEventListener("click", () => {
  openPopup(formCard);
});

function closePopup(element) {
  element.classList.remove(POPUP_ACTIVE_CLASS);
  body.removeEventListener('keydown', closeEscape);
};

popups.forEach(function(item) {
  const popupAllClose = item.querySelector(".popup__close-button");
  popupAllClose.addEventListener("click", function() {
    closePopup(item);
})
});


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
};
popupFormCard.addEventListener("submit", handleCardFormSubmit);


const removeCard = (element) => {
  element.remove();
};