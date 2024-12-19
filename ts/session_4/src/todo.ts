class Todo {
  public id: number;
  public content: string;
  public status: boolean;

  constructor(id: number, content: string, status: boolean = false) {
    this.id = id;
    this.content = content;
    this.status = status;
  }
}

class TodoListManager {
  private _todos: Array<Todo> = [];

  // Thêm công việc mới vào cuối danh sách.
  addTodo(content: string): void {
    const maxID = this._todos.length === 0 ? -1 : Math.max(...this._todos.map(e => e.id));
    this._todos.push(new Todo(
      maxID + 1,
      content,
    ));
  }

  // Xóa công việc tại vị trí bất kỳ.
  removeTodo(index: number): void {
    if (index < 0 || index >= this._todos.length) {
      console.log('Invalid index');
      return;
    }
    this._todos.splice(index, 1);
  }

  // Cập nhật nội dung công việc tại vị trí bất kỳ.
  updateTodo(index: number, content: string): void {
    if (index < 0 || index >= this._todos.length) {
      console.log('Invalid index');
      return;
    }
    this._todos[index].content = content;
  }

  // In ra toàn bộ danh sách công việc, hiển thị trạng thái hoàn thành hoặc chưa hoàn thành nhưng sắp xếp các phần tử todo theo alphabet.
  sortTodo(): void {
    this._todos.sort((a, b) => a.content.localeCompare(b.content));
    this.listTodos();
  }

  // Tìm kiếm todo theo content truyền vào. Hiển thị ra vị trí đầu tiên của todo nếu tìm được, hiển thị ra “Không tìm thấy” nếu không tìm được todo trong danh sách.
  findTodo(content: string): void {
    const idx: number = this._todos.findIndex(e => e.content === content);
    console.log(idx < 0 ? 'Not found' : `First element at: ${idx}`);
  }

  // In ra toàn bộ danh sách công việc, hiển thị trạng thái hoàn thành hoặc chưa hoàn thành.
  listTodos(): void {
    console.log('-----------------');
    this._todos.map(e =>
      console.log(
        `ID:      ${e.id}\n` +
        `Content: ${e.content}\n` +
        `Status:  ${e.status ? 'Done' : 'In progress'}\n` +
        '-----------------',
      ),
    );
  }
}

enum Input {
  print = 'print',
  add = 'add',
  delete = 'delete',
  edit = 'edit',
  sort = 'sort',
  search = 'search',
  end = 'end',
}

class Main {
  run(): void {
    const manager = new TodoListManager();

    let input: string;
    do {
      input = String(prompt(
        'Manage todo list:\n\n' +
        `${Input.print}: Print the todo list.\n` +
        `${Input.add}: Add a task to the end of the list.\n` +
        `${Input.delete}: Delete a task at any position.\n` +
        `${Input.edit}: Edit the content of a task at any position.\n` +
        `${Input.sort}: Sort and print the task content.\n` +
        `${Input.search}: Search for a todo.\n` +
        `${Input.end}: Stop the program.`,
      ));
      let resStr: string = '', resNum: number = -1;

      switch (input) {
        case Input.print:
          manager.listTodos();
          break;
        case Input.add:
          resStr = String(prompt('Enter content:'));
          manager.addTodo(resStr);
          manager.listTodos();
          break;
        case Input.delete:
          resNum = Number(prompt('Enter id:'));
          manager.removeTodo(resNum); // 'prompt for this'
          manager.listTodos();
          break;
        case Input.edit:
          resNum = Number(prompt('Enter id:'));
          resStr = String(prompt('Enter new content:'));
          manager.updateTodo(resNum, resStr);
          manager.listTodos();
          break;
        case Input.sort:
          manager.sortTodo();
          break;
        case Input.search:
          resStr = String(prompt('Enter content:'));
          manager.findTodo(resStr);
          break;
        case Input.end:
          return;
      }
    } while (input !== Input.end);
  }
}

new Main().run();
