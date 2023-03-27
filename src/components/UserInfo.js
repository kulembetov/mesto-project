export default class UserInfo {
  constructor(userConfig) {
    this._userName = document.querySelector(userConfig.userNameSelector);
    this._userAbout = document.querySelector(userConfig.userAboutSelector);
    this._userAvatar = document.querySelector(userConfig.userAvatarSelector);
  }

  getUserInfo() {

  }
}
