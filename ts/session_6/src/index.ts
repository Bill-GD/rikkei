class Animal {
  protected _type: string;

  constructor(type: string) {
    this._type = type;
  }

  get type() {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }

  sound() {
    console.log('This is this animal sound');
  }
}

class Dog extends Animal {
  private _name: string;
  private _gender: boolean;

  constructor(name: string, gender: boolean) {
    super('carnivore');
    this._name = name;
    this._gender = gender;
  }

  override sound() {
    super.sound();
    console.log('Wof woff....!!');
    console.log(
      `This is ${this._name}. I am a ${this._gender ? 'male' : 'female'} dog.`,
    );
  }

  // requires to write signatures first
  introduce(age: number): void;
  introduce(job: string): void;

  // then write an implementation that contains all the signatures (in typing)
  // then check all the inputs manually
  introduce(input: any) {
    if (typeof input === 'string') {
      console.log(
        `Hi, my name is ${this._name}. I am currently working as a ${input}.`,
      );
    } else {
      console.log(
        `Hi, my name is ${this._name}. I am currently a ${input} years old ${this._gender ? 'male' : 'female'} dog.`,
      );
    }
  }
}

// (new Animal(''))._type; // can't access outside of class
const
  dog1 = new Dog('Fluffy', true);

dog1.sound();
dog1.introduce(2);
dog1.introduce('guard');
