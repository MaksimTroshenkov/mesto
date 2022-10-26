const POPUP_ACTIVE_CLASS = "popup_active";

const openFormBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup_edit-form");
const popupContainer = document.querySelector(".popup__container");
const popupCloseBtn = document.querySelectorAll(".popup__close-button");

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

const popupFormCard = document.querySelector(".popup_cards-form");

const formCard = document.querySelector(".popup_add-form");
const openCardBtn = document.querySelector(".profile__add-button");

const popupImage = document.querySelector(".popup_image");
const popupTitle = document.querySelector(".popup__image-title");
const popupImageElement = document.querySelector(".popup__image");

function start () {
  nameInput.value = profileName.innerText;
  textInput.value = profileText.innerText;
}

openFormBtn.addEventListener("click", () => {
  popup.classList.add(POPUP_ACTIVE_CLASS);
  start ();
});

popup.addEventListener("click", (event) => {
  if(!popupContainer.contains(event.target) || event.target === popupCloseBtn || event.target === submitBtn) {
    popup.classList.remove(POPUP_ACTIVE_CLASS);
  }
});

function addForm (evt) {
  evt.preventDefault();
  profileName.innerText = nameInput.value;
  profileText.innerText = textInput.value;
}
popupForm.addEventListener("submit", addForm);

const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const handleOpenCardPhoto = (cardsName, cardsUrl) => {
popupImage.classList.add(POPUP_ACTIVE_CLASS);
popupTitle.innerHTML = cardsName.innerHTML;
popupImageElement.src = cardsUrl.src;
}; 

const createCards = (item) => {
  const element = template.cloneNode(true);

  const removeBtn = element.querySelector(".card-item__action_type_delete");

  const cardsName = element.querySelector(".element__text");
  cardsName.textContent = item.name;

  const cardsUrl = element.querySelector(".element__image");
  cardsUrl.src = item.link;

  removeBtn.addEventListener("click", () => removeCard(element));
  cardsUrl.addEventListener("click", () => handleOpenCardPhoto(cardsName, cardsUrl))

  list.prepend(element);
};

cards.forEach(createCards);



openCardBtn.addEventListener("click", () => {
  formCard.classList.add(POPUP_ACTIVE_CLASS);
});

function closePopup(popup) {
  popup.classList.remove(POPUP_ACTIVE_CLASS);
}

popupCloseBtn.forEach(function(item) {
  item.addEventListener("click", () => closePopup(popupClosePlease));
  const popupClosePlease = item.closest('.popup');
});


const formCardSubmit = (event) => {
  event.preventDefault();

  const newCardName = inputTextCard.value;
  const newCardUrl = inputUrlCard.value;
  newCardUrl.alt = inputTextCard.value

  createCards({
    name: newCardName,
    link: newCardUrl
  });
  closePopup(formCard);
}

popupFormCard.addEventListener("submit", formCardSubmit);


const removeCard = (element) => {
  element.remove();
}