const POPUP_ACTIVE_CLASS = "popup_active";

const openFormBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
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