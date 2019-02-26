import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from "./views/home"
import signInComponent from "./views/signIn"
import signUpComponent from "./views/signUp"
import allRecevierComponent from "./views/home/children/allRecevier"

Vue.use(Router)

let router=new Router({
  routes: [
    {path:"/",redirect:"/signIn"},
    {path:"/signIn",component:signInComponent},
    {path:"/signUp",component:signUpComponent},
    {
      path:"/home",
      component:homeComponent,
      redirect:"/home/allRecevier",
      children:[{path:"allRecevier/",component:allRecevierComponent}]
    },
  ]
})

// 导航守卫是专门用来通过跳转或者取消的方式来守卫导航
router.beforeEach((to,from, next)=>{
    // console.log(to,from)
    let token = localStorage.getItem("token") || ""

    // 拦截已登录状态，若token存在并且用户进入的是登录页面，则禁止跳转到登录页面，直接跳转到首页
    if(token && to.path==="/signIn"){
      // console.log("000")
      return next("/home")
    }
    // 拦截未登录的状态
    // 判断token是否存在
    // 存在表示已登录
    // 判断如果用户登录了就正常导航
    // 登录页面也不能进行拦截, 应当放行
    console.log(to.path)
    if(token || to.path==="/signIn" || to.path==="/signUp"){
      // console.log("111")
      //  如果token已经存在，且用户进入登录和注册页面时，直接执行当前路由
      next()
    }else{
      // console.log("222")
      //  如果token不存在，直接返回根目录重定向进入登录页面
      next("/")
    }
  // 一定要调用next函数进行路由传递
})

export default router
