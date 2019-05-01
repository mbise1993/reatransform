export default class User {
  private _username: string;

  constructor(username: string) {
    this._username = username;
  }

  get id() {
    return '';
  }

  get username() {
    return this._username;
  }
}
