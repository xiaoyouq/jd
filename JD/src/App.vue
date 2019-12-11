<template>
  <div id="app orderFullScreen">
    <van-popup
      v-model="show"
      round
      position="top"
      :duration="0.3"
      :style="{width:'95%',position:'fixed',overflow: 'hidden',height: '12%',marginLeft:'2.5%',zIndex:999999999999999999 }"
      :overlay="false"
      :lock-scroll="false"
      get-container="#app"
      @click="van1Router"
    >
      <div class="xdp">
        <p>
          <img :src="image2" alt />
          <span>{{listObj.sort}}旗舰官方给你发消息来了</span>
        </p>
        <p>最近</p>
      </div>
      <p class="xp">{{listObj.title2}}</p>
      <p class="hft">回复 TA</p>
    </van-popup>
    <van-popup
      v-model="show1"
      round
      position="top"
      :duration="0.3"
      :style="{width:'95%',position:'fixed',overflow: 'hidden',height: '12%',marginLeft:'2.5%',zIndex:999999999999999999 }"
      :overlay="false"
      :lock-scroll="false"
      get-container="#app"
      @click="vantRouter"
    >
      <div class="xdp">
        <p>
          <img :src="image2" alt />
          <span>有{{dataList.length}}个商家给你发来消息了</span>
        </p>
        <p>现在</p>
      </div>
      <p class="xp">总共发了{{num}}条消息</p>
      <p class="hft">回复 TA</p>
    </van-popup>
    <HeaderInput v-if="flag2"></HeaderInput>
    <router-view class="qwe"></router-view>
    <tabbra v-show="flag1"></tabbra>
    <Back-top :duration="1000" :right="0" :height="100" :bottom="100">
      <div class="top12">
        <img :src="image1" alt />
      </div>
    </Back-top>
  </div>
</template>
<script>
import HeaderInput from "./components/HeaderInput.vue";
import tabbra from "./tabbar/tabbar.vue";
import { Button } from "mint-ui";
import { Popup } from "vant";
export default {
  data() {
    return {
      flag1: true,
      flag2: true,
      image1: require("./assets/iconfont/topp.png"),
      show: false,
      show1: false,
      image2: require("./assets/xiaoxi/sj.jpg"),
      listObj: {},
      dataList: [],
      num: 0,
      flag4: false
    };
  },
  created() {
    if(this.$cookies.get("userInfoCode").iphone) {
      var data = { iphone: this.$cookies.get("userInfoCode").iphone };
      var setint = setInterval(() => {
        this.$axios.post("/api/lxxxts", data).then(data => {
          if (data.data.data.length == 1) {
            var list = data.data.data.sort((a, b) => {
              return b.create_time - a.create_time;
            });
            // this.$store.state.appData = list;
            this.listObj = list[0];
            this.show = true;
            setTimeout(() => {
              this.show = false;
            }, 2500);
            clearInterval(setint);
          } else if (data.data.data.length >= 2) {
            var list = data.data.data.sort((a, b) => {
              return b.create_time - a.create_time;
            });
            // this.$store.state.appData = list;
            this.show = false;
            this.show1 = true;
            this.dataList = data.data.data;
            data.data.data.forEach(element => {
              this.num += element.lt.length;
            });
            setTimeout(() => {
              this.show1 = false;
            }, 2200);
            setTimeout(() => {
              clearInterval(setint);
            }, 50);
          } else {
            this.show = false;
            this.show1 = false;
            clearInterval(setint);
          }
        });
      }, 1000);
      if (this.$cookies.get("userInfoCode").iphone) {
        var setint1 = setInterval(() => {
          if (this.flag4 == false) {
            var setint = setInterval(() => {
              this.$axios.post("/api/lxxxts", data).then(data => {
                if (data.data.data.length == 1) {
                  var list = data.data.data.sort((a, b) => {
                    return b.create_time - a.create_time;
                  });
                  // this.$store.state.appData = list;
                  this.listObj = list[0];
                  this.show = true;
                  setTimeout(() => {
                    this.show = false;
                  }, 2500);
                  clearInterval(setint);
                } else if (data.data.data.length >= 2) {
                  var list = data.data.data.sort((a, b) => {
                    return b.create_time - a.create_time;
                  });
                  // this.$store.state.appData = list;
                  this.show = false;
                  this.show1 = true;
                  this.dataList = data.data.data;
                  data.data.data.forEach(element => {
                    this.num += element.lt.length;
                  });
                  setTimeout(() => {
                    this.show1 = false;
                  }, 2200);
                  setTimeout(() => {
                    clearInterval(setint);
                  }, 50);
                } else {
                  this.show = false;
                  this.show1 = false;
                  clearInterval(setint);
                  clearInterval(setint1);
                }
              });
            }, 1000);
          }
        }, 60000);
      }
    }
    console.log(setint);
  },

  methods: {
    vantRouter() {
      // console.log("ok",1);
      this.$router.push({ path: "/tabbar3" });
      this.show1 = false;
    },
    van1Router() {
      var c = { iphone: this.listObj.iphone, sort: this.listObj.sort };
      this.$axios.post("/api/deleteAs", c).then(data => {
        console.log(data);
      });
      this.$axios.post("/api/deleteAd", c).then(data => {
        console.log(data);
      });
      this.$router.push({
        path: "/lt",
        query: { iphone: this.listObj.iphone, data: this.listObj.data }
      });
      this.show = false;
    }
  },
  components: {
    HeaderInput: HeaderInput,
    tabbra: tabbra
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      if (to.path == "/lt") {
        this.flag4 = true;
      } else {
        this.flag4 = false;
      }
      if (to.path == "/tabbar5") {
        if (this.$cookies.get("username")) {
          this.$router.push({ path: "/userIndex" });
        } else {
          this.$router.push({ path: "/tabbar5" });
        }
      }
      this.$store.state.routers = to.path;
      if (to.path == "/tabbar4") {
        this.flag1 = false;
      } else if (to.path == "/tabbar5") {
        this.flag1 = false;
      } else if (to.path == "/register") {
        this.flag1 = false;
      } else if (to.path == "/rep") {
        this.flag1 = false;
      } else if (to.path == "/re") {
        this.flag1 = false;
      } else if (
        to.path == "/management" ||
        to.path == "/lt" ||
        to.path == "/inputSqs" ||
        to.path == "/dphover" ||
        to.path == "/sppl" ||
        to.path == "/pinglun" ||
        to.path == "/userListS" ||
        to.path == "/dfk" ||
        to.path == "/jycg" ||
        to.path == "/accounts" ||
        to.path == "/cars" ||
        to.path == "/jdQuan" ||
        to.path == "/goShipping" ||
        to.path == "/goShippingPut" ||
        to.path == "/redRacket" ||
        to.path == "/wdzj"
      ) {
        this.flag1 = false;
      } else {
        this.flag1 = true;
        this.flag2 = true;
      }
    }
  }
};
</script>
<style lang="less">
.xdp {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px;
  color: #6a6a6a;
}
.xp {
  width: 87%;
  padding: 0;
  display: flex;
  margin: 0;
  margin-left: 14px;
  color: #686868;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.xdp p {
  display: flex;
  align-items: center;
  margin: 0;
  color: #707070;
}
.hft {
  margin-left: 16px;
  margin-top: 4px;
  color: #727272;
}
.xdp img {
  width: 25px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid #c5bbbb;
  margin-right: 5px;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  position: absolute;
}
.qwe {
  margin-bottom: 50px;
  margin-top: 44px;
}
.top12 {
  width: 40px;
  height: 40px;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
}
.top12 img {
  width: 100%;
  height: 100%;
}
</style>
