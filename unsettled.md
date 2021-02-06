### 路由时重复点击同一页面，报错
NavigationDuplicated: Avoided redundant navigation to current location: "/index"，
按照网上的方法也解决不了：在router的index.js里加入如下代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
