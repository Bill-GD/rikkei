class Department {
  private _id: string;
  private _name: string;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  set name(name: string) {
    console.log(`New name: ${name}`);
    this._name = name;
  }

  get name(): string {
    console.log('Getting name');
    return this._name;
  }

  describe() {
    console.log(`This is ${this._name} Department with id: ${this._id}`);
  }
}

let educationDepartment = new Department('1', 'Education');
console.log(educationDepartment);
// educationDepartment.setName = 'Computer Science'; // requires unique name, can't use original property -> could use prefix
educationDepartment.name = 'Computer Science';
educationDepartment.name;

let accounting = {
  describe: educationDepartment.describe.bind({ _id: '2', _name: 'Accounting' }), // change is needed if use modifier prefix
};
accounting.describe();



// homework on portal
// create main class -> call the created (app.)run() method
