import Vue from "vue"
// 引入axios
// 可以将上面的axios配置抽离出去,将配置包装成对象暴露出来，遍历后添加到axios的默认配置上面
import config from "./config"
import axios from "axios"
import router from "../router";
// 将axios挂载到Vue的原型上
Vue.prototype.$http=axios
// // 配置根域名
// axios.defaults.baseURL="http://www.litc.pro:9999/v1"
// // `withCredentials` 表示跨域请求时是否需要使用凭证
// //  withCredentials: false, // 默认的
// // 注册提交验证码时需要配置
// axios.defaults.withCredentials=true
for(const k in config){
    axios.defaults[k]=config[k]
}


// 添加请求拦截器
axios.interceptors.request.use(function(config){
    // 发送请求之前对token 进行验证
    let token=localStorage.getItem("token") || ""
    config.headers.Authorization=token
    return config
},function(error){
    // 返回错误的回调函数
    return Promise.reject(error)
})

// 添加响应拦截
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    response=response.data
    return response;
}, function (error) {
    // 对响应错误做点什么
    Vue.prototype.$message({
        showClose:true,
        type:"error",
        message:error.response.data.errMsg
    })
    // err.response.data.status=401是token出错
    console.log(typeof error.response.data.status,error.response.data.status)
    if(error.response.data.status == 401){
        console.log("响应拦截器")
        // 先删除token
        localStorage.removeItem("token")
        localStorage.removeItem("userInfo")
        // 跳转到登录页面
        router.push("/")
    }
    // 返回一个错误的回调函数
    return Promise.reject(error);
});
export default axios