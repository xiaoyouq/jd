<template>
  <div class="login bodyurl" :style="logoin">
    <!-- 登陆 -->
    <div class="box">
      <h3 class="boxH3" v-if="flag">{{ toph3 }}</h3>
      <h3 class="boxH3" v-else>后台注册</h3>
      <div v-if="flag">
        <form action="/register" method="POST">
          <div class="form-group">
            <label class="fontsmall" for="account">{{ zh }}:&nbsp;</label>
            <input
              type="input"
              ref="qw1"
              :value="account"
              class="form-control"
              placeholder="请输入账号"
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group fromtop">
            <label class="fontsmall" for="password">{{ mm }}:&nbsp;</label>
            <input
              type="password"
              ref="qw2"
              :value="password"
              class="form-control"
              placeholder="请输入密码"
              aria-describedby="helpId"
            />
          </div>
          <button type="submit" @click.prevent="dl1" class="btn btn-primary">{{ dl }}</button>
        </form>
        <a class="qh" @click.prevent="login" href>{{ as }}</a>
      </div>

      <!-- 注册 -->
      <div v-else>
        <form action="/login" method="GET">
          <div class="form-group">
            <label class="fontsmall" for="account">{{ zh }}:&nbsp;</label>
            <input type="text" ref="qw3" maxlength="12" minlength="4" :value="account1" class="form-control" placeholder="请输入账号" />
          </div>
          <div class="form-group fromtop">
            <label class="fontsmall" for="password">{{ mm }}:&nbsp;</label>
            <input
              type="password"
              ref="qw4"
              :value="password1"
              class="form-control"
              placeholder="请输入密码"
             maxlength="12"
            />
          </div>
          <div class="form-group">
            <label class="fontsmall" for="name">{{ zh1 }}:&nbsp;</label>
            <input type="text" ref="qw5" :value="name1" class="form-control" placeholder="请输入账号" />
          </div>
          <div class="form-group">
            <label class="fontsmall" for="name">Scode:&nbsp;</label>
            <input type="password" ref="qw6" value class="form-control" placeholder="请输入Code" />
          </div>
          <button type="submit" @click.prevent="zc" class="btn btn-primary">{{ dl }}</button>
        </form>
        <a class="qh" @click.prevent="register" href>{{ as }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      logoin: {
        background: "url(" + require("../assets/image/back.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        marginTop: "5px"
      },
      account: "",
      password: "",
      account1: "",
      password1: "",
      zh: "账号",
      zh1: "昵称",
      mm: "密码",
      dl: "登录",
      as: "没有账号?立马注册",
      flag: true,
      toph3: "后台登录",
      name: "",
      name1: ""
    };
  },
  methods: {
    dl1() {
      if (this.$refs.qw1.value == "" || this.$refs.qw2.value == "") {
        Toast("账号或者密码不能为空!");
        return;
      }
      // 登录 login
      this.axios
        .get(
          "api/login?account=" +
            this.$refs.qw1.value +
            "&password=" +
            this.$refs.qw2.value
        )
        .then((data, error) => {
          var errorCode = data.data.error_code;
          if (errorCode == 500) {
            return Toast("服务器访问错误Error");
          } else if (errorCode == 201) {
            return Toast("账号或者密码错误!");
          } else if (errorCode == 200) {
            setTimeout(() => {
              this.$router.push({ path: "/home" });
            }, 1000);
            return Toast("登录成功");
          } else {
            return Toast("请重启..");
          }
        });
    },
    // 注册
    zc() {
      var scode = this.$refs.qw6.value;
      if (
        this.$refs.qw6.value == "" ||
        this.$refs.qw5.value == "" ||
        this.$refs.qw4.value == "" ||
        this.$refs.qw3.value == ""
      ) {
        Toast("不能有一项为空");
        return;
      }

      if (scode == "123") {
        this.axios
          .post("api/register", {
            account: this.$refs.qw3.value,
            password: this.$refs.qw4.value,
            name: this.$refs.qw5.value
          })
          .then((data, error) => {
            var dataCode = data.data.error_code;
            if (dataCode == 500) {
              return Toast("服务器访问错误Error");
            } else if (dataCode == 201) {
              return Toast("用户名或者昵称重复");
            } else {
              dataCode == 200;
               setTimeout(() => {
              this.$router.push({ path: "/home" });
            }, 1000);
            }
            {
              return Toast("注册成功");
            }
          });
      } else {
        Toast("命令输入错误");
      }
    },
    register() {
      this.flag = !this.flag;
      (this.zh = "账号"),
        (this.as = "已有账号？立马登录"),
        (this.dl = "登录"),
        (this.toph3 = "后台登录");
    },
    login() {
      this.flag = !this.flag;
      (this.toph3 = "后台注册"),
        (this.zh = "注册账号"),
        (this.as = "没有账号？立马注册"),
        (this.dl = "注册");
    }
  }
};
</script>
<style scoped>
.bodyurl {
  width: 100%;
  height: 100%;
  position: fixed;
}
.fontsmall {
  font-size: 12px;
}
.qh {
  font-size: 12px;
  margin-left: 30%;
}
.btn-primary {
  margin-left: 38%;
  height: 30px;
  line-height: 10px;
  margin-top: 10px;
}
.form-group {
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 0;
  text-align: center;
  line-height: 30px;
  margin-left: 20px;
}
.form-control {
  width: 70%;
  height: 30px;
}
.box {
  background-color: white;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  margin-top: 200px;
}
.boxH3 {
  margin-left: 35%;
  font-weight: 350;
  font-size: 15px;
  padding-top: 10px;
}
</style>
