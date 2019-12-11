<template>
  <div class="ws">
    <div class="w">
      <h1 class="wsd">交易成功!</h1>
      <p @click="pluses" class="wp">前往查看></p>
      <img class="img" :src="image1" alt />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      image1: require("../assets/user/jduser2.png")
    };
  },
  methods: {
    pluses() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration:800
      });
      setTimeout(() => {
        this.$router.push({ path: "/tabbar5" });
      }, 1000);
    }
  }
};
</script>

<style scoped>
.ws {
  margin-bottom: -50px;
}
.w {
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
}
.img {
  padding-bottom: 330px;
  margin-top: 100px;
}
.wsd {
  color: red;
}
.wp {
  margin-top: 20px;
  color: black;
}
</style>