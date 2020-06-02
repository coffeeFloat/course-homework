## 一.函数式编程概念
1. 英文： Functional Programming, 简称FP 
2. 编程范式之一， 与面向过程编程、面向对象编程并列
3. 思维方式：把现实世界中事物之间的联系抽象到程序中。（面向对象编程是把现实世界的事物抽象到程序中）
4. 这里的函数指的是数学中的函数，是一种映射关系，而非程序中的函数
5. 特点：相同的输入必然得到相同的输出、函数用来描述数据之间的关系、对运算过程的抽象

## 二.前置知识
#### 2函数是一等公民
1. 英文：First-class Function
2. 函数是一个普通对象 可通过new Function构造
3. 函数可以存储在变量中或者数组中
4. 函数可以作为参数
5. 函数可以作为返回值

#### 3高阶函数
1. 英文： Higher-order function
2. 特点：函数可作为参数传递给另一个函数、可以作为另一个函数的返回值

```
作为参数示例：模拟数组filter方法
function filter(arr, fn) {
  const result = [];
  for(let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

const arr = [1 , 2, 4 ,6 ,7 ,8];
const r = filter(arr, function(item) {
  return item % 2 === 1;
});

```
作为返回值：**将函数返回 而不是将函数的执行返回**
3. 高阶函数的意义：
- 抽象代码中的通用流程，只需要关注具体目标
- 代码更加简洁

#### 4闭包
本质：当函数栈上的函数在执行完毕后，如果该函数内部成员被仍被外部引用，那么该函数不会被释放。从而使内部函数可以访问外部函数

## 3.函数式编程基础
#### 5.纯函数
1. 概念：数学中函数的概念 相同的输入得到相同的输出，函数式编程的核心
2. 纯函数的好处：
 -  可缓存
 -  可测试
 -  可并行处理 多线程同时操作 因为没有需要共享的数据 且 相同输出得到相同结果

#### 6.柯里化
概念： 当函数调动的时候，可以先调用一部分参数，并返回另一个函数，调用另一部分参数。

#### 7.Lodash中的柯里化方法
1. 函数名： curry
2. 功用：可以将一个多元函数转化为一元函数。示例如下：
```
const _ = require('lodash');

function getSum (a, b, c) {
  return a + b + c;
}

const curryGetSum = _.curry(getSum);

console.log(curryGetSum(1, 2, 3));  // 6
console.log(curryGetSum(1)(2, 3));  // 6
console.log(curryGetSum(1, 2)(3));  // 6

```
3. 柯里化案例启示：柯里化可以辅助开发功能性函数的抽象。最大化减少参数的传递。方便重复的调用，是一种不错的调用范式。
```
const _ = require('lodash');

const match = _.curry(function(reg, str) {
  return str.match(reg);
});

const matchSpace = match(/\s+/g);  // 抽象出匹配空格
const matchNumber = match(/\d+/g); // 抽象出匹配数字

// console.log(matchSpace('Hector Yang'));
// console.log(matchSpace('Hector_Yang'));
// console.log(matchNumber('232rieri'));

// const filter = _.curry(function(func, arr) {
//   return arr.filter(func);
// });
const filter = _.curry((func, arr) => arr.filter(func)); // 抽象出匹配带空格的数组

const filterSpace = filter(matchSpace);
console.log(filterSpace(['hello world', 'hello_world']));

```

4. 柯里化函数的实现方法：
```
function curry(func) {
  // 返回一个函数 
  //当实参小于形参时，该函数返回一个继续接受剩余参数的函数
  // 反之 返回个直接可以执行的函数
  return function curried(...args) {
    if (args.length < func.length) {
      // 当实参小于形参时 返回一个继续接收剩余参数的函数
      // 继而 继续判断 当实参小于形参时。。。。  反之。。。。
      // 所以应采用递归
      return function () {
        return curried(...args.concat(Array.from(arguments)));
      }
    } else {
      return func(...args);
    }
  }
}

```

### 函数的组合

#### 函数组合概念：
- 将需要经过多个函数处理才能得到结果的方式 转化为 将多个函数进行组合形成一个函数来处理 即为函数组合
- 函数组合默认从右到左执行各个函数
```
const reverse = arr => arr.reverse();
const first = arr => arr[0];
const upper = str => str.toUpperCase();

// loash中compose使用：
const fn = _.flowRight(upper, first, reverse);
console.log(fn(['one', 'two', 'three'])); // THREE

const fn2 = _.flow(reverse, first, upper);
console.log(fn2(['one', 'two', 'three'])); // THREE


// 模拟compose实现：
function compose(...args) {
  return function(value) {
    return args.reverse().reduce(function(res, fn) {
      return fn(res);
    }, value);
  }
}

箭头函数方式：
const compose = (...args) => (value) => args.reverse().reduce((res, fn) => fn(res), value);

```
```
// 函数组合与函数柯里化的共同实现：
// 组合函数中的调试
const _ = require('lodash');
// 将字符串 WELCOME TO CHINA 转化成小写 并用 - 连接

// 1.split 
const split = _.curry((sep, str) => str.split(sep));

// 2.map
const map = _.curry((fn, arr) => arr.map(fn));

// 3.join
const join = _.curry((sep, arr) => arr.join(sep));

// 组合函数的调试方法
const debug = _.curry((tag, val) => {
  console.log(tag, val);
  return val;
});

const fn = _.flowRight(join('-'), debug('map之后'), map(_.toLower), debug('split之后'), split(' '));

console.log(fn('WELCOME TO CHINA'));

```

