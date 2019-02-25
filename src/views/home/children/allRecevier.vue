 <template>
  <div class="all-recevier-container">
    <el-table :data="allRecevier" style="width: 100%">
      <el-table-column prop="id" label="编号" width="150"></el-table-column>
      <el-table-column prop="receiver_name" label="姓名" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
      <el-table-column prop="province" label="省份"></el-table-column>
      <el-table-column prop="city" label="市"></el-table-column>
      <el-table-column prop="area" label="区"></el-table-column>
      <el-table-column prop="detailed_address" label="详细地址"></el-table-column>
    </el-table>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      allRecevier:[]
    };
  },
  created(){
    this.getAllRecevier()
  },
  methods:{
    getAllRecevier(){
      let token=localStorage.getItem("token") || ""
      this.$http.get("/users/getReceiverAddress")
      .then(result=>{
        // console.log(result)
        this.allRecevier=result.data
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }
};
</script>
<style lang="less">
  .all-recevier-container{
    padding: 30px;
    .cell{
      text-align: center;
    }
  }
</style>
