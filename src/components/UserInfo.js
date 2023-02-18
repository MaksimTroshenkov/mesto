export default class UserInfo {
  constructor( data ) {
    this._name = document.querySelector(data.userName);
    this._desc = document.querySelector(data.userDesc);
    this._avatar = document.querySelector(data.avatar);
  }

  getUserInfo() {
    const userInfoObj = {
      name: this._name.textContent,
      desc: this._desc.textContent,
      avatar: this._avatar.src
    }
    return userInfoObj;
  }

  setUserInfo(obj) {
    this._name.textContent = obj.name;
    this._desc.textContent = obj.about;
    this._avatar.src = obj.avatar;
    this._id = obj.id;
  }
  setUserAvatar(obj){
    this._avatar.src = obj.avatar;
  }

  getUserId() {
    return this._id;
  }
}