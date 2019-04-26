export default class User {
  constructor(private _username: string) {}

  get username() {
    return this._username;
  }
}
