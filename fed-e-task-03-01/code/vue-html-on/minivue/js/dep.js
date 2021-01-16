/**
 * 发布者功能：
 * 1. 收集依赖，添加观察者（watcher）
 * 2. 通知所有观察者
*/

class Dep {
  constructor () {
    this.subs = []
  }
  addSub (sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}