class CD {
  id: number;
  title: string;
  artist: string;
  year: number;

  constructor(id: number, title: string, artist: string, year: number) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
  }
}

class CDStoreManager {
  cds: CD[];

  constructor(cds: CD[]) {
    this.cds = cds;
  }

  addCD(title: string, artist: string, year: number): void {
    let ids = this.cds.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this.cds.push(new CD(ids[ids.length - 1] + 1, title, artist, year));
  }

  listCDs(): void {
    this.listSelectedCDs(this.cds);
  }

  removeCD(id: number): void {
    this.cds.splice(this.cds.findIndex(e => e.id === id), 1);
  }

  searchCD(title: string): void {
    this.listSelectedCDs(this.cds.filter(e => e.title === title));
  }

  private listSelectedCDs(cds: CD[]): void {
    for (let i = 0; i < cds.length; i++) {
      console.log(
        (i === 0 ? '------CDS------\n' : '') +
        ` - ID: ${cds[i].id}\n` +
        ` - Title: ${cds[i].title}\n` +
        ` - Author: ${cds[i].artist}\n` +
        ` - Year published: ${cds[i].year}\n` +
        '---------------',
      );
    }
  }
}

enum CDInput {add = 1, list, del, find, end}

class CDMain {
  run(): void {
    const libManager = new CDStoreManager([]);
    let input: number;
    let errorText: string = '';

    while (true) {
      input = Number(prompt(
        'Task manager\n\n' +
        (errorText.length > 0 ? errorText + '\n\n' : '') +
        `${CDInput.add}. Thêm CD vào cửa hàng.\n` +
        `${CDInput.list}. Hiển thị danh sách CD.\n` +
        `${CDInput.del}. Xóa CD theo mã CD.\n` +
        `${CDInput.find}. Tìm kiếm CD theo tên.\n` +
        `${CDInput.end}. Dừng chương trình.\n`,
      ));

      errorText = '';

      switch (input) {
        case CDInput.add:
          const title = String(prompt('Enter title'));
          const artist = String(prompt('Enter artist'));
          const year = Number(prompt('Enter year published'));
          if (isNaN(year)) {
            errorText = `Year is invalid`;
            break;
          }
          libManager.addCD(title, artist, year);
          break;
        case CDInput.list:
          libManager.listCDs();
          break;
        case CDInput.del:
          const id = Number(prompt('Enter id'));
          if (isNaN(id)) {
            errorText = `ID is invalid`;
            break;
          }
          libManager.removeCD(id);
          break;
        case CDInput.find:
          const searchTitle = String(prompt('Enter title'));
          libManager.searchCD(searchTitle);
          break;
        case CDInput.end:
          return;
      }
    }
  }
}

const cdApp = new CDMain();
