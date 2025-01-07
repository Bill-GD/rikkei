import { showError } from './helper.js';
import { Booking } from './models/booking.js';
import { Person } from './models/person.js';
import { DeluxeRoom, Room, StandardRoom, SuiteRoom } from './models/room.js';

type RoomType = 'standard' | 'deluxe' | 'suite';

export default class HotelManager {
  protected _rooms: Room[];
  protected _bookings: Booking[];
  protected _customers: Person[];

  constructor(rooms: Room[] = [], bookings: Booking[] = [], customers: Person[] = []) {
    this._rooms = rooms;
    this._bookings = bookings;
    this._customers = customers;
  }

  // Thêm phòng mới vào danh sách phòng.
  addRoom(type: RoomType, pricePerNight: number): void {
    const ids = this._rooms.map(e => e.getDetails().roomId).sort((a, b) => b - a);
    ids.length <= 0 && ids.push(0);
    // const ids = this._rooms
    switch (type) {
      case 'standard':
        this._rooms.push(new StandardRoom(ids[0] + 1));
        break;
      case 'deluxe':
        this._rooms.push(new DeluxeRoom(ids[0] + 1));
        break;
      case 'suite':
        this._rooms.push(new SuiteRoom(ids[0] + 1));
        break;
    }
  }

  // Thêm khách hàng mới vào danh sách khách hàng.
  addCustomer(name: string, email: string, phone: string): Person {
    const ids = this._customers.map(e => e.getDetails().id).sort((a, b) => b - a);
    ids.length <= 0 && ids.push(0);
    const newPerson = new Person(ids[0] + 1, name, email, phone);
    this._customers.push(newPerson);
    return newPerson;
  }

  // Đặt phòng cho khách hàng và trả về thông tin đặt phòng.
  bookRoom(customerId: number, roomId: number, nights: number): Booking | void {
    const roomIdx = this._rooms.findIndex(e => e.getDetails().roomId === roomId);
    if (roomIdx < 0) {
      return showError(`No room of this ID (${roomId}) exists`);
    }
    if (!this._rooms[roomIdx].getDetails().isAvailable) {
      return showError(`Room of ID ${roomId} is already booked`);
    }
    const customerIdx = this._customers.findIndex(e => e.getDetails().id === customerId);
    if (customerIdx < 0) {
      return showError(`No customer of this ID (${customerId}) exists`);
    }

    const ids = this._bookings.map(e => e.getDetails().bookingId).sort((a, b) => b - a);
    ids.length <= 0 && ids.push(0);
    const newBooking = new Booking(
      ids[0] + 1,
      this._customers[customerIdx],
      this._rooms[roomIdx],
      nights,
      this._rooms[roomIdx].calculateCost(nights),
    );
    this._rooms[roomIdx].bookRoom();
    this._bookings.push(newBooking);
    return newBooking;
  }

  // Trả phòng.
  releaseRoom(roomId: number): void {
    const roomIdx = this._rooms.findIndex(e => e.getDetails().roomId === roomId);
    if (roomIdx < 0) {
      return showError(`No room of this ID (${roomId}) exists`);
    }
    if (this._rooms[roomIdx].getDetails().isAvailable) {
      return showError(`Room of ID ${roomId} is not booked`);
    }

    this._rooms[roomIdx].releaseRoom();
    // this._bookings.splice(this._bookings.findIndex(book => book.getDetails().room.getDetails().roomId === roomId), 1);
  }

  // Hiển thị danh sách các phòng còn trống (Sử dụng filter).
  listAvailableRooms(): void {
    const availableRooms = this._rooms.filter(e => e.getDetails().isAvailable);
    let res = '';
    for (let i = 0; i < availableRooms.length; i++) {
      const room = availableRooms[i].getDetails();
      if (i <= 0) res += `=====AVAILABLE ROOMS=====\n`;
      res +=
        ` - ID: ${room.roomId}\n` +
        ` - Type: ${room.type}\n` +
        ` - Price: ${room.pricePerNight}\n` +
        `-------------\n`;
    }
    console.log(res + '=========================');
  }

  // Hiển thị danh sách đặt phòng của một khách hàng (Sử dụng filter).
  listBookingsByCustomer(customerId: number): void {
    const hasCustomer = this._customers.findIndex(e => e.getDetails().id === customerId) >= 0;
    if (!hasCustomer) {
      return showError(`No customer of this ID (${customerId}) exists`);
    }

    const bookings = this._bookings.filter(e => e.getDetails().customer.id === customerId);
    if (bookings.length < 0) return console.log(`Customer (${customerId}) have no booking`);
    let res = '';

    for (let i = 0; i < bookings.length; i++) {
      const booking = bookings[i].getDetails(),
        room = booking.room.getDetails();

      if (i <= 0) res += `=====BOOKING OF CUSTOMER ${customerId}=====\n`;
      res +=
        ` - ID: ${booking.bookingId}\n` +
        ` - Customer: ${booking.customer.name}\n` +
        ` - Room ID: ${room.roomId}\n` +
        ` - Room type: ${room.type}\n` +
        ` - Availability: ${room.isAvailable ? 'Available' : 'Booked'}\n` +
        ` - Room price: ${room.pricePerNight}\n` +
        ` - Nights: ${booking.nights}\n` +
        ` - Cost: ${booking.totalCost}\n` +
        `-------------\n`;
    }
    console.log(res + '===========================================');
  }

  // Tính tổng doanh thu từ các đặt phòng (Sử dụng reduce).
  calculateTotalRevenue(): number {
    return this._bookings.reduce(
      (p, c) => p + c.getDetails().totalCost,
      0,
    );
  }

  // Đếm số lượng từng loại phòng (Sử dụng reduce và map).
  getRoomTypesCount(): void {
    const counter = {
      'standard': this._rooms.reduce((p, c) => c.getDetails().type === 'standard' ? ++p : p, 0),
      'deluxe': this._rooms.reduce((p, c) => c.getDetails().type === 'deluxe' ? ++p : p, 0),
      'suite': this._rooms.reduce((p, c) => c.getDetails().type === 'suite' ? ++p : p, 0),
    };

    console.table(counter);
  }

  // Áp dụng giảm giá cho một phòng cụ thể (Sử dụng findIndex).
  applyDiscountToRoom(roomId: number, discountRate: number): void {
    const roomIdx = this._rooms.findIndex(e => e.getDetails().roomId === roomId);
    if (roomIdx < 0) {
      return showError(`No room of this ID (${roomId}) exists`);
    }

    this._rooms[roomIdx].applyDiscount(discountRate);
  }

  // Hiển thị các dịch vụ bổ sung của phòng (Sử dụng find).
  getRoomServices(roomId: number): void {
    const room = this._rooms.find(e => e.getDetails().roomId === roomId);
    if (room === undefined) {
      return showError(`No room of this ID (${roomId}) exists`);
    }
    console.log(room.getAdditionalServices());
  }

  // Hiển thị chính sách hủy phòng (Sử dụng find).
  getCancellationPolicy(roomId: number): void {
    const room = this._rooms.find(e => e.getDetails().roomId === roomId);
    if (room === undefined) {
      return showError(`No room of this ID (${roomId}) exists`);
    }
    console.log(room.getCancellationPolicy());
  }
}
