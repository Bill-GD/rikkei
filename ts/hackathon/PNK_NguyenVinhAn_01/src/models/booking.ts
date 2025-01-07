import { Person } from './person';
import { Room } from './room';

export class Booking {
  protected _bookingId: number;
  protected _customer: Person;
  protected _room: Room;
  protected _nights: number;
  protected _totalCost: number;

  constructor(bookingId: number, customer: Person, room: Room, nights: number, totalCost: number) {
    this._bookingId = bookingId;
    this._customer = customer;
    this._room = room;
    this._nights = nights;
    this._totalCost = totalCost;
  }

  getDetails() {
    return {
      bookingId: this._bookingId,
      customer: this._customer.getDetails(),
      room: this._room,
      nights: this._nights,
      totalCost: this._totalCost,
    };
  }
}
