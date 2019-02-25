<template>
  <div class="sign-up-container">
    <el-form
      ref="signUp"
      label-width="100px"
      class="demo-ruleForm"
    >  
      <h1>注册</h1>
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="passwordConfirm"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码" class="vCodeBox">
        <el-input v-model="vCode" @keyup.native.enter="signUp"></el-input>
        <div class="vCodeSvg" v-html="vCodeSvg" @click="getVcode"></div>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button type="primary" @click="signUp">注册</el-button>
        <router-link to="/signIn">已有账号？去登录框！</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    data(){
        return {
            username:"",
            password:"",
            passwordConfirm:"",
            nickname:"",
            vCode:"",
            mobile:"",
            vCodeSvg:""
        }
    },
    created(){
      this.getVcode()
    },
    methods:{
      getVcode(){
        this.$http.get("/users/getVCode").then(result=>{
          // console.log(result)
          this.vCodeSvg=result
        })
      },
      signUp(){
        let {username,password,passwordConfirm,nickname,vCode,mobile}=this
        if(
          !username.trim()||
          !password.trim()||
          !nickname.trim()||
          !vCode.trim()||
          !mobile.trim()
        ){
          return this.$message({
            showClose:true,
            type:"error",
            message:"请检查输入是否为空！"
          })
        }
        if(password.trim() != passwordConfirm.trim()){
          return this.$message({
            showClose:true,
            type:"error",
            message:"两次输入的密码不一致！"
          })
        }
        this.$http.post("/users/register",{
          username,
          password,
          nickname,
          vCode,
          mobile
        }).then(result=>{
          // console.log(result)
          if(result.status==200){
            this.$message({
              showClose:true,
              type:"success",
              message:result.succMsg
            })
          }
          // 将token和用户信息存到localStorage
          localStorage.setItem("token",result.data.token)
          localStorage.setItem("userInfo",JSON.stringify(result.data))

          // 直接跳转到首页
          this.$router.push("/home")
        })
      }
    }
}
</script>
<style lang="less">
.sign-up-container{
    margin-top: 30px;
    .vCodeBox{
        .el-form-item__content{
            display: flex;
            .el-input{
                width: 60%;
            }
            .vCodeSvg{
                margin-left: 30px;
            }
        }
    }
}
</style>
