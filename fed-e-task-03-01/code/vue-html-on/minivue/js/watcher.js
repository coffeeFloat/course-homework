/**
 * 观察者功能：
 * 1. 当数据发生变化时 dep通知所有的watcher实例更新视图
 * 2. 自身实例化时，往dep对象上添加自己
*/

class Watcher {
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb

    // 把watcher对象记录到Dep类的静态属性target
    Dep.target = this
    // 触发get方法，在get方法中会调用addSub
    this.oldValue = vm[key]
    Dep.target = null
  }
  // 当数据发生变化时 更新视图
  update () {
    let newValue = this.vm[this.key]
    if (this.oldValue === newValue) {
      return
    }
    this.cb(newValue)
  }
}