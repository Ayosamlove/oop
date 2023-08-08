'use strict';

const Person = function (firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  this.userName = firstName + '' + birthYear;

  //Never create method inside constructor function
  //   this.calcAge = () => console.log(2037 - this.birthYear);
};

const sam = new Person('Sam', 1998);
console.log(sam);

// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} is linked to a prototype
// 4. function automatically return {}

console.log(sam instanceof Person);
Person.hey = function () {
  console.log('Hey there 👋🏾');
};
Person.hey();

//Prototypes
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

sam.calcAge();

console.log(sam.__proto__);
console.log(sam.__proto__ === Person.prototype);

Person.prototype.species = 'Homo sapiens';

console.log(sam.species);

console.log(sam.hasOwnProperty('firstName'));
console.log(sam.hasOwnProperty('species'));

console.dir(Person.prototype.constructor);
//object of prototype (top of prototype chain)
console.log(sam.__proto__.__proto__);

const arr = [3, 4, 5, 3, 9, 0, 4];
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);

//coding challenge 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const samCar = new Car('Mercedes', 120);

const segCar = new Car('Jaguar', 100);

Car.prototype.calcAcc = function () {
  console.log(10 + this.speed);
};

Car.prototype.calcBrake = function () {
  console.log(this.speed - 5);
};

samCar.calcAcc();
segCar.calcAcc();
samCar.calcBrake();
segCar.calcBrake();

// coding challenge 2
class Cars {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }

  calcBrake() {
    return this.speed - 5;
  }

  calcSpeed() {
    return 10 * this.speed;
  }
}

const ford = new Cars('Ford', 120);
console.log(ford.speedUS);

// Challenge 3

const Ev = function (make, speed, charge) {
  Car.call(make, speed, charge);
  this.charge = charge;
};
Ev.prototype = Object.create(Car.prototype);

Ev.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

const tesla = new Ev('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.brake();

// class declaration
class Personcl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //Instance methods
  //Methods will be added to the prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // setting a property that already exist
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  //static methods
  static hey() {
    console.log('Hey there 👋🏾');
  }
}

const James = new Personcl('James Bradley', 1992);
James.calcAge();

Personcl.prototype.greet = function () {
  console.log(`hello ${this.fullName}`);
};
James.greet();
console.log(James.age);

// 1. Classes are NOT hoisted
// 2. Classes are first class citizens like functions
// 3. Classes are executed in strict mode

const Toyin = new Personcl('Toyin Tomato', 1956);
Personcl.hey();

//Setters and getters
const account = {
  owner: 'Samuel',
  movements: [23, 56, 60, 289, 900, 450],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

const personProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.birthYear = birthYear;
    this.firstName = firstName;
  },
};

const steven = Object.create(personProto);
// console.log(steven);
steven.birthYear = 2002;
steven.name = 'steven';
steven.calcAge();

// console.log(steven.__proto__);

const sarah = Object.create(personProto);
sarah.init('Sarah', 1967);
sarah.calcAge();

// Inheritance between classes: Constructor
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I am studying ${this.course}`);
};

const Mike = new Student('Mike', 2005, 'Computer Science');

Mike.introduce();
Mike.calcAge();

//Inheritance between classes: ES6 classes
class Personcl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there 👋🏾');
  }

  static hello() {
    console.log('Hello there 👋🏾');
  }
}

// class Student extends Personcl {
//   constructor(fullName, birthYear, course) {
//     //Always gotta happen first
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`my name is ${this.fullName} and I study ${this.course}`);
//   }
// }

const martha = new Student('martha jones', 2001, 'computing');
console.log(martha);
martha.introduce();

//Inheritance between classes: Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

// More classes examples
// 1. Public fields
// 2. Public methods
// 3. private methods
// 4. private fields

class Account {
  // 1. Public fields (instances)
  locale = navigator.language;

  //2. Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //Protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${this.owner}.`);
  }

  // 3. private methods
  // public interface: API
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  // 4. private fields
  _approveLoan(val) {
    // #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'Eur', 1111);

acc1.deposit(250);
acc1.withdraw(120);
acc1.requestLoan(1000);
console.log(acc1);
// console.log(acc1.#movements);

// Chaining
acc1
  .deposit(300)
  .deposit(500)
  .withdraw(230)
  .deposit(45)
  .requestLoan(13000)
  .withdraw(4500);
console.log(acc1.getMovements());
