<template>
  <div class="home-container">
    <el-row class="tac">
      <el-col :span="3">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户中心</span>
            </template>
            <el-menu-item-group>
              <template slot="title">收货人信息</template>
              <el-menu-item index="1-1">全部收货人</el-menu-item>
              <el-menu-item index="1-2">武汉收货人</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="用户安全">
              <el-menu-item index="1-3">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <div class="header">
          <span>用户名：{{ userInfo.username }}</span>
          <el-button type="danger" @click="signOut">退出登录</el-button>
        </div>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}")
    };
  },
  methods: {
    handleOpen(index, indexPath) {
      // console.log(index,indexPath,"open")
    },
    handleClose(index, indexPath) {
      // console.log(index,indexPath,"close")
    },
    handleSelect(index, indexPath) {
      console.log(index, indexPath, "select");
      console.log(this.$router);
      switch (index) {
        case "1-1":
          this.$router.push("/home/allRecevier");
          break;
        // case "1-2": this.$router.push("/home/wuhanRecevier")
        // break
      }
    },
    // 退出登录
    signOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      this.$message({
        type: "success",
        message: "恭喜您退出成功!"
      });
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less" scoped>
.home-container {
  .el-menu {
    border: none;
  }
  .header {
    height: 50px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
