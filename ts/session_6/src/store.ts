class Customer extends Person {
  private _email: string;
  private _phone: string;

  constructor(id: number, name: string, email: string, phone: string) {
    super(id, name);
    this._email = email;
    this._phone = phone;
  }

  getContactDetails() {
    return { ...this };
  }
}

class Employee extends Person {
  private _position: string;

  constructor(id: number, name: string, position: string) {
    super(id, name);
    this._position = position;
  }

  get position() {
    return this._position;
  }

  getDetails() {
    return { ...this };
  }
}

class Product {
  private _id: number; // Mã sản phẩm duy nhất (số nguyên).
  private _name: string; // Tên sản phẩm (chuỗi).
  private _price: number; // Giá sản phẩm (số thực).
  private _quantity: number; // Số lượng còn lại trong kho (số nguyên).

  constructor(id: number, name: string, price: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  sell(quantity: number): void {
    this._quantity -= quantity;
  }

  restock(quantity: number): void {
    this._quantity += quantity;
  }

  getDetails() {
    return { ...this };
  }
}

type ProductItem = { product: Product, quantity: number };

class Invoice {
  private _customer: Customer; //  Khách hàng mua hàng (Customer).
  private _employee: Employee; //  Nhân viên xử lý giao dịch (Employee).
  private _products: ProductItem[]; //  Danh sách sản phẩm và số lượng mua ({product: Product, quantity: number}[]).
  private _totalAmount: number; //  Tổng số tiền hóa đơn (số thực).

  constructor(customer: Customer, employee: Employee, products: ProductItem[], totalAmount: number) {
    this._customer = customer;
    this._employee = employee;
    this._products = products;
    this._totalAmount = totalAmount;
  }

  get products() {
    return this._products;
  }

  // Tính tổng số tiền hóa đơn.
  calculateTotal(): void {

  }

  // Lấy thông tin chi tiết của hóa đơn.
  getInvoiceDetails() {
    return {
      customer: this._customer,
      employee: this._employee,
      products: this._products.map(e => {
        return {
          product: e.product,
          quantity: e.quantity,
        };
      }),
      totalAmount: this._totalAmount,
    };
  }
}

class StoreManager {
  private _customers: Customer[]; // Danh sách khách hàng (Customer[]).
  private _employees: Employee[]; // Danh sách nhân viên (Employee[]).
  private _products: Product[]; // Danh sách sản phẩm trong kho (Product[]).
  private _invoices: Invoice[]; // Danh sách hóa đơn (Invoice[]).

  constructor(customers: Customer[], employees: Employee[], products: Product[], invoices: Invoice[]) {
    this._customers = customers;
    this._employees = employees;
    this._products = products;
    this._invoices = invoices;
  }

  // Thêm khách hàng mới.
  addCustomer(name: string, email: string, phone: string): void {
    let ids = this._customers.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this._customers.push(new Customer(ids[ids.length - 1] + 1, name, email, phone));
  }

  // Thêm nhân viên mới.
  addEmployee(name: string, position: string): void {
    let ids = this._employees.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this._employees.push(new Employee(ids[ids.length - 1] + 1, name, position));
  }

  // Thêm sản phẩm mới vào kho.
  addProduct(name: string, price: number, quantity: number): void {
    let ids = this._products.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this._products.push(new Product(ids[ids.length - 1] + 1, name, price, quantity));
  }

  // Tạo hóa đơn mua hàng và giảm số lượng sản phẩm trong kho.
  sellProduct(customerId: number, employeeId: number, productId: number, quantity: number): void {
    const employeeIdx = this._employees.findIndex(e => e.id === employeeId),
      customerIdx = this._customers.findIndex(e => e.id === customerId),
      productIdx = this._products.findIndex(e => e.id === productId);

    if (customerIdx < 0 || employeeIdx < 0 || productIdx < 0) return;

    this._products[productIdx].sell(quantity);

    const invoiceIdx = this._invoices.findIndex(e => {
      const dete = e.getInvoiceDetails();
      return dete.customer.id === customerId && dete.employee.id === employeeId;
    });
    if (invoiceIdx >= 0) {
      const prodIdx = this._invoices[invoiceIdx].products.findIndex(e => e.product.id === productId);
      if (prodIdx < 0) {
        this._invoices[invoiceIdx].products.push({
          product: this._products[productIdx],
          quantity: quantity,
        });
      } else {
        this._invoices[invoiceIdx].products[productIdx].quantity += quantity;
      }
      return;
    }
    this._invoices.push(
      new Invoice(
        this._customers[customerIdx],
        this._employees[employeeIdx],
        [{
          product: this._products[productIdx],
          quantity: quantity,
        }],
        quantity,
      ),
    );
  }

