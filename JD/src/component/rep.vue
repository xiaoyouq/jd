<template>
  <div class="rep">
    <div class="repsImage">
      <img :src="image1" alt />
    </div>
    <p class="repp">我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话</p>
    <div class="inputButton">
      <input type="text" v-model="iphoneCode" placeholder="请输入手机验证码" name id />
      <el-button type="danger" @click="getIphoneCode" :disabled="flag1">{{xyb | fl}}</el-button>
    </div>

    <el-button class="but" @click="goIphone" type="danger">下一步</el-button>
    <p class="lxkf">
      遇到问题？请&nbsp;
      <span>联系客服</span>
    </p>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.filter("fl", function(data) {
  if (data == "重新获取") {
    return "重新获取";
    return;
  } else {
    return data + "s";
  }
});
import { type } from "os";
export default {
  data() {
    return {
      image1: require("../assets/iconfont/iconfontRes.png"),
      iphoneCode: "",
      iphoneCode1: "",
      xyb: "下一步",
      flag1: true,
      timer: null,
      numberIphone:0
    };
  },
  methods: {
    goIphone() {
      if (this.iphoneCode == "") {
        Toast("验证码不能为空");
        return;
      }
      if (this.iphoneCode1 == this.iphoneCode) {
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 1000
        });
        setTimeout(ele => {
          this.$router.push({
            path: "/re",
            query: { iphone: this.$route.query.iphone }
          });
        }, 1200);
      } else {
        Toast("输入的验证码错误！");
      }
    },
    getIphoneCode() {
      this.xyb = 60;
      this.timer = setInterval(el => {
        this.flag1 = true;
        this.xyb -= 1;
        if (this.xyb == 0) {
          this.flag1 = false;
          this.xyb = "重新获取";
          clearInterval(this.timer);
        }
      }, 1000);
      Toast("验证码60秒中有效");
      setInterval(ele => {
        this.iphoneCode1 = "";
      }, 60000);
      this.$axios
        .get("/api/iphoneCode?iphone=" + this.numberIphone)
        .then(data => {
          this.iphoneCode1 = data.data.data;
        });
    }
  },
  created() {
    this.numberIphone = parseInt(this.$route.query.iphone)
    this.xyb = 60;
    this.timer = setInterval(el => {
      this.flag1 = true;
      this.xyb -= 1;
      if (this.xyb == 0) {
        this.flag1 = false;
        this.xyb = "重新获取";
        clearInterval(this.timer);
      }
    }, 1000);
    
    this.$axios
      .get("/api/iphoneCode?iphone=" + this.numberIphone)
      .then(data => {
        this.iphoneCode1 = data.data.data;
      });
    setInterval(ele => {
      this.iphoneCode1 = "";
    }, 60000);
  },
  mounted() {}
};
</script>

<style scoped>
.rep {
  width: 100%;
  height: 600px;
  background-color: white;
}
.repsImage {
  width: 90%;
  height: 140px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.repsImage img {
  width: 88px;
  height: 71px;
  margin: 0 auto;
  margin-top: 30px;
}
.repp {
  width: 90%;
  margin: 0 auto;
  color: #2e2d2d;
  font-size: 16px;
  line-height: 25px;
}
.inputButton {
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
  position: relative;
}
.inputButton button {
  width: 30%;
  left: 0%;
  position: absolute;
  border-radius: 30px;
  left: 65%;
  top: -13%;
}
.inputButton input {
  border: none;
  border-bottom: 2px #f4f4f4 solid;
}
.but {
  width: 90%;
  margin: 0 auto;
  height: 45px;
  border-radius: 30px;
  margin-top: 30px;
  margin-left: 15px;
}
.lxkf {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
.lxkf span {
  color: blue;
}
</style>