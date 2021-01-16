let _Vue = null
export default class VueRouter {
  static install (Vue) {
    // 1. 判断是否已经安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2. 存储Vue
    _Vue = Vue
    // 3. 将创建Vue实例时传入的router对象存储到Vue原型上 便于直接访问到router对象
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    this.routeMap = {}
    // 将current设置为响应式数据
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init () {
    // this的指代由调用者决定
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  // 设置routeMap
  createRouteMap () {
    // 读取router值，将path作为键，将component作为值
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  // 设置组件
  initComponents (Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>'
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        // 阻止默认操作、添加历史记录、设置当前路由
        clickHandler (e) {
          // history.pushState({}, '', this.to)
          location.hash = this.to
          // this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const self = this
    // 渲染当前路由对应组件
    Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    // 监听浏览器当前地址变化、设置当前路由
    // window.addEventListener('popstate', () => {
    //   this.data.current = window.location.pathname
    // })
    window.addEventListener('hashchange', () => {
      const hash = location.hash.substring(1) ? location.hash.substring(1) : '/'
      this.data.current = hash
    })
  }
}
