class Vue {
  constructor (options) {
    // 1.通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 2.把data中的成员转换成getter、setter,注入到vue实例中
    new Observer(this.$data)
    this._proxyData(this.$data)
    new Compiler(this)
  }
  _proxyData(data) {
    // 遍历所有data属性并将其注入到Vue实例中
    Object.keys(data).forEach(key => {
      // 给Vue实例中的每个属性添加 getter、setter
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get () {
          console.log('1');
          return data[key] // 调用data对象属性的getter方法
        },
        set (newVal) {
          if (data[key] === newVal) {
            return
          }
          data[key] = newVal
        }
      })
    })
  }
}