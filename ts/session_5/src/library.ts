class Member extends Person {
  membershipType: string;

  constructor(id: number, name: string, membershipType: string) {
    super(id, name);
    this.membershipType = membershipType;
  }

  getMembershipType(): string {
    return this.membershipType;
  }
}

class Librarian extends Person {
  // Vị trí công việc (Quản lý, Nhân viên...).
  position: string;

  constructor(id: number, name: string, position: string) {
    super(id, name);
    this.position = position;
  }

  // Lấy vị trí công việc của thủ thư.
  getPosition(): string {
    return this.position;
  }
}

class Book {
  id: number;
  title: string;
  author: string;
  isBorrowed: boolean;

  constructor(id: number, title: string, author: string, isBorrowed: boolean = false) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isBorrowed = isBorrowed;
  }

  // Đánh dấu sách là đã mượn.
  borrow(): void {
    this.isBorrowed = true;
  }

  // Đánh dấu sách là đã trả.
  returnBook(): void {
    this.isBorrowed = false;
  }

  // Lấy thông tin chi tiết của sách.
  getDetails(): string {
    return JSON.stringify({ ...this });
  }
}

class BorrowRecord {
  // Thành viên mượn sách.
  member: Member;
  // Sách được mượn.
  book: Book;

  constructor(member: Member, book: Book) {
    this.member = member;
    this.book = book;
  }

  // Lấy thông tin bản ghi mượn sách.
  getRecordDetails(): string {
    return JSON.stringify({
      member: { ...this.member },
      book: { ...this.book },
    });
  }
}

class LibraryManager {
  members: Member[]; // Danh sách thành viên.
  librarians: Librarian[]; // Danh sách thủ thư.
  books: Book[]; // Danh sách sách trong thư viện.
  borrowRecords: BorrowRecord[]; // Danh sách các bản ghi mượn sách.

  constructor(members: Member[], librarians: Librarian[], books: Book[], borrowRecords: BorrowRecord[]) {
    this.members = members;
    this.librarians = librarians;
    this.books = books;
    this.borrowRecords = borrowRecords;
  }

  // Thêm thành viên mới.
  addMember(name: string, membershipType: string): void {
    let ids = this.members.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this.members.push(new Member(ids[ids.length - 1] + 1, name, membershipType));
  }

  // Thêm thủ thư mới.
  addLibrarian(name: string, position: string): void {
    let ids = this.librarians.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this.librarians.push(new Librarian(ids[ids.length - 1] + 1, name, position));
  }

  // Thêm sách mới vào thư viện.
  addBook(title: string, author: string): void {
    let ids = this.books.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this.books.push(new Book(ids[ids.length - 1] + 1, title, author, false));
  }

  // Cho thành viên mượn sách nếu sách còn có sẵn.
  borrowBook(memberId: number, bookId: number): void {
    const book = this.books.find(e => e.id === bookId);
    if (book === undefined) return;
    if (book.isBorrowed) return;

    const memIdx = this.members.findIndex(e => e.id === memberId);
    const bookIdx = this.books.findIndex(e => e.id === bookId);

    if (memIdx < 0 || bookIdx < 0) return;

    this.books[bookIdx].borrow();
    this.borrowRecords.push(new BorrowRecord(this.members[memIdx], this.books[bookIdx]));
  }

