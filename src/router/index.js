// eslint-disable-next-line
import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

// 解决 NavigationDuplicated: Avoided redundant navigation to current location 报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: "/",
    name: "home ",
    redirect: "/index",
    component: () => import("../pages/home/main/Index.vue"),
    meta: {keepAlive: false},
    children: [
        {
          path: "index",
          name: "index",
          component: () => import("../pages/home/index/Index.vue"),
          meta: {keepAlive: false, title: "首页"}
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("../pages/home/cart/Index.vue"),
          meta: {keepAlive: false, title: "购物车"}
        },
        {
          path: "my",
          name: "my",
          component: () => import("../pages/user/ucenter/Index.vue"),
          meta: {keepAlive: false, title: "我的"}
        }
    ] 
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,  //自动获取根目录路径
  routes
});




// router.beforeEach((to,from,next)=>{
//   console.log(to)
//   if (to.meta.auth){
//       if (Boolean(localStorage['isLogin'])){
//           next();
//       } else {
//           next("/login");
//       }
//   } else {
//       next();
//   }
// });

export default router;
