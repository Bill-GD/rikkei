class Person {
  protected _id: number;
  protected _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
}

class Member extends Person {
  protected _membershipType: string;

  constructor(id: number, name: string, type: string) {
    super(id, name);
    this._membershipType = type;
  }

  override get name() {
    return `${this._name}`;
  }

  get membershipType() {
    return this._membershipType;
  }
}

class Librarian extends Person {
  protected _position: string;

  constructor(id: number, name: string, position: string) {
    super(id, name);
    this._position = position;
  }

  get position() {
    return this._position;
  }
}

class CD {
  protected _id: number;
  protected _title: string;
  protected _artist: string;
  protected _isBorrowed: boolean;

  constructor(id: number, title: string, artist: string, isBorrowed: boolean = false) {
    this._id = id;
    this._title = title;
    this._artist = artist;
    this._isBorrowed = isBorrowed;
  }

  get id() {
    return this._id;
  }

  get isBorrowed() {
    return this._isBorrowed;
  }

  borrow(): void {
    this._isBorrowed = true;
  }

  return(): void {
    this._isBorrowed = false;
  }

  getDetails() {
    return {
      id: this._id,
      title: this._title,
      artist: this._artist,
      isBorrowed: this._isBorrowed,
    };
  }
}

class BorrowRecord {
  protected _member: Member;
  protected _cd: CD;

  constructor(member: Member, cd: CD) {
    this._member = member;
    this._cd = cd;
  }

  getRecordDetails() {
    return {
      memberId: this._member.id,
      memberName: this._member.name,
      ...this._cd.getDetails(),
    };
  }
}

class LibraryManager {
  protected _members: Member[];
  protected _librarians: Librarian[];
  protected _cds: CD[];
  protected _borrowRecords: BorrowRecord[];

  constructor(members: Member[], librarians: Librarian[], cds: CD[], borrowRecords: BorrowRecord[]) {
    this._members = members;
    this._librarians = librarians;
    this._cds = cds;
    this._borrowRecords = borrowRecords;
  }

  addMember(name: string, membershipType: string): void {
    let ids = this._members.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this._members.push(new Member(ids[ids.length - 1] + 1, name, membershipType));
  }

  addLibrarian(name: string, position: string): void {
    let ids = this._librarians.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this._librarians.push(new Librarian(ids[ids.length - 1] + 1, name, position));
  }

  addCD(title: string, artist: string): void {
    let ids = this._cds.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this._cds.push(new CD(ids[ids.length - 1] + 1, title, artist));
  }

  borrowCD(memberId: number, cdId: number): void {
    const cd = this._cds.find(e => e.id === cdId);
    if (cd === undefined) return;
    if (cd.isBorrowed) return;

    const memIdx = this._members.findIndex(e => e.id === memberId);
    const cdIdx = this._cds.findIndex(e => e.id === cdId);

    if (memIdx < 0 || cdIdx < 0) return;

    this._cds[cdIdx].borrow();
    this._borrowRecords.push(new BorrowRecord(this._members[memIdx], this._cds[cdIdx]));
  }

  returnCD(cdId: number): void {
    const cd = this._cds.find(e => e.id === cdId);
    if (cd === undefined) return;
    if (!cd.isBorrowed) return;

    const borrowIdx = this._borrowRecords.findIndex(e => e.getRecordDetails().id === cdId);
    if (borrowIdx < 0) return;

    this._cds.find(e => e.id === cdId)?.return();
    this._borrowRecords.splice(borrowIdx, 1);
  }

  listBorrowRecords(): void {
    for (let i = 0; i < this._borrowRecords.length; i++) {
      const details = this._borrowRecords[i].getRecordDetails();
      console.log(
        (i === 0 ? '----RECORDS----\n' : '') +
        ` - Member: ${details.memberName} (${details.memberId})\n` +
        ` - Book: ${details.title} (${details.id})\n` +
        '---------------',
      );
    }
  }
}

enum CDInput {addMember = 1, addLibrarian, addCD, borrow, return, listRecords, end}

class LibMain {
  run(): void {
    const libManager = new LibraryManager([], [], [], []);
    let input: number;
    let errorText: string = '';

    while (true) {
      input = Number(prompt(
        'Library manager\n\n' +
        (errorText.length > 0 ? errorText + '\n\n' : '') +
        `${CDInput.addMember}. Thêm thành viên.\n` +
        `${CDInput.addLibrarian}. Thêm thủ thư.\n` +
        `${CDInput.addCD}. Thêm CD.\n` +
        `${CDInput.borrow}. Mượn CD.\n` +
        `${CDInput.return}. Trả CD.\n` +
        `${CDInput.listRecords}. Hiển thị danh sách bản ghi mượn CD.\n` +
        `${CDInput.end}. Dừng chương trình.\n`,
      ));

      errorText = '';

      switch (input) {
        case CDInput.addMember:
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
        case CDInput.addLibrarian:
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
        case CDInput.addCD:
          const title = String(prompt('Enter title'));
          const artist = String(prompt('Enter artist'));
          if (title.length <= 0) {
            errorText = `Title can't be empty.`;
            break;
          }
          if (artist.length <= 0) {
            errorText = `Artist name can't be empty.`;
            break;
          }
          libManager.addCD(title, artist);
          break;
        case CDInput.borrow:
          const memId = Number(prompt('Enter member ID'));
          const cdId = Number(prompt('Enter CD ID'));
          if (isNaN(memId)) {
            errorText = `Invalid member ID.`;
            break;
          }
          if (isNaN(cdId)) {
            errorText = `Invalid CD ID.`;
            break;
          }
          libManager.borrowCD(memId, cdId);
          break;
        case CDInput.return:
          const returnCDId = Number(prompt('Enter CD ID'));
          if (isNaN(returnCDId)) {
            errorText = `Invalid CD ID.`;
            break;
          }
          libManager.returnCD(returnCDId);
          break;
        case CDInput.listRecords:
          libManager.listBorrowRecords();
          break;
        case CDInput.end:
          return;
      }
    }
  }
}

const libApp = new LibMain();
