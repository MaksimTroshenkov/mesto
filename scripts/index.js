const POPUP_ACTIVE_CLASS = "popup_active";

const openFormBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup_edit-form");
const popupContainer = document.querySelector(".popup__container");
const popupCloseBtn = document.querySelector(".popup__close-button");

const popupForm = document.querySelector(".popup__form");
const submitBtn = document.querySelector(".popup__submit");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const nameInput = document.querySelector(".popup__input_type_name");
const textInput = document.querySelector(".popup__input_type_text");

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














const list = document.querySelector(".element");
const template = document.querySelector("#list-item-template").content.querySelector(".element__list");
console.log(template);


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

const createCards = (item) => {
  const element = template.cloneNode(true);
  list.append(element);

  const cardsName = element.querySelector(".element__text");
  cardsName.textContent = item.name;

  const cardsUrl = element.querySelector(".element__image");
  cardsUrl.src = item.link;
};

cards.forEach(createCards);