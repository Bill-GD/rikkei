export default abstract class Room {
  protected _roomId: number;
  protected _type: string;
  protected _pricePerNight: number;
  protected _isAvailable: boolean;

  protected constructor(roomId: number, type: string, pricePerNight: number, isAvailable: boolean = true) {
    this._roomId = roomId;
    this._type = type;
    this._pricePerNight = pricePerNight;
    this._isAvailable = isAvailable;
  }

  getDetails() {
    return {
      roomId: this._roomId,
      type: this._type,
      pricePerNight: this._pricePerNight,
      isAvailable: this._isAvailable,
    };
  }

  // Đặt phòng (chuyển trạng thái isAvailable thành false).
  bookRoom(): void {
    this._isAvailable = false;
  }

  // Trả phòng (chuyển trạng thái isAvailable thành true).
  releaseRoom(): void {
    this._isAvailable = true;
  }

  //: Tính chi phí dựa trên số đêm (Phương thức trừu tượng).
  abstract calculateCost(nights: number): number;

  // Trả về danh sách các dịch vụ bổ sung (Phương thức trừu tượng).
  abstract getAdditionalServices(): string[];

  //: Tính giá sau khi áp dụng giảm giá (Phương thức trừu tượng).
  abstract applyDiscount(discountRate: number): number;

  //Trả về chính sách hủy phòng (Phương thức trừu tượng).
  abstract getCancellationPolicy(): string;
}

export class StandardRoom extends Room {
  // Giá cố định, không có dịch vụ bổ sung.
  // Chính sách hủy: Hoàn lại 100% nếu hủy trước 1 ngày.

  constructor(roomId: number, isAvailable: boolean = true) {
    super(roomId, 'standard', 300, isAvailable);
  }

  override calculateCost(nights: number): number {
    return this._pricePerNight * nights;
  }

  override getAdditionalServices(): string[] {
    return [];
  }

  override applyDiscount(discountRate: number): number {
    this._pricePerNight *= 1 - discountRate;
    return this._pricePerNight;
  }

  override getCancellationPolicy(): string {
    return 'Standard room: Refund 100% if cancel 1 day or more in advance.';
  }
}

export class DeluxeRoom extends Room {
  // Giá cao hơn, có dịch vụ ăn sáng.
  // Chính sách hủy: Hoàn lại 50% nếu hủy trước 2 ngày.

  constructor(roomId: number, isAvailable: boolean = true) {
    super(roomId, 'deluxe', 500, isAvailable);
  }

  override calculateCost(nights: number): number {
    return this._pricePerNight * nights;
  }

  override getAdditionalServices(): string[] {
    return ['breakfast'];
  }

  override applyDiscount(discountRate: number): number {
    this._pricePerNight *= 1 - discountRate;
    return this._pricePerNight;
  }

  override getCancellationPolicy(): string {
    return 'Deluxe room: Refund 50% if cancel 2 days in advance.';
  }
}

export class SuiteRoom extends Room {
  // Giá cao nhất, có dịch vụ spa, minibar.
  // Chính sách hủy: Không hoàn lại tiền nếu hủy.

  constructor(roomId: number, isAvailable: boolean = true) {
    super(roomId, 'suite', 900, isAvailable);
  }

  override calculateCost(nights: number): number {
    return this._pricePerNight * nights;
  }

  override getAdditionalServices(): string[] {
    return ['spa', 'minibar'];
  }

  override applyDiscount(discountRate: number): number {
    this._pricePerNight *= 1 - discountRate;
    return this._pricePerNight;
  }

  override getCancellationPolicy(): string {
    return 'Suite room: No refund.';
  }
}
