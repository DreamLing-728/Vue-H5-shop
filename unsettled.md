### 路由时重复点击同一页面，报错
```js
NavigationDuplicated: Avoided redundant navigation to current location: "/index"，
按照网上的方法也解决不了：在router的index.js里加入如下代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
```

### 为什么issue输出那里就有isHide和active属性了呢
```js
getAttrs(conText, payload) {
  getAttrsData(payload.keyword).then((res) => {
      console.log('store-getAttrs', res.data);    // issue 
      // 结果增加属性：isHide, active
      for(let i = 0; i < res.data.length; i ++) {
          console.log('store-增加isHide属性');
          res.data[i].isHide = false;
          for(let j = 0; j < res.data[i].param.length; j ++) {
              res.data[i].param[j].active = false;
          }
      }
      conText.commit('SET_ATTRS', {attrs: res.data})
      if(payload.success){
          payload.success();
      }
  })
},
```