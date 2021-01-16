/**
 * 功能：
 * 负责把data选项中的属性转换成响应式数据
 * data中的某个属性也是对象，把该属性转换成响应式数据
 * 数据变化发送通知
 * */ 

class Observer {
  constructor (data) {
    this.walk(data)
  }
  walk (data) {
    // 1. 判断data是否是对象
    if (!data || typeof data !== 'object') {
      return
    }
    // 2. 遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, value) {
    const that = this
    let dep = new Dep()
    this.walk(value)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get () {
        console.log('2');
        Dep.target && dep.addSub(Dep.target)
        return value // 不能使用 data[key] 否则会发生自调用递归报错
      },
      set (newVal) {
        if (value === newVal) {
          return
        }
        value = newVal
        that.walk(newVal)
        // 发送通知
        dep.notify()
      }
    })
  }
}