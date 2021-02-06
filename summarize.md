### 1. 一个页面里切换路由(嵌套路由)，浏览器顶部导航页的title也跟着改变

#### 实现的步骤: 只需要2个钩子函数
```
created():

beforeRouteUpdate(to, from,  next){
    // console.log(to, from, next)
    // console.log('beforeRouteUpdate')
    document.title = to.meta.title;
    next();
  },
```
 



### 2. $route/$touter/this.$route/this.$router傻傻分不清楚
#### $route

#### $route

#### this.$route

#### this.$router

