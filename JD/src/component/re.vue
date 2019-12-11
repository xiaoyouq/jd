<template>
  <div class="re1s">
    <div>
      <div class="reImage">
        <img :src="iamge1" alt />
        <p>设置登录密码</p>
      </div>
      <input
        class="elinput1"
        @input="inputChange(input)"
        v-model="input"
        type="password"
        placeholder="请输入密码"
      />
      <p class="passwordP" v-if="flag">密码由8-20位字母、数字或半角符号组成,不能是10位一下纯数字/字母/半角符号,字母需要区分大小写</p>
      <div class="csmmqd" v-else>
        <p :class="[num.length>=8?'red':'']">
          弱:
          <span></span>
        </p>
        <p :class="[num.length>=12?'greenyellow':'']">
          中:
          <span></span>
        </p>
        <p :class="[num.length>=15?'orange':'']">
          强:
          <span></span>
        </p>
      </div>
      <el-button class="elButtons" type="danger" @click="getAxios" :disabled="flag">完成</el-button>
      <p class="lxkf">
        遇到问题？请&nbsp;
        <span>联系客服</span>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import { Dialog } from "vant";
import { Loading } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      iamge1: require("../assets/iconfont/shezhimima123.png"),
      input: "",
      flag: true,
      num: 0,
      iphones: ""
    };
  },
  methods: {
    getAxios() {
      if (this.num.length < 8) {
        Dialog.confirm({
          title: "提示",
          message: "密码长度不够!",
          showCancelButton: false
        });
      } else if (this.num.length >= 8 && this.num.length <= 12) {
        Dialog.confirm({
          title: "提示",
          message: "密码太简单了!确定要用吗"
        })

          .then(() => {
            this.$axios
              .post("/api/newnb", { iphone: this.iphones })
              .then(data => {
                console.log(data);
              });
            var str = { iphone: this.iphones, password: this.input };
            this.$axios.post("/api/resgIphone", str).then(data => {
              console.log(data.data.data);
              this.$cookies.set("username", "qwe");
              this.$cookies.set("userInfoCode", data.data.data);
            });
            // on confirm
            Toast.success({
              message: "注册成功",
              type: "success",
              duration: 1000
            });
            setTimeout(el => {
              this.$router.push({ path: "/tabbar5" });
            }, 1200);
          })
          .catch(() => {
            // on cancel
          });
      } else if (this.num.length >= 15 || this.num.length >= 13) {
        this.$cookies.set("username", "qwe");
        Dialog.confirm({
          title: "提示",
          message: "注册成功 登录手机号为\n" + this.iphones,
          showCancelButton: false
        })
          .then(() => {
            this.$axios
              .post("/api/newnb", { iphone: this.iphones })
              .then(data => {
                console.log(data);
              });
            var str = { iphone: this.iphones, password: this.input };
            this.$axios.post("/api/resgIphone", str).then(data => {
              this.$cookies.set("userInfoCode", data.data.data);
            });
            // on confirm
            console.log("ok");
            Toast.success({
              message: "注册成功",
              type: "success",
              duration: 1000
            });
            setTimeout(el => {
              this.$router.push({ path: "/userIndex" });
            }, 1200);
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    // 监听input框的变化
    inputChange(e) {
      this.num = e;
      if (e.length > 0) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  },
  created() {
    this.iphones = this.$route.query.iphone;
  }
};
</script>

<style scoped>
.re1s {
  width: 100%;
  height: 600px;
  background-color: white;
}
.re1s {
  width: 100%;
  height: 600px;
  background-color: white;
}
.reImage {
  width: 100%;
}
.reImage img {
  width: 143px;
  height: 106px;
  margin-left: 120px;
}
.reImage p {
  color: black;
  text-align: center;
  font-size: 17px;
  margin-top: 10px;
}
.elinput1 {
  width: 90%;
  margin-left: 18px;
  border: none;
  border-bottom: 1px solid #f5f5f5;
  margin-top: 30px;
}
.passwordP {
  width: 90%;
  color: #c8c8c8;
  margin: 0 auto;
}
.elButtons {
  width: 90%;
  height: 50px;
  border-radius: 30px;
  margin-left: 15px;
  font-size: 18px;
  margin-top: 35px;
}
.lxkf {
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
.lxkf span {
  color: blue;
}
.csmmqd {
  width: 80%;
  margin: 0 auto;
  display: flex;
}
.csmmqd p {
  width: 30%;
  display: flex;
  align-items: center;
}
.csmmqd span {
  width: 50px;
  height: 10px;
  border: 2px solid gray;
}
.red span {
  background-color: red;
}
.greenyellow span {
  background-color: greenyellow;
}
.orange span {
  background-color: orange;
}
</style>