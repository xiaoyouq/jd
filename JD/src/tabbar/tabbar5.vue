<template>
  <div class="tabbar5">
    <div v-if="loginLogo" class="login">
      <div class="iphone1">
        <p>+86</p>
        <input
          style="padding-left: 45px;"
          type="number"
          minlength="11"
          maxlength="11"
          placeholder="请输入手机号"
          v-model="iphone"
        />
      </div>
      <div class="iphone1">
        <input
          type="number"
          @input="codeS(iphoneCode)"
          ref="codeI"
          v-model="iphoneCode"
          minlength="11"
          maxlength="11"
          name
          placeholder="请输入收到的验证码"
          id
          :disabled="flag4"
        />
        <button class="button1" @click="getPhone">{{getPPP | gethq}}</button>
      </div>
      <div class="loginButton">
        <el-button type="danger" @click="logo" :disabled="flag">登录</el-button>
        <el-button type="danger">一键登录</el-button>
      </div>
    </div>

    <div v-else class="login">
      <div class="iphone1">
        <!-- <p>+86</p> -->
        <input
          type="number"
          v-model="zhmmIphone"
          minlength="11"
          maxlength="11"
          placeholder="用户名/邮箱/手机号"
          @input="inputcc1(zhmmIphone)"
        />
      </div>
      <div class="iphone1">
        <input
          type="password"
          v-model="zhmmPassword"
          minlength="11"
          maxlength="20"
          name
          placeholder="用输入密码"
          @input="inputcc(zhmmPassword)"
        />
        <button class="button1" @click="getPhone1">忘记密码</button>
      </div>
      <div class="loginButton">
        <el-button type="danger" @click="logo1" :disabled="flag2">登录</el-button>
        <el-button type="danger">一键登录</el-button>
      </div>
    </div>

    <p class="xp">
      <span @click="lo">{{yzmdl}}</span>
      <span @click="iphoneRegister">手机快速注册</span>
    </p>

    <div class="jdms">
      <p>
        <span></span>
        <span>其他登录方式</span>
        <span></span>
      </p>
    </div>

    <div class="qt_login">
      <p>
        <img :src="images1" alt />
        <span>QQ</span>
      </p>
      <p>
        <img :src="images2" alt />
        <span>微信</span>
      </p>
    </div>

    <p class="zh_p">
      <span>未注册的手机号验证后将自动创建京东账号, 登录即代表您已同意</span>
      <span>京东隐私政策</span>
    </p>

    <div class="ws"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { MessageBox } from "mint-ui";
