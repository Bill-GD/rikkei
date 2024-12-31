// class Animal {
//   protected _name: string;
//
//   constructor(name: string) {
//     this._name = name;
//   }
//
//   get name() {
//     return this._name;
//   }
//
//   set name(name: string) {
//     this._name = name;
//   }
//
//   introduce() {
//     console.log(`Hello, my name is ${this._name}`);
//   }
// }
//
// // let animal1 = new Animal('Animal 1');
// // animal1.introduce();
//
// abstract class Rikkei {
//   private _taxCode: string;
//   private _stakeholders: any[];
//
//   protected constructor(taxCode: string) {
//     this._taxCode = taxCode;
//     this._stakeholders = [{ name: 'Minh Cuong', share: '100%' }];
//   }
//
//   protected showTaxCode(): void {
//     console.log(`Rikkei tax code is ${this._taxCode}`);
//   }
//
//   abstract payTaxes(): void;
// }
//
// class RikkeiEducation extends Rikkei {
//   private _bod: string[];
//
//   constructor(bod: string[]) {
//     super('U1V241V2US124DFF');
//     this._bod = bod;
//   }
//
//   override payTaxes(): void {
//     console.log('Rikkei Edu is paying taxes...');
//   }
// }
//
// // let rikkeiEdu = new RikkeiEducation(['Minh Duong', 'Van Hoang']);
// // rikkeiEdu.payTaxes();
//
// abstract class Human {
//   private _gene: string;
//
//   protected constructor(gene: string) {
//     this._gene = gene;
//   }
//
//   abstract reproduce(): void;
//
//   abstract hunt(): void;
// }
//
// abstract class Person extends Human {
//   private _gender: boolean;
//
//   protected constructor(gender: boolean, gene: string) {
//     super(gene);
//     this._gender = gender;
//   }
//
//   abstract hunt(): void;
// }
//
// class Student extends Person {
//   private _name: string;
//
//   constructor(name: string, gender: boolean, gene: string) {
//     super(gender, gene);
//     this._name = name;
//   }
//
//   study(): void {
//     console.log('Studying rn');
//   }
//
//   doHomework(): void {
//     console.log('Doing homework rn');
//   }
//
//   override reproduce(): void {
//     console.log('Reproducing rn');
//   }
//
//   override hunt(): void {
//     console.log('Hunting rn');
//   }
// }
//
// interface Sales {
//   name: string;
//
//   sale(): void;
// }
//
// interface Marketing {
//   name: string;
//
//   marketing(): void;
// }
//
// class RK implements Sales, Marketing {
//   name: string;
//
//   constructor(name: string) {
//     this.name = name;
//   }
//
//   sale() {
//     console.log('Doing sale');
//   }
//
//   marketing() {
//     console.log('Doing marketing');
//   }
// }
//
// class Phenikaa implements Sales, Marketing {
//   // protected name: string; // can't be not public
//   name: string;
//
//   constructor(name: string) {
//     this.name = name;
//   }
//
//   sale() {
//     console.log('Doing sale');
//   }
//
//   marketing() {
//     console.log('Doing marketing');
//   }
// }
//
// interface DigitalMarketing extends Marketing {
//   digitalMarketing(): void;
// }
//
// class EnglishCenter implements DigitalMarketing {
//   name: string;
//
//   constructor(name: string) {
//     this.name = name;
//   }
//
//   marketing() {
//     console.log('Doing marketing');
//   }
//
//   digitalMarketing() {
//     console.log('Doing digital marketing');
//   }
// }
//
// interface Person {
//   name: string;
//   age: number;
// }
//
// type HumanObj = {
//   name: string;
//   age: number;
// };
