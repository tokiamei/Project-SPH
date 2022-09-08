const myPlugin = {}

/* 
  Vue.js 的插件应该暴露一个 install 方法。
  这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
 */
myPlugin.install = function (Vue, options) {
  Vue.directive(options.name, () => {
    console.log('执行');
  })
} 

export default myPlugin