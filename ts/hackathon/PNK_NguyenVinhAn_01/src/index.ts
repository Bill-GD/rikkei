import { showError } from './helper.js'; // add .js for the compiled file (using ES6 modules)
import HotelManager from './manager.js';

enum Input {
  addCustomer = 1,
  addRoom,
  book,
  release,
  listAvailable,
  listBooked,
  totalRev,
  countRoomByType,
  applyDiscount,
  listServices,
  showCancelPolicy,
  end,
}

class Main {
  run(): void {
    const manager = new HotelManager();
    let input: Input;

    while (true) {
      input = Number(prompt(
        `Hotel Manager\n\n` +
        `${Input.addCustomer}. Thêm khách hàng.\n` +
        `${Input.addRoom}. Thêm phòng.\n` +
        `${Input.book}. Đặt phòng.\n` +
        `${Input.release}. Trả phòng.\n` +
        `${Input.listAvailable}. Hiển thị danh sách phòng còn trống (sử dụng filter).\n` +
        `${Input.listBooked}. Hiển thị danh sách đặt phòng của khách hàng (sử dụng filter).\n` +
        `${Input.totalRev}. Tính tổng doanh thu từ các đặt phòng (sử dụng reduce).\n` +
        `${Input.countRoomByType}. Đếm số lượng từng loại phòng (sử dụng reduce hoặc map).\n` +
        `${Input.applyDiscount}. Áp dụng giảm giá cho phòng (sử dụng findIndex).\n` +
        `${Input.listServices}. Hiển thị các dịch vụ bổ sung của phòng (sử dụng find).\n` +
        `${Input.showCancelPolicy}. Hiển thị chính sách hủy phòng (sử dụng find).\n` +
        `${Input.end}. Thoát chương trình.`,
      ));

      switch (input) {
        case Input.addCustomer:
          const cusName = String(prompt(`Enter customer's name`));
          const cusEmail = String(prompt(`Enter customer's email`));
          const cusPhone = String(prompt(`Enter customer's phone`));
          if (cusName.length <= 0 || cusEmail.length <= 0 || cusPhone.length <= 0) {
            showError('All fields must be filled');
            break;
          }
          if (!cusEmail.match(/^[a-zA-Z][a-zA-Z0-9.]*@[a-z.]+\.[a-z]{2,3}/)) {
            showError('Email is invalid');
            break;
          }
          if (!cusPhone.match(/[0-9]{10,11}/)) {
            showError('Phone number is invalid');
            break;
          }
          manager.addCustomer(cusName, cusEmail, cusPhone);
          break;
        case Input.addRoom:
          const roomType = String(prompt('Enter room type\nAllowed types: standard, deluxe, suite'));
          if (roomType !== 'standard' && roomType !== 'deluxe' && roomType !== 'suite') {
            showError('Invalid room type');
            break;
          }
          manager.addRoom(roomType, 1);
          break;
        case Input.book:
          const cusId = Number(prompt('Enter customer ID'));
          const roomId = Number(prompt('Enter room ID'));
          const nightCount = Number(prompt('Enter night count'));
          if (isNaN(cusId) || isNaN(roomId) || isNaN(nightCount) || cusId < 0 || roomId < 0 || nightCount < 0) {
            showError('Invalid input.');
            break;
          }
          manager.bookRoom(cusId, roomId, nightCount);
          break;
        case Input.release:
          const relRoomId = Number(prompt('Enter room ID'));
          if (isNaN(relRoomId)) {
            showError('Invalid room ID');
            break;
          }
          manager.releaseRoom(relRoomId);
          break;
        case Input.listAvailable:
          manager.listAvailableRooms();
          break;
        case Input.listBooked:
          const cusBookedId = Number(prompt('Enter customer ID'));
          if (isNaN(cusBookedId) || cusBookedId < 0) {
            showError('Invalid customer ID');
            break;
          }
          manager.listBookingsByCustomer(cusBookedId);
          break;
        case Input.totalRev:
          console.log(`Total revenue: ${manager.calculateTotalRevenue()}`);
          break;
        case Input.countRoomByType:
          manager.getRoomTypesCount();
          break;
        case Input.applyDiscount:
          const disRoomId = Number(prompt('Enter room ID'));
          if (isNaN(disRoomId)) {
            showError('Invalid room ID');
            break;
          }
          const disRate = Number(prompt('Enter discount rate'));
          if (isNaN(disRate) || disRate < 0 || disRate > 1) {
            showError('Invalid discount rate');
            break;
          }
          manager.applyDiscountToRoom(disRoomId, disRate);
          break;
        case Input.listServices:
          const serRoomId = Number(prompt('Enter room ID'));
          if (isNaN(serRoomId)) {
            showError('Invalid room ID');
            break;
          }
          manager.getRoomServices(serRoomId);
          break;
        case Input.showCancelPolicy:
          const canRoomId = Number(prompt('Enter room ID'));
          if (isNaN(canRoomId)) {
            showError('Invalid room ID');
            break;
          }
          manager.getCancellationPolicy(canRoomId);
          break;
        case Input.end:
          showError('App terminated.');
          return;
      }
    }
  }
}

const app = new Main();
app.run();
