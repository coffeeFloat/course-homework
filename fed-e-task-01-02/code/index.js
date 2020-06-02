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
const 