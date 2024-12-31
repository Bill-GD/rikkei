abstract class Person {
  protected _id: number;
  protected _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  abstract get name(): string;

  abstract getDetails(): {};
}

class Employee extends Person {
  private _role: string;

  constructor(id: number, name: string, role: string) {
    super(id, name);
    this._role = role;
  }

  override get name() {
    return `${this._name} (Employee)`;
  }

  get role() {
    return this._role;
  }

  override getDetails() {
    return {
      id: this._id,
      name: this._name,
      role: this.role,
    };
  }
}

class Manager extends Employee {
  private _department: string;

  constructor(id: number, name: string, role: string, department: string) {
    super(id, name, role);
    this._department = department;
  }

  override get name() {
    return `${this._name} (Manager)`;
  }

  get department() {
    return this._department;
  }
}

class Task {
  private _id: number;
  private _title: string;
  private _deadline: Date;
  private _isCompleted: boolean;

  constructor(id: number, title: string, deadline: Date, isCompleted: boolean = false) {
    this._id = id;
    this._title = title;
    this._deadline = deadline;
    this._isCompleted = isCompleted;
  }

  complete(): void {
    this._isCompleted = true;
  }

  getDetails() {
    return {
      id: this._id,
      title: this._title,
      deadline: this._deadline,
      isCompleted: this._isCompleted,
    };
  }
}

class Assignment {
  private _employee: Employee;
  private _task: Task;

  constructor(employee: Employee, task: Task) {
    this._employee = employee;
    this._task = task;
  }

  getAssignmentDetails() {
    return {
      employee: this._employee.getDetails(),
      task: this._task.getDetails(),
    };
  }
}

class TaskManager {
  protected _employees: Employee[];
  protected _taskManagers: Manager[];
  protected _tasks: Task[];
  protected _assignments: Assignment[];

  constructor(employees: Employee[], taskManagers: Manager[], tasks: Task[], assignments: Assignment[]) {
    this._employees = employees;
    this._taskManagers = taskManagers;
    this._tasks = tasks;
    this._assignments = assignments;
  }

  // Thêm nhân viên mới.
  addEmployee(name: string, role: string): void {
    const ids = this._employees.map(e => e.getDetails().id).sort((a, b) => a - b);
    ids.length <= 0 && ids.push(0);
    this._employees.push(new Employee(ids[0] + 1, name, role));
  }

  // Thêm người quản lý mới.
  addManager(name: string, role: string, department: string): void {
    const ids = this._taskManagers.map(e => e.getDetails().id).sort((a, b) => a - b);
    ids.length <= 0 && ids.push(0);
    this._taskManagers.push(new Manager(ids[0] + 1, name, role, department));
  }

  // Thêm công việc mới.
  addTask(title: string, deadline: string): void {
    const ids = this._tasks.map(e => e.getDetails().id).sort((a, b) => a - b);
    ids.length <= 0 && ids.push(0);
    this._tasks.push(new Task(ids[0] + 1, title, new Date(deadline)));
  }

  // Phân công công việc cho nhân viên.
  assignTask(employeeId: number, taskId: number): void {
    const em = this._employees.find(e => e.getDetails().id === employeeId);
    const t = this._tasks.find(e => e.getDetails().id === taskId);
    if (em === undefined) {
      showError(`No employee with ID ${employeeId}`);
      return;
    }
    if (t === undefined) {
      showError(`No task with ID ${taskId}`);
      return;
    }
    this._assignments.push(new Assignment(em, t));
  }

  // Đánh dấu công việc là hoàn thành.
  completeTask(taskId: number): void {
    const task = this._tasks.find(e => e.getDetails().id === taskId);
    if (task === undefined) {
      showError(`No task with ID ${taskId}`);
      return;
    }
    task.complete();
  }

