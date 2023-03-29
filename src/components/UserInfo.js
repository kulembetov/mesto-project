export default class UserInfo {
  constructor(userConfig, { getUser }) {
    this._userName = document.querySelector(userConfig.userNameSelector);
    this._userAbout = document.querySelector(userConfig.userAboutSelector);
    this._userAvatar = document.querySelector(userConfig.userAvatarSelector);
    this._getUser = getUser;
  }

  async getUserInfo() {
    this._user = await this._getUser();
    return this._user;
  }

  // Добавление информации о пользователе
  setUserInfo(name, about) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }

  // Добавление изображения пользователя
  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