#### lodash/fp 模块
- 全称：function programming
- 对函数式编程友好
- 特点：实现了柯里化编程，当方法需要传递多个参数时，函数优先 数据滞后
```
const fp = require('lodash/fp');

// 示例
const split = fp.split(' ');
console.log(split('hello world'));

// 应用
const fn = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '));
console.log(fn('WELCOME TO CHINA'));

```
#### map方法在lodash 以及 lodash/fp中的区别
```
const _ = require('lodash');
const fp = require('lodash/fp');

console.log(_.map(['23', '12', '44'], parseInt));

console.log(fp.map(parseInt, ['23', '12', '44']));

// 两个模块中方法参数中接收的参数是不一样的 需要注意

```

#### **Point Free**模式：即为函数的组合
概念： 不关注数据的传递、将多个执行过程抽象为一个函数的方式，即为**Point Free**模式
```
const fp = require('lodash/fp');

// 案例一
const fn = fp.flowRight(fp.replace(/\s+/g, '-'), fp.toLower);
console.log(fn('HELLO WORLD'));

// 案例二 组合函数的嵌套
const fn2 = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '));
console.log(fn2('world wild web'));

```

## 四.Functor 函子
- 函数式编程中的运算不直接操作值 而由函子完成
- 函子实现了一个map方法
- map方法最终返回一个新的盒子

#### maybe 函子
当传入的值不确定时，尤其当值为null、undefined时，对此类情况进行处理
```
class Maybe {
  static of (value) {
    return new Maybe(value);
  };

  constructor (value) {
    this._value = value;
  };

  // 当值为null 或者 undefined时，返回一个value为null的Maybe类
  // 反之 返回一个value为经过fn函数处理的Maybe类
  map(fn) {
    // return Maybe.of(fn(this._value));
    return this.isNullOrUndefined() ? Maybe.of(null) : Maybe.of(fn(this._value));
  };

  isNullOrUndefined() {
    return this._value === undefined || this._value === null;
  };
}

```

#### either 函子
通过创建两个函子 一个处理正确结果 另一个处理错误 来达到对错误的准确提示
```
// either 函子 处理错误

class Left {
  static of (value) {
    return new Left(value);
  };
  constructor(value) {
    this._value = value;
  };

  // 直接返回对象
  map(fn) {
    return this;
  }
}

class Right {
  static of (value) {
    return new Right(value);
  };
  constructor(value) {
    this._value = value;
  };

  map(fn) {
    return Right.of(fn(this._value));
  }
}

const parseJson = (str) => {
  try {
    return Right.of(str).map(str => JSON.parse(str));
  } catch(e) {
    return Left.of({error: e.message});
  }
}

```

#### IO 函子
- 目标：将对数据的处理过程放置于函子外部，即将不确定性放置于函子外部
- 方式：将传入的函数(对数据的处理)经过函数组合包裹成新的_value，并将该函数作为值抛出，通过对_value的执行获取最终结果。

```
const fp = require('lodash/fp');

class Io {
  static of (value) {
    return new Io(function() {
      return value;
    });
  }
  constructor (fn) {
    this._value = fn;
  };

  map(fn) {
    return new Io(fp.flowRight(fn, this._value));
  }
};

// 使用：
const r = Io.of('hello world').map(str => str.toUpperCase());
console.log(r._value());  // HELLO_WORLD

```

#### Task 函子
##### folkTale库
- 标准的函数式编程库
- 与lodash不同之处：没有提供很多功能函数
- 只提供函数式处理的操作，如compose、curry等；还有些函子Task、Either、MayBe等
```
// folktale库的基本使用：

const { compose, curry } = require('folktale/core/lambda');
const _ = require('lodash');

// 接收两个参数 第一个为函数的参数长度，第二个为函数
const fn = curry(2, (x, y) => x + y);

console.log(fn(1, 3)); // 4
console.log(fn(1)(3)); // 4

const fn2 = compose(_.toUpper, _.first);
console.log(fn2(['one', 'two'])); // ONE

```

##### folkTale库 task函子处理异步任务
```
// Task 处理异步任务
const fs = require('fs');
const { task } = require('folktale/concurrency/task');
const { split, find, flowRight } = require('lodash/fp');

function readFile (filename) {
  // 返回一个函子
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) resolver.reject(err);
      resolver.resolve(data);
    });
  });
}

readFile('package.json')
  // .map(split('\n'))
  // .map(find(x => x.includes('version')))
  .map(flowRight(find(x => x.includes('version')), split('\n')))
  .run()
  .listen({
    onRejected: err => {
      console.log(err);
    },
    onResolved: value => {
      console.log(value);
    }
  })

```

#### pointed 函子 

概念：使用 of 静态方法创建函子的方式 （以上已经用到了）

#### monad函子 
功能：在IO函子的基础上增加对函子嵌套问题的处理
方式：增加join、flatMap方法
```
const fp = require('lodash/fp');

class Io {
  static of (value) {
    return new Io(function() {
      return value;
    });
  }
  constructor (fn) {
    this._value = fn;
  };

  map(fn) {
    return new Io(fp.flowRight(fn, this._value));
  };
  join() { 
    return this._value();
  };
  flatMap(fn) {  //降解处理 获取_value
    return this.map(fn).join();
  } 
};

// IO函子使用：
// const r = Io.of('hello world').map(str => str.toUpperCase());
// console.log(r._value());

// monad函子使用：
const getStr = function (str) {
  return new Io(function() {
    return str;
  });
}
const upper = str => {
  return new Io(function() {
    return str.toUpperCase();
  });
}

const r2 = getStr('hello world')
            .map(fp.replace(/\s+/g, '-'))
            .flatMap(upper)
            .join();
console.log(r2);

```