export default class UserInfo {
  constructor({ name, text }) {
    this._name = document.querySelector(name);
    this._text = document.querySelector(text);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      text: this._text.textContent
    }
  }
 
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._text.textContent = data.description;
  }
}