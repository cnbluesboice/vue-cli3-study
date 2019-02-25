<template>
  <div class="sign-in-container">
    <el-form
      ref="signIn"
      label-width="100px"
      class="demo-ruleForm"
    >  
      <h1>登录</h1>
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" @keyup.native.enter="signIn"></el-input>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button type="primary" @click="signIn">登录</el-button>
        <router-link to="/signUp">没有注册？去注册！</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    data(){
        return {
            username:"",
            password:""
        }
    },
    methods:{
      signIn(){
        let {username,password}=this
        if(!username.trim() || !password.trim()) {
          return this.$message({
            type:"error",
            message:"输入为空！"
          })
        }
        this.$http.post("/users/login",{
          username,
          password
        })
        .then(result=>{
          // console.log(result)
          this.$message({
            type:"success",
            message:result.succMsg
          })
          // 登录成功后将token和用户信息保存在localStorage
          localStorage.setItem("token",result.data.token)
          localStorage.setItem("userInfo",JSON.stringify(result.data))
          // 跳转到首页
          this.$router.push("/home")
        })
        .catch(error=>{
          this.$message({
            showClose:true,
            type:"error",
            message:error
          })
        })
      }
    }
}
</script>
<style lang="less">
.sign-in-container,
.sign-up-container{
    width: 50%;
    position: relative;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 100px auto 0;
    h1{
        text-align: center;
        color: #0094ff;
        padding: 15px 0;
        font-size: 25px;
        font-weight: bold;
    }
    .bottom{
        .el-form-item__content{
            display: flex;
            justify-content: space-between;
            a{
                text-decoration: none;
                color: #0094ff;
            }
        }
    }
}
</style>
