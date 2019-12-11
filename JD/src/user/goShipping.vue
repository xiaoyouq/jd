<template>
  <div class="goShipping">
    <p v-if="flages" class="shdzd">
      <img :src="image1" alt />
      <span>该账号还没有收货地址</span>
    </p>
    <div class="hidden" v-else>
      <div class="goDivS" v-for="(item,index) in list.shouhuodizhi" :key="index">
        <div class="smal">
          <p>{{item.person}}&nbsp;{{item.iphone}}</p>
          <p class="degp">
            <span class="jtdz">{{item.tags}}</span>
            <span>{{item.getSering.province}}{{item.getSering.city}}{{item.getSering.area}}</span>
          </p>
        </div>
        <p class="bj">
          <span @click="delet(index,item.iphones)">删除</span> &nbsp;&nbsp;
          <span class="nbsp" v-if="item.checked">默认</span>
        </p>
      </div>
    </div>
    <button class="npButton" @click="buttonS">新增收货地址</button>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      image1: require("../assets/user/shdzd.png"),
      list: [],
      flages: true
    };
  },
  methods: {
    buttonS() {
      this.$router.push({ path: "/goShippingPut" });
    },
    delet(a, b) {
      console.log(a, b);
      this.$axios.get("/api/deletepp?e=" + a + "&iphone=" + b).then(data => {
        // this.$cookies.remove('userInfoCode')
        this.$cookies.set("userInfoCode", data.data.data);
        Toast.loading({
          message: "删除中中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 600
        });
        setTimeout(ele => {
          this.list.shouhuodizhi.splice(a, 1);
          if (this.list.shouhuodizhi.length == 0) {
            this.flages = true;
          }
          console.log(data);
        }, 800);
      });
    }
  },
  created() {
    this.list = this.$cookies.get("userInfoCode");
    if (this.list.shouhuodizhi.length == 0) {
      this.flages = true;
    } else {
      this.flages = false;
    }
  }
};
</script>

<style scoped>
.goShipping {
  width: 100%;
  background-color: #f7f7f7;
}
.shdzd {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  font-size: 16px;
  margin: 0 auto;
  align-items: center;
  padding-top: 240px;
  padding-bottom: 250px;
}
.shdzd img {
  width: 90px;
  height: 90px;
  margin-bottom: 20px;
}
.npButton {
  width: 100%;
  position: fixed;
  bottom: 0%;
  background-color: #e4393c;
  height: 46px;
  color: white;
  font-size: 15px;
}
.hidden {
  background-color: white;
  width: 100%;
  border-top: 1px solid gray;
}
.goDivS {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.smal p {
  color: black;
}
.smal > p:nth-child(1) {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}
.jtdz {
  height: 20px;
  width: auto;
  border: 1px solid #4b9bfb;
  font-size: 10px;
  padding: 0 3px;
  color: #4b9bfb;
  margin-right: 10px;
}
.degp {
  display: flex;
  align-items: center;
}
.bj {
  color: red;
}
.nbsp {
  color: green;
}
</style>