  // Hiển thị danh sách công việc đã phân công.
  listAssignments(): void {
    for (let i = 0; i < this._tasks.length; i++) {
      const assigned = this._assignments.find(
        e => e.getAssignmentDetails().task.id === this._tasks[i].getDetails().id,
      )?.getAssignmentDetails().employee;
      const isOverdue = Date.now() > this._tasks[i].getDetails().deadline.getTime();
      const completed = this._tasks[i].getDetails().isCompleted;
      console.log(
        (i === 0 ? '-----TASKS-----\n' : '') +
        `${this._tasks[i].getDetails().title}\n` +
        ` - ID: ${this._tasks[i].getDetails().id}\n` +
        ` - Deadline: ${this._tasks[i].getDetails().deadline.toUTCString()} ${isOverdue ? '(Overdue)' : ''}\n` +
        ` - Status: ${completed ? 'Completed' : 'In progress'}\n` +
        ` - Assigned to: ${assigned === undefined ? null : `${assigned!.id}. ${assigned!.name}`}\n` +
        '---------------',
      );
    }

    for (let i = 0; i < this._employees.length; i++) {
      console.log(
        (i === 0 ? '---EMPLOYEES---\n' : '') +
        `${this._employees[i].getDetails().id}. ${this._employees[i].name}\n` +
        '---------------',
      );
    }
  }
}

function showError(content: string) {
  console.error(content);
}

enum TaskInput { addEmp = 1, addManager, addTask, assign, complete, list, end}

class Main {
  run(): void {
    const taskManager = new TaskManager([], [], [], []);
    let input: number;

    while (true) {
      input = Number(prompt(
        'Task manager\n\n' +
        `${TaskInput.addEmp}. Thêm nhân viên.\n` +
        `${TaskInput.addManager}. Thêm quản lý.\n` +
        `${TaskInput.addTask}. Thêm công việc.\n` +
        `${TaskInput.assign}. Phân công công việc cho nhân viên.\n` +
        `${TaskInput.complete}. Đánh dấu công việc hoàn thành.\n` +
        `${TaskInput.list}. Hiển thị danh sách công việc đã phân công.\n` +
        `${TaskInput.end}. Dừng chương trình.\n`,
      ));

      switch (input) {
        case TaskInput.addEmp:
          const newName = String(prompt(`Enter new employee's name`));
          const newRole = String(prompt(`Enter new employee's role`));
          if (newName.length <= 0) {
            showError(`Name can't be empty`);
            break;
          }
          if (newRole.length <= 0) {
            showError(`Role can't be empty`);
            break;
          }
          taskManager.addEmployee(newName, newRole);
          break;
        case TaskInput.addManager:
          const newManagerName = String(prompt(`Enter new taskManager's name`));
          if (newManagerName.length <= 0) {
            showError(`Name can't be empty`);
            break;
          }
          const newManagerRole = String(prompt(`Enter new taskManager's role`));
          if (newManagerRole.length <= 0) {
            showError(`Role name can't be empty`);
            break;
          }
          const newManagerDep = String(prompt(`Enter new taskManager's department`));
          if (newManagerDep.length <= 0) {
            showError(`Department name can't be empty`);
            break;
          }
          taskManager.addManager(newManagerName, newManagerRole, newManagerDep);
          break;
        case TaskInput.addTask:
          const title = String(prompt('Enter task title'));
          if (title.length <= 0) {
            showError(`Title can't be empty`);
            break;
          }

          const deadline = String(prompt(
            'Enter deadline\n\n' +
            'Format:\n' +
            '  mm/dd/yyyy, hh:MM:ss\n\n' +
            '- mm: month\n' +
            '- dd: date\n' +
            '- yyyy: year\n' +
            '- hh: hour\n' +
            '- MM: minute\n' +
            '- ss: second',
          ));
          if (deadline.length <= 0) {
            showError(`Deadline can't be empty`);
            break;
          }
          if (!deadline.match(/^([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}, [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})$/)) {
            showError(`Deadline format is wrong.`);
            break;
          }
          if (!(new Date(deadline) instanceof Date && !isNaN(new Date(deadline).getTime()))) {
            showError(`Deadline value is wrong`);
            break;
          }
          taskManager.addTask(title, deadline);
          break;
        case TaskInput.assign:
          const task = Number(prompt('Enter task id'));
          const employee = Number(prompt('Enter employee id'));
          taskManager.assignTask(employee, task);
          break;
        case TaskInput.complete:
          const taskID = Number(prompt('Enter task id'));
          taskManager.completeTask(taskID);
          break;
        case TaskInput.list:
          taskManager.listAssignments();
          break;
        case TaskInput.end:
          showError('Ended');
          return;
      }
    }
  }
}

const taskApp = new Main();
