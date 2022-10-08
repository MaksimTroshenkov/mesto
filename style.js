const POPUP_ACTIVE_CLASS = "popup_active";

const openFormBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const popupCloseBtn = document.querySelector(".popup__close");

const popupForm = document.querySelector(".popup__form");
const submitBtn = document.querySelector(".popup__submit");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const nameInput = document.querySelector(".popup__input_name");
const textInput = document.querySelector(".popup__input_text");

openFormBtn.addEventListener("click", () => {
  popup.classList.add(POPUP_ACTIVE_CLASS);
});

popup.addEventListener("click", (event) => {
  if(!popupContainer.contains(event.target) || event.target === popupCloseBtn || event.target === submitBtn) {
    popup.classList.remove(POPUP_ACTIVE_CLASS);
  }
});

function defoult () {
  nameInput.value = profileName;
  textInput.value = profileText;
}
defoult ();

function addForm (evt) {
  evt.preventDefault();
  profileName.innerText = nameInput.value;
  profileText.innerText = textInput.value;
}
popupForm.addEventListener("submit", addForm);