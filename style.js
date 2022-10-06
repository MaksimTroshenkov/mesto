const POPUP_ACTIVE_CLASS = "popup_active";

const openFormBtn = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const popupCloseBtn = document.querySelector(".popup__close");

openFormBtn.addEventListener("click", () => {
  popup.classList.add(POPUP_ACTIVE_CLASS);
});

popup.addEventListener("click", (event) => {
  if(!popupContainer.contains(event.target) || event.target === popupCloseBtn) {
    popup.classList.remove(POPUP_ACTIVE_CLASS);
  }
});