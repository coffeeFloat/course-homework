// 代码题1

const fp = require('lodash/fp');

const cars = [
  {name: 'Ferrari FF', horsepower: '660', dollar_value: 700000, in_stock: true},
  {name: 'Spyker C12 Zagato', horsepower: '650', dollar_value:648000, in_stock: false},
  {name: 'Jaguar XKR-S', horsepower: '550', dollar_value:132000, in_stock: false},
  {name: 'Audi R8', horsepower: '525', dollar_value:114200, in_stock: false},
  {name: 'Aston Martin One-77', horsepower: '750', dollar_value:185000, in_stock: true},
  {name: 'Pagani Huayra', horsepower: '700', dollar_value:130000, in_stock: false},
];

// 练习1：
const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last);

console.log(isLastInStock(cars));

// 练习2:
const getLastName = fp.flowRight(fp.prop('name'), fp.first);

console.log(getLastName(cars));

// 练习3:
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length;
}

const averageDollarValue = fp.flowRight(_average, fp.map(item => item.dollar_value));
console.log(averageDollarValue(cars));

// 练习4:
let _underscore = fp.replace(/\W+/g, '_');

const sanitizeNames = fp.map(fp.flowRight(_underscore, fp.toLower));

console.log(sanitizeNames(['Hello World', 'Hello Kitty']));

// -------------------------------------------------------------------------------------------------------------

// 代码题2
const { Maybe, Container } = require('./support');

// 练习1:
let maybe = Maybe.of([5, 6, 1]);
let ex1 = x => maybe.map(fp.map(fp.add(x)));

console.log(maybe);
console.log(ex1(2));

// 练习2:
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
let ex2 = arr => arr.map(fp.first)._value;
console.log(ex2(xs));

// 练习3:
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x]);
});
let user = {
  id: 2,
  name: 'Albert',
};
// let ex3 = user => fp.first(safeProp('name', user)._value);
let ex3 = user => safeProp('name', user).map(fp.first)._value;
console.log(ex3(user));

// 练习4:
let ex4 = n => Maybe.of(n).map(parseInt)._value;

console.log(ex4('6'));
