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

// =导航守卫是专门用来通过跳转或者取消的方式来守卫导航
router.beforeEach((to,from, next)=>{
    console.log(to,from)
    let token = localStorage.getItem("token") || ""

    // 拦截已登录状态，若token存在并且用户进入的是登录页面，则禁止跳转
    if(token && to.path=="/signIn"){
      return next("/home")
    }
})

export default router
