export default class User {
  private _id = '';
  private _username: string;

  constructor(username: string) {
    this._username = username;
  }

  get id() {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get username() {
    return this._username;
  }
}
