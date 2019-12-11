<template>
  <div class="xgmmm">
    <h2 class="xgmmh2">修改密码</h2>
    <div class="xgmminput">
      <p>
        <label for>旧密码</label>
        <el-input v-model="input1" type="password" placeholder="请输入原密码" show-password></el-input>
        <span class="xgmmspan1" v-if="flag1">*{{plinput1}}</span>
      </p>
      <p>
        <label for>新密码</label>
        <el-input v-model="input2" type="password" placeholder="请输入新密码" show-password></el-input>
      </p>
      <p>
        <label for>在输入一次</label>
        <el-input v-model="input3" type="password" placeholder="请再次输入新密码" show-password></el-input>
        <span class="xgmmspan1" v-if="flag2">*{{ plinput2}}</span>
      </p>
      <el-button class="elbuttons" @click="qrsg" type="danger">确认修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      plinput1: "旧密码输入错误",
      plinput2: "两次密码不一样",
      flag1: false,
      flag2: false,
      account: "",
      note1: {
        backgroundImage:
          "url(" + require("../../../assets/image/user24image4.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "77.27% 83%",
        height: "100%",
        position: "fixed",
        width: "100%",
      }
    };
  },
  methods: {
    qrsg() {
      if (this.input2 != this.input3) {
        this.flag2 = true;
      }
      if (this.input2 == this.input3) {
        this.flag2 = false;
      }
      this.axios
        .get(
          "/api/xgmmuser?jmm=" +
            this.input1 +
            "&xmm=" +
            this.input2 +
            "&account=" +
            this.$store.state.datass.account
        )
        .then(data => {
          if (data.data.error_code == 200) {
            this.flag1 = true;
          }
          if (data.data.error_code == 201 && this.flag2 == false) {
            this.axios
              .get(
                "/api/xgmmusers?account=" +
                  this.$store.state.datass.account +
                  "&newpassword=" +
                  this.input2
              )
              .then(data => {
                var time = Date.now();
                this.axios(
                  "/api/logout?account=" + this.account + "&time=" + time
                ).then(data => {
                  console.log(data);
                });
                console.log(data);
                if (data.data.error_code == 200) {
                  this.$message({
                    message: "修改成功!即将重新登录...",
                    type: "success"
                  });
                  var that = this;
                  setTimeout(function() {
                    that.$router.push({ path: "/login" });
                  }, 1500);
                }
              });
          }
        });
    }
  },
  created() {
    this.axios.get("/api/userinfo").then(data => {
      this.account = data.data.session.account;
    });
  }
};
</script>

<style>
.xgmmm{
  padding-right:320px;
}
.elbuttons {
  margin-left: 190px;
  margin-top: 30px;
}
.xgmminput {
  width: 40%;
  margin: 0 auto;
  margin-top: 30px;
}
.xgmmh2 {
  margin-left: 530px;
  margin-top: 50px;
}
.xgmmspan1 {
  color: red;
  font-size: 12px;
}
</style>