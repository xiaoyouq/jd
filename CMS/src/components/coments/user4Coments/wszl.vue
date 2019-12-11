<template>
  <div :style="note1" class="tjzl">
    <div    class="block" v-if="fls">
      <div class="headerTop">
        <div>
          <span class="demonstration">生日:</span>
          <el-date-picker ref="daty" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <el-button @click="tj4">提交</el-button>
      </div>
    </div>
    
    <div v-else>
          <h1 class="zlwswb">资料已经完善<i class="el-icon-circle-check"></i></h1>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { promises } from "fs";
Vue.filter("fsDate", function(el) {
  var date = new Date(el);
  var Y = date.getFullYear() + "年";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "月";
  var D =
    date.getDate() < 10 ? "0" + date.getDate() + "日" : date.getDate() + "日";
  return `${Y}-${M}-${D}`;
});
export default {
  data() {
    return {
      value1: "",
      value2: "",
      name: this.$store.state.datass.account,
      fls:true,
      note1: {
        backgroundImage:
          "url(" + require("../../../assets/image/user24image4.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "77.27% 83%",
        height: "100%",
        position: "fixed",
        width: "100%"
      },
    };
  },
  methods: {
    tj4() {
      this.axios
        .get("/api/wszluser?b=" + this.value1 + "&name=" + this.name)
        .then(data => {
          if(this.value1 ==''){
            this.$message('不能为空');
            return;
          }
          if (data.data.error_code == 200) {
            this.$message('提交成功');
            this.value1 = "";
            this.fls = false
            this.$store.state.datass = data.data.data;
            return;
          } else {
            this.$message.error("修改失败");
          }
        });
    }
  },
  created() {
    // 请求完善资料页面
    if(this.$store.state.datass.birthday == undefined){
          return  this.fls = true
    }else{  
          return this.fls = false
    }
  }
};
</script>
<style>
.tjzl button{
  width:10%;
  margin-left: 450px;
  margin-top: 30px;
}
.demonstration {
  margin-left: 400px;
}
.headerTop {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
}
.zlwswb{
  color: red;
  margin-left: 400px;
  margin-top: 230px;
}
</style>