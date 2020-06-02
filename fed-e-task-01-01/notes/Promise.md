#### 1.使用promise进行嵌套是错误的
正确的使用方式应为 借助then方法链式调用的特点 从而实现异步编程扁平化的编程方式

#### 2.promise的then方法都是为上一个then方法返回的promise对象明确状态的回调。
#### 3.promise链式调用特点：
1.then方法会返回一个全新的Promise对象
2.后面的then方法会为前面的then方法返回的Promise注册回调
3.前面then方法的返回值会作为下一个then方法的参数
4.如果then方法返回的是一个Promise,那么下一个then方法的回调会等这个promise			
的终结
#### 4. promise 异常捕获
then方法的第二个回调只会捕获前一个then方法的异常
promise实例的catch方法可以捕获链式调用上的任何异常。

#### 5.Promise的静态方法  resolve、reject
其特点类似promise对象中传递的resolve、reject回调
另外当resolve静态方法中传递一个prosime对象时 返回的仍是这个对象。

#### 6. promise的回调是个微任务
为了提高代码运行效率 会在promise执行后 直接执行回调
而timeout方法的回调会作为宏任务 放到任务队列中执行

#### 7. async/await 函數相比于generator异步方案
前者不需要另写一个执行函数 
前者会返回一个promise对象 可以执行then方法 
	  