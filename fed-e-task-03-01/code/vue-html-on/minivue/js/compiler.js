/**
 * 功能：
 * 负责模版编译 解析指令、差值表达式
 * 负责页面的首次渲染
 * 当数据变化后重新渲染视图
 * */ 

class Compiler {
  constructor (vm) {
    console.log(vm);
    this.el = vm.$el;
    this.vm = vm
    this.compile(this.el)
  }
  // 编译模版 处理文本和元素节点
  compile (el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      // 如果该节点仍然有子节点 则递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点、处理指令
  compileElement (node) {
    // console.log(node.attributes)
    // 遍历元素所有属性
    Array.from(node.attributes).forEach(attr => {
      // 判断属性是否为指令
      if (this.isDirective(attr.name)) {
        // 获取指令名称、指令值
        const attrName = attr.name.substr(2)
        const key = attr.value;
        this.updater(node, attrName, key)
      }
    })
  }
  updater (node, attrName, key) {
    if (this.isEvent(attrName)) {
      const [, eventType] = attrName.split(':');
      const eventName = key;
      console.log(eventType, eventName)
      this.eventHandler(node, eventType, eventName)
    } else {
      const updaterFn = this[attrName + 'Updater'];
      updaterFn && updaterFn.call(this, node, this.vm[key], key)
    }
  }
  // 处理v-text
  textUpdater (node, value, key) {
    node.textContent = value
    const watcher = new Watcher (this.vm, key, (newVal) => {
      node.textContent = newVal
      watcher.oldValue = newVal
    })
  }
  // 处理v-model 
  modelUpdater (node, value, key) {
    node.value = value
    const watcher = new Watcher (this.vm, key, (newVal) => {
      node.value = newVal
      watcher.oldValue = newVal
    })
    // 双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
  // 处理v-html
  htmlUpdater (node, value, key) {
    console.log(value)
    node.innerHTML = value;
    const watcher = new Watcher(this.vm, key, (newVal) => {
      node.innerHTML = newVal;
      watcher.oldValue = newVal;
    });
  }
  // 处理v-on
  eventHandler (node, eventType, eventName) {
    const fn = this.vm.$options.methods[eventName];
    console.log(node);
    !!fn && node.addEventListener(eventType, fn);
  }
  // 编译文本节点，处理差值表达式 
  compileText (node) {
    // console.dir(node)
    // {{  msg }}
    const reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    
    if (reg.test(value)) {
      console.log('compile value', value);
      const key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象，当数据改变时更新视图
      new Watcher (this.vm, key, (newValue) => {
        node.textContent= newValue
      })
    }
  }
  // 判断是否为指令
  isDirective (attrName) {
    return attrName.startsWith('v-')
  }
  // 判断是否是文本节点
  isTextNode (node) {
    return node.nodeType === 3
  }
  // 判断是否是元素节点
  isElementNode (node) {
    return node.nodeType === 1
  }
  // 判断是不是方法：
  isEvent(atterName) {
    console.log(atterName);
    return atterName.split(':')[0] === 'on'
  }
} 