  // Trả sách về thư viện.
  returnBook(bookId: number): void {
    const book = this.books.find(e => e.id === bookId);
    if (book === undefined) return;
    if (!book.isBorrowed) return;

    const borrowBookIdx = this.borrowRecords.findIndex(e => e.book.id === bookId);
    if (borrowBookIdx < 0) return;

    this.books.find(e => e.id === bookId)?.returnBook();
    this.borrowRecords.splice(borrowBookIdx, 1);
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

  // Hiển thị danh sách bản ghi mượn sách.
  listBorrowRecords(): void {
    // console.table(this.borrowRecords);
    for (let i = 0; i < this.borrowRecords.length; i++) {
      const details = JSON.parse(this.borrowRecords[i].getRecordDetails());
      console.log(
        (i === 0 ? '----RECORDS----\n' : '') +
        ` - Member: ${details['member']['name']} (${details['member']['id']})\n` +
        ` - Book: ${details['book']['title']} (${details['book']['id']})\n` +
        '---------------',
      )
      ;
    }
  }

  private listSelectedBooks(books: Book[]): void {
    for (let i = 0; i < books.length; i++) {
      console.log(
        (i === 0 ? '-----BOOKS-----\n' : '') +
        ` - ID: ${books[i].id}\n` +
        ` - Title: ${books[i].title}\n` +
        ` - Author: ${books[i].author}\n` +
        ` - Is borrowed: ${books[i].isBorrowed}\n` +
        '---------------',
      );
    }
  }
}

enum LibInput {addMember = 1, addLibrarian, addBook, borrow, return, listBooks, listRecords, del, find, end}

class LibMain {
  run(): void {
    const libManager = new LibraryManager([], [], [], []);
    let input: number;
    let errorText: string = '';

    while (true) {
      input = Number(prompt(
        'Task manager\n\n' +
        (errorText.length > 0 ? errorText + '\n\n' : '') +
        `${LibInput.addMember}. Thêm thành viên.\n` +
        `${LibInput.addLibrarian}. Thêm thủ thư.\n` +
        `${LibInput.addBook}. Thêm sách.\n` +
        `${LibInput.borrow}. Mượn sách.\n` +
        `${LibInput.return}. Trả sách.\n` +
        `${LibInput.listBooks}. Hiển thị danh sách sách.\n` +
        `${LibInput.listRecords}. Hiển thị danh sách bản ghi mượn sách.\n` +
        `${LibInput.del}. Xóa sách theo mã sách.\n` +
        `${LibInput.find}. Tìm kiếm sách theo tên.\n` +
        `${LibInput.end}. Dừng chương trình.\n`,
      ));

      errorText = '';

      switch (input) {
        case LibInput.addMember:
          const memName = String(prompt('Enter member name'));
          const memType = String(prompt('Enter membership type'));
          if (memName.length <= 0) {
            errorText = `Name can't be empty.`;
            break;
          }
          if (memType.length <= 0) {
            errorText = `Type can't be empty.`;
            break;
          }
          libManager.addMember(memName, memType);
          break;
        case LibInput.addLibrarian:
          const libName = String(prompt('Enter librarian name'));
          const position = String(prompt('Enter position'));
          if (libName.length <= 0) {
            errorText = `Name can't be empty.`;
            break;
          }
          if (position.length <= 0) {
            errorText = `Position can't be empty.`;
            break;
          }
          libManager.addLibrarian(libName, position);
          break;
        case LibInput.addBook:
          const title = String(prompt('Enter title'));
          const author = String(prompt('Enter author'));
          if (title.length <= 0) {
            errorText = `Title can't be empty.`;
            break;
          }
          if (author.length <= 0) {
            errorText = `Author name can't be empty.`;
            break;
          }
          libManager.addBook(title, author);
          break;
        case LibInput.borrow:
          const memId = Number(prompt('Enter member ID'));
          const bookId = Number(prompt('Enter book ID'));
          if (isNaN(memId)) {
            errorText = `Invalid member ID.`;
            break;
          }
          if (isNaN(bookId)) {
            errorText = `Invalid book ID.`;
            break;
          }
          libManager.borrowBook(memId, bookId);
          break;
        case LibInput.return:
          const returnBookId = Number(prompt('Enter book ID'));
          if (isNaN(returnBookId)) {
            errorText = `Invalid book ID.`;
            break;
          }
          libManager.returnBook(returnBookId);
          break;
        case LibInput.listBooks:
          libManager.listBooks();
          break;
        case LibInput.listRecords:
          libManager.listBorrowRecords();
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
