const POPUP_ACTIVE_CLASS = "popup_active";
const popups = document.querySelectorAll(".popup");
const openProfileBtn = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector('.popup_edit-form');
const popupContainer = document.querySelector(".popup__container");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const popupForm = document.querySelector(".popup__form");
const submitBtn = document.querySelector(".popup__submit");
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
const body = document.querySelector(".body");

function openPopup(popups) {
  popups.classList.add(POPUP_ACTIVE_CLASS);
  body.addEventListener('keydown', closeEscape);
}

popups.forEach(function(item) {
  item.addEventListener("click",function(evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(item);
    }
  });
});

function closeEscape (evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
}

function editProfile  () {
  nameInput.value = profileName.innerText;
  textInput.value = profileText.innerText;
}

openProfileBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  editProfile();
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = textInput.value;
  closePopup(profilePopup);
};  
popupForm.addEventListener("submit", handleFormSubmit);

const handleOpenCardPhoto = (cardName, cardUrl) => {
  openPopup(popupImage);
  popupTitle.textContent = cardName.textContent;
  popupImageElement.src = cardUrl.src;
  popupImageElement.alt = cardName.textContent;
}; 

const copyCard = (item) => {
  const element = template.cloneNode(true);
  const elementLikeBtn = element.querySelector(".element__button");

  const removeBtn = element.querySelector(".card-item__action_type_delete");

  const cardName = element.querySelector(".element__text");
  cardName.textContent = item.name;

  const cardUrl = element.querySelector(".element__image");
  cardUrl.src = item.link;
  cardUrl.alt = item.name;

  removeBtn.addEventListener("click", () => removeCard(element));
  cardUrl.addEventListener("click", () => handleOpenCardPhoto(cardName, cardUrl))

  elementLikeBtn.addEventListener("click", () => {
    elementLikeBtn.classList.toggle("element__button_active");
  });

  return element;
};

cards.forEach(element => {
  list.prepend(copyCard(element));
});

openCardBtn.addEventListener("click", () => {
  openPopup(formCard);
});

function closePopup(element) {
  element.classList.remove(POPUP_ACTIVE_CLASS);
  body.removeEventListener('keydown', closeEscape);
};

popupCloseButtons.forEach(function(item) {
  item.addEventListener("click", () => closePopup(popupClosePlease));
  const popupClosePlease = item.closest('.popup');
}); 


const handleCardFormSubmit = (event) => {
  event.preventDefault();

  const newCardName = inputTextCard.value;
  const newCardUrl = inputUrlCard.value;

  list.prepend(copyCard({
    name: newCardName,
    link: newCardUrl
  }));

  closePopup(formCard); 
};

popupFormCard.addEventListener("submit", handleCardFormSubmit);


const removeCard = (element) => {
  element.remove();
};