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