  // Nhập hàng bổ sung sản phẩm.
  restockProduct(productId: number, quantity: number): void {
    const productIdx = this._products.findIndex(e => e.id === productId);
    if (productIdx < 0) return;

    this._products[productIdx].restock(quantity);
  }

  // Hiển thị danh sách hóa đơn.
  listInvoices(): void {
    for (let i = 0; i < this._invoices.length; i++) {
      const details = this._invoices[i].getInvoiceDetails();
      console.log(
        (i === 0 ? '----INVOICES----\n' : '') +
        ` - Employee: ${details.employee.name} (${details.employee.id})\n` +
        ` - Customer: ${details.customer.name} (${details.customer.id})\n` +
        ` - Products:\n` +
        details.products.map(e => {
            const prod = e.product.getDetails();
            return `   + ${prod.name} (${prod.id}) - ${prod.price} - ${e.quantity}\n`;
          },
        ).join('') +
        '---------------',
      );
    }
  }
}

enum StoreInput {addCustomer = 1, addEmployee, addProduct, sell, restock, listInvoices, listRecords, del, find, end}

class StoreMain {
  run(): void {
    const libManager = new StoreManager([], [], [], []);
    let input: number;
    let errorText: string = '';

    while (true) {
      input = Number(prompt(
        'Store manager\n\n' +
        (errorText.length > 0 ? errorText + '\n\n' : '') +
        `${StoreInput.addCustomer}. Thêm khách hàng.\n` +
        `${StoreInput.addEmployee}. Thêm nhân viên.\n` +
        `${StoreInput.addProduct}. Thêm sản phẩm.\n` +
        `${StoreInput.sell}. Bán hàng (Tạo hóa đơn).\n` +
        `${StoreInput.restock}. Nhập hàng bổ sung.\n` +
        `${StoreInput.listInvoices}. Hiển thị danh sách hóa đơn.\n` +
        `${StoreInput.end}. Dừng chương trình.\n`,
      ));

      errorText = '';

      switch (input) {
        case StoreInput.addCustomer:
          const cusName = String(prompt('Enter customer name'));
          const cusEmail = String(prompt('Enter customer email'));
          const cusPhone = String(prompt('Enter customer phone'));
          if (cusName.length <= 0) {
            errorText = `Name can't be empty.`;
            break;
          }
          if (cusEmail.length <= 0) {
            errorText = `Email can't be empty.`;
            break;
          }
          if (cusPhone.length <= 0 || cusPhone.length > 10) {
            errorText = `Phone is invalid.`;
            break;
          }
          libManager.addCustomer(cusName, cusEmail, cusPhone);
          break;
        case StoreInput.addEmployee:
          const empName = String(prompt('Enter employee name'));
          const position = String(prompt('Enter position'));
          if (empName.length <= 0) {
            errorText = `Name can't be empty.`;
            break;
          }
          if (position.length <= 0) {
            errorText = `Position can't be empty.`;
            break;
          }
          libManager.addEmployee(empName, position);
          break;
        case StoreInput.addProduct:
          const prodName = String(prompt('Enter product name'));
          const prodPrice = Number(prompt('Enter product price'));
          const prodQuantity = Number(prompt('Enter product quantity'));
          if (prodName.length <= 0) {
            errorText = `Name can't be empty.`;
            break;
          }
          if (prodPrice <= 0) {
            errorText = `Price should be positive.`;
            break;
          }
          if (prodQuantity <= 0) {
            errorText = `Quantity should be positive.`;
            break;
          }
          libManager.addProduct(prodName, prodPrice, prodQuantity);
          break;
        case StoreInput.sell:
          const cusId = Number(prompt('Enter customer ID'));
          const empId = Number(prompt('Enter employee ID'));
          const prodId = Number(prompt('Enter product ID'));
          const sellQuantity = Number(prompt('Enter sell quantity'));
          if (isNaN(cusId)) {
            errorText = `Invalid customer ID.`;
            break;
          }
          if (isNaN(empId)) {
            errorText = `Invalid employee ID.`;
            break;
          }
          if (isNaN(prodId)) {
            errorText = `Invalid product ID.`;
            break;
          }
          if (sellQuantity <= 0) {
            errorText = `Quantity should be positive.`;
            break;
          }
          libManager.sellProduct(cusId, empId, prodId, sellQuantity);
          break;
        case StoreInput.restock:
          const restockProductId = Number(prompt('Enter product ID'));
          const restockQuantity = Number(prompt('Enter restock quantity'));
          if (isNaN(restockProductId)) {
            errorText = `Invalid product ID.`;
            break;
          }
          if (restockQuantity <= 0) {
            errorText = `Quantity should be positive.`;
            break;
          }
          libManager.restockProduct(restockProductId, restockQuantity);
          break;
        case StoreInput.listInvoices:
          libManager.listInvoices();
          break;
        case StoreInput.end:
          return;
      }
    }
  }
}

const storeApp = new StoreMain();
