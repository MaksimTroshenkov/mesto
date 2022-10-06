const openFormBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const POPUP_ACTIVE_CLASS = "popup_active";

openFormBtn.addEventListener("click", (event) => {
  console.log(event);
  popup.classList.add(POPUP_ACTIVE_CLASS);
});