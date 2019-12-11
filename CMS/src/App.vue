<template>
  <div id="app" class="apps">
    <router-view></router-view>
  </div>
</template>
<script>
import login from "./views/login.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      user1flag: true,
      user4flag: true,
    };
  },
  created() {
    this.axios.get("/api/user").then(data => {
      if (data.data.session == undefined) {
        this.$router.push({ name: "login" });
      } else {
        this.logoin = null;
        this.$router.push({ name: "home" });
      }
    });
  },
  components: {
    login: login
  },
  watch: {
    $route: function(to, path) {
      if (to.path == "/home/") {
        this.$router.push({ name: "user1" });
      }

      if (to.path == "/home") {
        // 请求名字
        if (this.user1flag == true) {
          this.axios.get("/api/userinfo").then(data => {
            if (data.data.error == 200) {
              this.user1flag = false;
              setTimeout(() => {
                this.$message({
                  message: "欢迎回来,尊敬的 " + data.data.session.username,
                  type: "success"
                });
              }, 500);
            }
            // 请求服务端用户
          });
        }
      } else if (to.path == "/user4") {
        if (this.user4flag == true) {
          this.user4flag = false;
          setTimeout(() => {
            this.$message({
              message: "欢迎来到个人中心 ",
              type: "success"
            });
          }, 500);
          // 请求服务端用户
        }
      }
    }
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.el-upload-list {
  display: flex;
}
</style>
