abstract class Product {
  id: number;
  name: string;
  price: number;

  protected constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  abstract getDetails(): string;

  calculateDiscountPrice(discountRate: number): number {
    return this.price * (1 - discountRate);
  }
}

class Book extends Product {
  category: string;

  constructor(name: string, price: number, category: string) {
    super(-1, name, price);
    this.category = category;
  }

  getDetails(): string {
    return `id=${this.id}|name=${this.name}|price=${this.price}|category=${this.category}`;
  }
}

class ProductManager<P extends Product> {
  products: P[];

  constructor(products: P[] = []) {
    this.products = products;
  }

  addProduct(product: P): void {
    const ids = this.products.map(e => e.id);
    ids.sort((a, b) => b - a);
    ids.length <= 0 && ids.push(-1);
    product.id = ids[0] + 1;
    this.products.push(product);
  }

  removeProductById(id: number): void {
    this.products.splice(this.products.findIndex(e => e.id === id), 1);
  }

  productDisplay(product: P): string {
    let display = '';
    const details = product.getDetails().split('|');
    for (const detail of details) {
      const split = detail.split('=').map(e => e.trim()),
        key = buildAndCapitalizeWords(split[0]),
        value = split[1];
      display += `${key}: ${value}\n`;
    }
    return display;
  }

  listProducts(productsToShow: P[]): void {
    let display = '=====PRODUCTS=====\n';

    if (productsToShow.length <= 0) {
      display += 'No product available\n==================';
    } else {
      for (const product of productsToShow) {
        display += this.productDisplay(product);
        display += `==================\n`;
      }
    }
    console.log(display);
  }

  findProductBy<K extends keyof P>(key: K, value: P[K]): P | undefined {
    return this.products.find(e => e[key] === value);
  }

  filterProductsBy<K extends keyof P>(key: K, value: P[K]): P[] {
    return this.products.filter(e => e[key] === value);
  }

  calculateTotalValue(discountRate = 0): number {
    return this.products.reduce((p, c) => p += c.calculateDiscountPrice(discountRate), 0);
  }
}

function buildAndCapitalizeWords(str: string): string {
  return str.toLowerCase().split('_').map(e => {
    if (e === 'id') return 'ID';
    return e.charAt(0).toUpperCase() + e.substring(1);
  }).join(' ');
}

function showError(content: string): void {
  console.error(content);
}

enum Input { addBook = 1, del, list, search, filter, total, discount, end}

class App {
  static manager = new ProductManager<Book>();

  static run(): void {
    let input: Input;

    while (true) {
      input = Number(prompt(
        'Product manager\n\n' +
        `${Input.addBook}. Thêm sách: Người dùng nhập thông tin sách (ID, tên, giá, thể loại).\n` +
        `${Input.del}. Xóa sách: Nhập mã ID sách cần xóa.\n` +
        `${Input.list}. Hiển thị danh sách sách: Liệt kê toàn bộ danh sách sách hiện có.\n` +
        `${Input.search}. Tìm kiếm sách theo thuộc tính: Tìm sách theo id, name, hoặc category.\n` +
        `${Input.filter}. Lọc sách theo thể loại: Lọc các sách thuộc một thể loại cụ thể.\n` +
        `${Input.total}. Tính tổng giá trị sách: Tính tổng giá trị của toàn bộ sách trong danh mục.\n` +
        `${Input.discount}. Áp dụng giảm giá: Nhập phần trăm giảm giá, áp dụng giảm giá và hiển thị danh sách giá mới.\n` +
        `${Input.end}. Thoát chương trình: Kết thúc chương trình.\n`,
      ));

      switch (input) {
        case Input.addBook: {
          const name = String(prompt('Enter product name'));
          const price = Number(prompt('Enter product price'));
          const category = String(prompt('Enter book category'));
          if (isNaN(price) || price < 0) {
            showError('Price is invalid. Please try again.');
            break;
          }
          this.manager.addProduct(new Book(name, price, category));
          break;
        }
        case Input.del: {
          const id = Number(prompt('Enter product ID to remove'));
          if (isNaN(id) || id < 0) {
            showError('Invalid ID. Try again later.');
            break;
          }
          this.manager.removeProductById(id);
          break;
        }
        case Input.list: {
          this.manager.listProducts(this.manager.products);
          break;
        }
        case Input.search: {
          const key = prompt('What will be searched') as keyof Product;
          let value: string | number = String(prompt('What is the value to search'));
          if (!isNaN(Number(value))) value = Number(value);

          const found = this.manager.findProductBy(key, value);
          if (!found) showError('Product not found');
          else console.log(this.manager.productDisplay(found));
          break;
        }
        case Input.filter: {
          const key = prompt('What will be searched') as keyof Product;
          let value: string | number = String(prompt('What\'s the value to search'));
          if (!isNaN(Number(value))) value = Number(value);
          this.manager.listProducts(this.manager.filterProductsBy(key, value));
          break;
        }
        case Input.total: {
          console.log(this.manager.calculateTotalValue());
          break;
        }
        case Input.discount: {
          const disRate = Number(prompt('Enter discount rate'));
          if (isNaN(disRate) || disRate < 0 || disRate >= 1) {
            showError('Invalid discount rate. Please try again.');
            break;
          }
          console.log(this.manager.calculateTotalValue(disRate));
          break;
        }
        case Input.end:
          showError('App terminated.');
          return;
      }
    }
  }
}
