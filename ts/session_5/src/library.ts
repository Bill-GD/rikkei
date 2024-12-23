class Book {
  id: number; // Mã sách duy nhất.
  title: string; // Tên sách.
  author: string; // Tên tác giả.
  year: number; // Năm xuất bản.

  constructor(id: number, title: string, author: string, year: number) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
  }
}

class LibraryManager {
  books: Book[];

  constructor(books: Book[]) {
    this.books = books;
  }

  // Thêm sách mới vào thư viện.
  addBook(title: string, author: string, year: number): void {
    let ids = this.books.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this.books.push(new Book(ids[ids.length - 1] + 1, title, author, year));
  }

  // Hiển thị danh sách tất cả các sách.
  listBooks(): void {
    this.listSelectedBooks(this.books);
  }

  // Xóa sách theo mã sách.
  removeBook(id: number): void {
    this.books.splice(this.books.findIndex(e => e.id === id), 1);
  }

  // Tìm kiếm sách theo tên.
  searchBook(title: string): void {
    this.listSelectedBooks(this.books.filter(e => e.title === title));
  }

  private listSelectedBooks(books: Book[]): void {
    for (let i = 0; i < books.length; i++) {
      console.log(
        (i === 0 ? '-----BOOKS-----\n' : '') +
        ` - ID: ${books[i].id}\n` +
        ` - Title: ${books[i].title}\n` +
        ` - Author: ${books[i].author}\n` +
        ` - Year published: ${books[i].year}\n` +
        '---------------',
      );
    }
  }
}

enum LibInput {add = 1, list, del, find, end}

class LibMain {
  run(): void {
    const libManager = new LibraryManager([]);
    let input: number;
    let errorText: string = '';

    while (true) {
      input = Number(prompt(
        'Task manager\n\n' +
        (errorText.length > 0 ? errorText + '\n\n' : '') +
        `${LibInput.add}. Thêm sách vào thư viện.\n` +
        `${LibInput.list}. Hiển thị danh sách sách.\n` +
        `${LibInput.del}. Xóa sách theo mã sách.\n` +
        `${LibInput.find}. Tìm kiếm sách theo tên.\n` +
        `${LibInput.end}. Dừng chương trình.\n`,
      ));

      errorText = '';

      switch (input) {
        case LibInput.add:
          const title = String(prompt('Enter title'));
          const author = String(prompt('Enter author'));
          const year = Number(prompt('Enter year published'));
          if (title.length <= 0) {
            errorText = `Title can't be empty.`;
            break;
          }
          if (author.length <= 0) {
            errorText = `Author name can't be empty.`;
            break;
          }
          if (isNaN(year)) {
            errorText = `Year is invalid`;
            break;
          }
          libManager.addBook(title, author, year);
          break;
        case LibInput.list:
          libManager.listBooks();
          break;
        case LibInput.del:
          const id = Number(prompt('Enter id'));
          if (isNaN(id)) {
            errorText = `ID is invalid`;
            break;
          }
          libManager.removeBook(id);
          break;
        case LibInput.find:
          const searchTitle = String(prompt('Enter title'));
          libManager.searchBook(searchTitle);
          break;
        case LibInput.end:
          return;
      }
    }
  }
}

const libApp = new LibMain();
