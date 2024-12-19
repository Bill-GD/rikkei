class Employee {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Task {
  id: number;
  title: string;
  deadline: Date;
  isCompleted: boolean;

  constructor(id: number, title: string, deadline: Date, isCompleted: boolean = false) {
    this.id = id;
    this.title = title;
    this.deadline = deadline;
    this.isCompleted = isCompleted;
  }
}

class Assignment {
  employee: Employee;
  task: Task;

  constructor(employee: Employee, task: Task) {
    this.employee = employee;
    this.task = task;
  }
}

class TaskManager {
  employees: Employee[];
  tasks: Task[];
  assignments: Assignment[];

  constructor(employees: Employee[] = [], tasks: Task[] = [], assignments: Assignment[] = []) {
    this.employees = employees;
    this.tasks = tasks;
    this.assignments = assignments;
  }


  // Thêm nhân viên mới vào danh sách.
  addEmployee(name: string): void {
    let ids = this.employees.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this.employees.push(new Employee(ids[ids.length - 1] + 1, name));
  }

  // Thêm task mới với hạn hoàn thành.
  addTask(title: string, deadline: string): void {
    let ids = this.tasks.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this.tasks.push(new Task(ids[ids.length - 1] + 1, title, new Date(deadline)));
  }

  // Phân công task cho nhân viên.
  assignTask(employeeId: number, taskId: number): void {
    const em = this.employees.find(e => e.id = employeeId);
    const t = this.tasks.find(e => e.id = taskId);
    if (em === undefined || t === undefined) return;
    this.assignments.push(new Assignment(em, t));
  }

  // Đánh dấu task là hoàn thành.
  completeTask(taskId: number): void {
    const task = this.tasks.find(e => e.id === taskId);
    if (task === undefined) return;
    task.isCompleted = true;
  }

  // Hiển thị danh sách task với trạng thái hoàn thành và quá hạn nếu có.
  listTasks(): void {
    for (let i = 0; i < this.tasks.length; i++) {
      const assigned = this.assignments.find(e => e.task.id === this.tasks[i].id)?.employee;
      const isOverdue = Date.now() > this.tasks[i].deadline.getTime();
      const completed = this.tasks[i].isCompleted;
      console.log(
        (i === 0 ? '-----TASKS-----\n' : '') +
        `${this.tasks[i].title}\n` +
        ` - ID: ${this.tasks[i].id}\n` +
        ` - Deadline: ${this.tasks[i].deadline.toUTCString()} ${isOverdue ? '(Overdue)' : ''}\n` +
        ` - Status: ${completed ? 'Completed' : 'In progress'}\n` +
        ` - Assigned to: ${assigned === undefined ? null : `${assigned!.id}. ${assigned!.name}`}\n` +
        '---------------',
      );
    }

    for (let i = 0; i < this.employees.length; i++) {
      console.log(
        (i === 0 ? '---EMPLOYEES---\n' : '') +
        `${this.employees[i].id}. ${this.employees[i].name}\n` +
        '---------------',
      );
    }
  }
}

enum Input {addEmployee = 1, addTask, assign, complete, list, end}

class Main {
  run(): void {
    const manager = new TaskManager();
    let input: number;
    let errorText: string = '';

    while (true) {
      input = Number(prompt(
        'Task manager\n\n' +
        (errorText.length > 0 ? errorText + '\n\n' : '') +
        `${Input.addEmployee}. Thêm nhân viên mới.\n` +
        `${Input.addTask}. Thêm task mới.\n` +
        `${Input.assign}. Gán task cho nhân viên.\n` +
        `${Input.complete}. Đánh dấu task hoàn thành.\n` +
        `${Input.list}. Hiển thị danh sách task (bao gồm thông tin nhân viên, task, hạn hoàn thành, trạng thái và quá hạn nếu có).\n` +
        `${Input.end}. Dừng chương trình.\n`,
      ));

      switch (input) {
        case Input.addEmployee:
          const newName = String(prompt(`Enter new employee's name`));
          if (newName.length <= 0) {
            errorText = `Name can't be empty`;
            break;
          }
          manager.addEmployee(newName);
          errorText = '';
          break;
        case Input.addTask:
          const title = String(prompt('Enter task title'));
          if (title.length <= 0) {
            errorText = `Title can't be empty`;
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
            errorText = `Deadline can't be empty`;
            break;
          }
          if (!deadline.match(/^([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}, [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})$/)) {
            // console.log(`Deadline format is wrong.`);
            errorText = `Deadline format is wrong.`;
            break;
          }
          if (!(new Date(deadline) instanceof Date && !isNaN(new Date(deadline).getTime()))) {
            // console.log(`Deadline value is wrong`);
            errorText = `Deadline value is wrong`;
            break;
          }
          manager.addTask(title, deadline);
          errorText = '';
          break;
        case Input.assign:
          const task = Number(prompt('Enter task id'));
          const employee = Number(prompt('Enter employee id'));
          manager.assignTask(employee, task);
          break;
        case Input.complete:
          const taskID = Number(prompt('Enter task id'));
          manager.completeTask(taskID);
          break;
        case Input.list:
          manager.listTasks();
          break;
        case Input.end:
          return;
      }
    }
    // while (input !== Input.end);
  }
}

new Main().run();
