export class Person {
  protected _id: number;
  protected _name: string;
  protected _email: string;
  protected _phone: string;

  constructor(id: number, name: string, email: string, phone: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._phone = phone;
  }

  getDetails() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      phone: this._phone,
    };
  }
}