import { Toast } from "vant";
import { Tag } from "vant";
import { Dialog } from "vant";
Vue.filter("gethq", function(el) {
  if (el == "获取验证码") {
    return el;
  } else {
    return el + "s";
  }
});
export default {
  data() {
    return {
      zhmmIphone: "",
      zhmmPassword: "",
      flag: true, //登录按钮 在一定的条件下变成false
      flag2: true,
      flag4: true,
      loginLogo: true,
      iphone: "",
      images1: require("../assets/iconfont/qq.png"),
      images2: require("../assets/iconfont/wx.png"),
      iphoneCode: "",
      iphoneCodes: 0,
      getPPP: "获取验证码",
      iphonen: null,
      num111: 0,
      yzmdl: "账号密码登录"
    };
  },
  methods: {
    inputcc(e) {
      if (e.length >= 8 && this.num111 >= 8) {
        this.flag2 = false;
      } else {
        this.flag2 = true;
      }
    },
    inputcc1(e) {
      this.num111 = e;
    },
    logo1() {
      var b = { iphone: this.zhmmIphone, password: this.zhmmPassword };
      this.$axios.post("/api/zhmmLogin", b).then(data => {
        console.log(data)
        // this.$store.state.userIndexCode = data.data.data;
        Toast.loading({
          message: "验证中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 600
        });
        if (data.data.error_code == 200) {
          setTimeout(() => {
            Toast("请先注册再登录!");
          }, 800);
        } else if (data.data.code == 201) {
          console.log(data.data.data);
          this.$cookies.set("username", "qwe");
          this.$cookies.set("userInfoCode", data.data.data);
          setTimeout(() => {
            Toast.success({ message: "登录成功", duration: 1000 });
            this.$router.push({ name: "userIndex" });
          }, 800);
        } else if (data.data.code == 203) {
          setTimeout(() => {
            Toast("账号或者密码错误");
          }, 800);
        }
      });
    },
    codeS(e) {
      if (e.length > 1) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
    iphoneRegister() {
      this.$router.push({ name: "register" });
    },
    logo() {
      // 登录
      if (this.iphoneCode == "") {
        Toast("验证码不能为空");
        return;
      }
      this.flag = false;
      if (this.iphoneCode == this.iphoneCodes) {
        this.$axios.get("/api/iphones?iphones=" + this.iphone).then(data => {
          if (data.data.error_code == 200) {
            this.$axios
              .get("/api/getUserinFo1?iphone=" + this.iphone)
              .then(data => {
                this.$cookies.set("userInfoCode", data.data.data);
                });
            Toast.loading({
              message: "登陆中...",
              forbidClick: true,
              loadingType: "spinner",
              duration: 600
            });
            setTimeout(() => {
              this.$cookies.set("username", "qwe");
              Toast.success("登录成功");
              this.$router.push({ name: "userIndex" });
            }, 800);
            return;
          }

          // 没注册 先去注册 然后才能登录
          if (data.data.error_code == 201) {
            Toast.loading({
              message: "验证中...",
              forbidClick: true,
              loadingType: "spinner",
              duration: 600
            });
            setTimeout(() => {
              Dialog.confirm({
                title: "是否注册",
                message: "检测到当前手机号未注册是否前往注册?",
                confirmButtonText: "前往",
                cancelButtonText: "不了"
              })
                .then(a => {
                  // on confirm
                  this.$router.push({ name: "register" });
                })
                .catch(b => {
                  // on cancel
                });
            }, 800);
          }
        });
        return;
      } else {
        return Toast("请输入正确的验证码!");
      }
    },
    getPhone() {
      // 获取验证码
      if (
        this.iphone == "" ||
        this.iphone.length < 11 ||
        this.iphone.length > 11
      ) {
        Toast("手机号格式错误");
        return;
      }
      this.flag4 = false;
      this.getPPP = 60;
      this.iphonen = setInterval(() => {
        this.getPPP -= 1;
        if (this.getPPP == 0) {
          this.getPPP = "获取验证码";
          clearInterval(this.iphonen);
        }
      }, 1000);

      setTimeout(() => {
        this.iphoneCode = "";
      }, 60000);
      this.$axios.get("/api/iphoneCode?iphone=" + this.iphone).then(data => {
        this.iphoneCodes = data.data.data;
      });
    },
    lo() {
      // 账户切换注册方式
      Toast.loading({
        message: "切换中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 600
      });
      setTimeout(() => {
        this.iphone = "";
        this.iphoneCode = "";
        this.zhmmIphone = "";
        this.zhmmPassword = "";
        this.loginLogo = !this.loginLogo;
        if (this.loginLogo) {
          this.yzmdl = "账号密码登录";
        } else {
          this.yzmdl = "验证码登录";
        }
      }, 800);
    },
    getPhone1() {
      // 用户找回密码
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
};
</script>

<style scoped>
.tabbar5 {
  width: 100%;
  background-color: white;
}
.login {
  width: 100%;
  height: 100%;
  padding-top: 10px;
}
.iphone1 {
  width: 85%;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.iphone1 input {
  width: 100%;
  height: 30px;
  border: 1px solid white;
  border-bottom: 2px solid #f2f2f2;
  font-size: 16px;
  color: black;
}
.iphone1 > p {
  position: absolute;
  left: 2%;
  top: 32%;
  font-size: 16px;
  color: black;
}
.button1 {
  width: 100px;
  text-align: center;
  position: absolute;
  height: 25px;
  border: none;
  right: 0;
  top: 25%;
  border-left: 2px solid #cecece;
  border-radius: 0%;
  font-size: 14px;
  line-height: 10px;
}
.loginButton {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loginButton button {
  width: 100%;
  margin-left: 0;
  border-radius: 30px;
  margin-top: 10px;
}
.loginButton button:last-child {
  background-color: white;
  color: red;
}
.xp {
  width: 90%;
  height: 60px;
  display: flex;
  margin-top: 5px;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
}
.jdms {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  margin-top: 30px;
  color: #e9e9e9;
}
.jdms span {
  font-size: 11px;
}
.jdms span:first-child {
  width: 120px;
  height: 1px;
  display: inline-block;
  background-color: #e9e9e9;
  margin-right: 15px;
  margin-bottom: 2px;
}
.jdms span:last-child {
  width: 120px;
  height: 1px;
  display: inline-block;
  background-color: #e9e9e9;
  margin-left: 15px;
  margin-bottom: 2px;
}
.qt_login {
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.qt_login p {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 35px;
}
.qt_login img {
  width: 40px;
  height: 45px;
}
.zh_p {
  width: 80%;
  text-align: center;
  margin: 0 auto;
  font-size: 13px;
}
.ws {
  height: 100px;
  background-color: white;
}
</style>