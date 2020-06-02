#### 1.值为 10
理由：
在for循环中通过 i 声明的变量是一个全局变量，且不存在块级作用域。
当i不断累加时，数组各项中的函数内部的i,即全局i最后会被累加到 10。

#### 2.会报错
```
Cannot access 'tmp' before initialization
```
原因：由于块级作用域的原因以及let声明不会提升的原因 会存在暂时性死区

#### 3.解答在代码文件中
```
var arr = [12, 34, 32, 89, 4];
const min = Math.min(...arr);
console.log('min: ', min);

```

#### 4.var const let 的区别
var声明的变量可以不存在块级作用域
存在变量声明提升

const let 变量存在块级作用域 不能重复声明
不会变量声明提升

块级作用域内存在暂时性死区

const声明的变量的值不能被修改  let 可以


#### 5. 输出是10

箭头函数内部的this根据执行时的周围环境所决定 故而指向window

#### 6. 简述Symbol类型的用途

一种全新的数据类型
创建的值永远是唯一的
主要用法：为对象添加独一无二的属性名 为对象添加私有属性

Symbol的for方法可用于创建相同的Symbol数据

Symbol内置了一些内置的属性，指向语言内部使用的方法 例如： iterator toStringTag等

对象的属性类型为Symbol的 无法被 for in语句、Object.keys、JSON.Stringfy等遍历出来
只有通过Object.getOwnPropertySymbols方法才行

可以通过为对象添加Symbol.iterator方法实现对象的遍历

#### 7 深浅拷贝的区别

浅拷贝：只拷贝数据地址的指引，获取的数据地址与原数据一致
深拷贝：拷贝数据对应的值，跟原数据存放在不同的地址


#### 8. javascript异步编程、宏任务、微任务
JavaScript异步编程：
针对单线程执行代码导致的请求数据时间过长影响代码执行进度从而影响用户体验问题的改进。
在进行异步请求时，请求回调会被加入到事件队列中，等待执行。不会影响后续代码的执行

宏任务：事件队列。单线程执行代码时的事件队列 如 timeout事件回调
微任务：宏任务执行时所附加的事件，会在宏任务执行完成时附带执行。如异步回调

#### 9.

```
const setPromise = (value) => {
  return Promise.resolve(value);
}

Promise.all([
  setPromise('hello'),
  setPromise('lagou'),
  setPromise('I ❤︎ U'),
]).then((values) => {
  console.log(values.join(' '));
});

```


#### 10.简述TypeScript与JavaScript的关系？

Typescript = javascript + 类型系统 + ES6+  +  ...;
Typescript语言可以编译为JavaScript语言
Typescript语言更加 强大、生态更加健全 更加完善

#### 11 TypeScript的优缺点

1.多了很多概念 有学习成本
2.新内容呈现渐进式  容易接受
3.项目初期 Typescript会增加一些成本 需要编写很多类型 但属于一劳永逸的类型 
4.有强类型语言所具有的优势：错误更早暴露、代码更智能 编码更准确、重构更牢靠、减少不必要的类型判断
