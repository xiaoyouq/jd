<template>
  <div>
    <!-- 首页 -->
    <div v-if="flag1" class="HeaderInput" :class="[this.num>30 ?'red' :'']">
      <img @click="goRouter" :src="image3" alt />
      <div class="input">
        <img :src="image1" alt />
        <input @click="RouterInput" class="inpput" type="text" placeholder="aoc显示器" />
        <img :src="image2" alt />
      </div>
      <div v-if="flag4">
        <span @click="goUserIndex1" class="dl">登录</span>
      </div>
      <div v-else>
        <img @click="goUserIndex" style="width:25px;height:23px" :src="image4" alt />
      </div>
    </div>
    <!-- 首页 -->

    <!-- 搜索 -->

    <!-- 首页 -->
    <div v-if="flag2" class="HeaderInput writers">
      <img @click="goRouter" :src="image5" alt />
      <div class="input">
        <input @click="RouterInput" type="text" class="grey" placeholder="aoc显示器" />
        <img class="imsg" :src="image2" alt />
      </div>
      <img :src="image6" alt />
      <span class="dl">登录</span>
    </div>
    <!-- 首页 -->

    <!-- end -->

    <!-- 惊喜 -->
    <div v-if="flag3" class="HeaderInput1 cs">
      <img @click="goRouter" class="headerImage" :src="image5" alt />
      <div class="input">
        <!-- <input type="text" class="grey" placeholder="aoc显示器" /> -->
        <!-- <img class="imsg" :src="image2" alt /> -->
        <p class="tex">{{message}}</p>
      </div>
      <img class="headerImage" :src="image6" alt />
    </div>
    <!-- 惊喜 -->

    <!-- 商品详情 -->
    <div v-if="flag5" class="HeaderInput1" :class="[num>30?'backnone':'']">
      <img
        v-if="num<30"
        :class="[num<30?'yqColor':'headerImage']"
        @click="goRouter"
        :src="image7"
        alt
      />
      <img v-else :class="[num<30?'yqColor':'headerImage']" @click="goRouter" :src="image5" alt />
      <div class="input">
        <!-- <input type="text" class="grey" placeholder="aoc显示器" /> -->
        <!-- <img class="imsg" :src="image2" alt /> -->
        <div v-if="num>30" class="inputps">
          <p>
            <img v-if="listCar1" style="margin-right:3px;margin-left:0px;" :src="image9" alt />
            商品
          </p>
          <p>
            <img v-if="listCar2" style="margin-right:3px;margin-left:0px;" :src="image9" alt />
            评价
          </p>
          <p>
            <img v-if="listCar4" style="margin-right:3px;margin-left:0px;" :src="image9" alt />
            推荐
          </p>
          <p>
            <img v-if="listCar3" style="margin-right:3px;margin-left:0px;" :src="image9" alt />
            详情
          </p>
        </div>
      </div>
      <img
        v-if="num<30"
        :class="[num<30?'yqColor':'headerImage']"
        @click="goRouter"
        :src="image8"
        alt
      />
      <img v-else :class="[num<30?'yqColor':'headerImage']" :src="image6" alt />
    </div>
    <!-- 商品详情 -->
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { Dialog } from "vant";
export default {
  data() {
    return {
      image1: require("../assets/iconfont/jd.png"),
      image2: require("../assets/iconfont/search.png"),
      image3: require("../assets/iconfont/more.png"),
      image4: require("../assets/iconfont/user.png"),
      image5: require("../assets/iconfont/left1.png"),
      image6: require("../assets/iconfont/right1.png"),
      image7: require("../assets/iconfont/left4.png"),
      image8: require("../assets/iconfont/left5.png"),
      image9: require("../assets/iconfont/wz.png"),
      num: 0,
      flag1: true,
      flag2: false,
      flag3: false,
      flag4: true,
      flag5: false,
      message: "",
      message1: "index1",
      message2: "",
      message3: true,
      listCar1: true,
      listCar2: false,
      listCar3: false,
      listCar4: false,
      listCar5: true,
      listCar6: true,
      dobject: {},
      lt1234: {}
    };
  },
  mounted() {
    window.addEventListener("scroll", this.windowScroll);
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  created() {
    if (this.$cookies.get("username")) {
      this.flag4 = false;
    } else {
      this.flag4 = true;
    }
  },
  methods: {
    goUserIndex() {
      this.$router.push({ name: "userIndex" });
    },
    goUserIndex1() {
      this.$router.push({ name: "tabbar5" });
    },
    // 搜索页面跳转
    RouterInput() {
      this.$router.push({ name: "input" });
    },
    goRouter() {
      console.log(this.message1,this.message2)
      if(this.message1 =='cars'&& this.message2=='tabbar4'){
        this.$router.replace({ path: "/index1" });
        return
      }
      if(this.message1 =='index1'&& this.message2=='tabbar4'){
        this.$router.replace({ path: "/index1" });
        return
      }
      if (this.message1 == "index1" && this.message2 == "lt") {
        this.$router.replace({ path: "/index1" });
      }
      if (this.message1 == "tabbar2Right") {
        this.$router.go(-1);
      }
      if (this.message == "评价晒单") {
        if (this.message1 == "dfk") {
          return this.$router.go(-1);
        } else if (this.message1 == "userListS") {
          return this.$router.go(-2);
        }
      }

      if (this.listCar5 == false || this.listCar6 == false) {
        return this.$router.replace({ name: "index1" });
      }

      if (this.message == "交易成功") {
        return this.$router.replace({ name: "index1" });
      }
      if (this.message == "联系客服" && this.message1 == "cars") {
          var c= {iphone:this.$cookies.get('userInfoCode').iphone,sort:this.dobject.sort} 
        this.$axios.post("/api/deleteAs", c).then(data => {
        });
        this.$axios.post("/api/deleteAd", c).then(data => {
        });
        setTimeout(() => {
          this.$router.replace({
            path: "/cars",
            query: { data: this.dobject, ins: true }
          });
        }, 100);
        return;
      } else if (this.message1 == "tabbar3" && this.message2 == "lt") {
        var c= this.$store.state.smdx 
        this.$axios.post("/api/deleteAs", c).then(data => {
        });
        this.$axios.post("/api/deleteAd", c).then(data => {
        });
        setTimeout(() => {
          this.$router.replace({
            path: "/tabbar3",
            query: { data: this.dobject, ins: true }
          });
        }, 100);
        return;
      }

      if (this.message == "确认订单") {
        //  this.$router.push({ path: "/cars", query: { data: item ,ins:this.scFlag} });
        var c = Date.now();
        var data1 = {
          iphone: this.$cookies.get("userInfoCode").iphone,
          data: this.dobject,
          time: c
        };
        if (this.message1 == "tabbar4") {
          this.$router.replace({
            path: "/tabbar4",
            query: { data: this.dobject, ins: true }
          });
          return;
        }
        Dialog.confirm({
          message: "便宜不等人,请三思而行",
          confirmButtonText: "去意已决",
          cancelButtonText: "我再想想",
          confirmButtonColor: "red"
        })
          .then(() => {
            this.$axios.post("/api/jdnbDfk", data1).then(data => {
              // console.log(data)
            });
            Toast.loading({
              message: "加载中...",
              forbidClick: true,
              loadingType: "spinner",
              duration: 1000
            });
            setTimeout(() => {
              this.$router.replace({
                path: "/cars",
                query: { data: this.dobject, ins: true }
              });
            }, 1100);
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
        return;
        // 问题所在
      }
      if (this.message == "inputSqs") {
        return this.$router.replace({ path: "/input" });
      }
      if (this.message == "我的关注") {
        return this.$router.replace({ path: "/userIndex" });
      }
      if (this.message1 == "sppl") {
        return this.$router.push({ name: "index1" });
      }
      if (this.message == "商品评论") {
        this.$router.replace({
          path: "/cars",
          query: { data: this.dobject, ins: true }
        });
        return;
      }
      if (this.message == "我的订单") {
        return this.$router.push({ name: "userIndex" });
      }
      if (this.message == "详情页面") {
        if (this.message1 == "lt" && this.message1 != "tabbar3") {
          // 此处111111
          return this.$router.push({ name: "index1" });
        } else if (this.message1 == "tabbar3") {
          return this.$router.push({ name: "tabbar3" });
        } else {
          this.$router.replace({ path: "/" + this.message1 });
          return;
        }
      }
      if (this.message == "收货地址") {
        return this.$router.push({ name: "management" });
      }
      if (this.message == "账号管理") {
        return this.$router.push({ name: "userIndex" });
      }
      if (this.message == "我的京东") {
        return this.$router.push({ name: "index1" });
      }

      if (this.message == "京东登录注册") {
        return this.$router.push({ name: "index1" });
      }

      if (this.message == "京东注册") {
        Dialog.confirm({
          title: "提示",
          message: "点击'返回'将中断注册,确定返回？",
          showCancelButton: true
        })
          .then(() => {
            // on confirm
            return this.$router.push({ path: "/tabbar5" });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$router.go(-1);
      }
    },
    windowScroll() {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      this.num =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(this.num);
      if (this.num > 0 && this.num < 799) {
        this.listCar1 = true;
        this.listCar2 = false;
        this.listCar3 = false;
        this.listCar4 = false;
      } else if (this.num > 790 && this.num < 1235) {
        this.listCar1 = false;
        this.listCar2 = true;
        this.listCar3 = false;
        this.listCar4 = false;
      } else if (this.num > 1539 && this.num < 1999) {
        this.listCar1 = false;
        this.listCar2 = false;
        this.listCar3 = false;
        this.listCar4 = true;
      } else if (this.num > 2000) {
        this.listCar1 = false;
        this.listCar2 = false;
        this.listCar3 = true;
        this.listCar4 = false;
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/lt" && from.path == "/index1") {
        this.flag1 = false;
        this.flag3 = true;
        this.flag2 = false;
        this.flag5 = false;
        this.message = "联系客服";
        return;
      }
      if(to.path == "/lt" && from.path == "/tabbar3"){
         this.flag1 = false;
        this.flag3 = true;
        this.flag2 = false;
        this.flag5 = false;
        this.message = "联系客服";
        return;
      }
      this.message1 = from.name;
      this.message2 = to.name;
      // console.log(to,'当前页面'+this.message2,from,'上一个页面'+this.message1)
      if (to.name == "cars" && from.name == "accounts") {
        this.listCar6 = false;
      } else {
        this.listCar6 = true;
      }

      if (this.message1 == "cars" && this.message2 == "cars") {
        this.listCar5 = false;
      } else {
        this.listCar5 = true;
      }
      if (to.path == "/cars") {
        this.flag1 = false;
        this.flag3 = false;
        this.flag2 = false;
        this.flag5 = true;
      }
      if (to.path == "/input") {
        this.flag1 = false;
        this.flag3 = false;
        this.flag2 = false;
        this.flag5 = false;
      }
      if (to.path == "/tabbar2" || to.path == "/tabbar2Right") {
        this.message = "tabbar2Right";
        this.flag5 = false;
        this.flag1 = false;
        this.flag3 = false;
        this.flag2 = true;
      } else if (to.path == "/index1") {
        this.flag5 = false;

        this.$cookies.get("username")
          ? (this.flag4 = false)
          : (this.flag4 = true);
        (this.flag1 = true), (this.flag2 = false);
        this.flag3 = false;
      } else if (to.path == "/tabbar3") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "消息";
      } else if (to.path == "/tabbar4") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "购物车";
      } else if (to.path == "/tabbar5") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "京东登录注册";
      } else if (to.path == "/register") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "京东注册";
      } else if (to.path == "/userIndex") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "我的京东";
      } else if (to.path == "/lt") {
        (this.flag1 = false), (this.flag2 = false);
        this.lt1234 = to.query;
        // console.log('ok')
        if (from.query.data.utitle) {
          this.dobject = from.query.data;
        } else {
          this.dobject = this.$store.state.routerObject.data;
        }
        this.flag5 = false;
        this.flag3 = true;
        this.message = "联系客服";
      } else if (to.path == "/management") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "账号管理";
      } else if (to.path == "/goShipping") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "收货地址";
      } else if (to.path == "/goShippingPut") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "设置收货地址";
      } else if (to.path == "/redRacket") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "红包专区";
      } else if (to.path == "/jycg") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "交易成功";
      } else if (from.path == "/tabbar4") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "确认订单";
      } else if (to.path == "/wdzj") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "我的足迹";
      }  else if (to.path == "/dphover") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "我的关注";
      } else if (to.path == "/inputSqs") {
        // 此处
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = false;
        this.message = "inputSqs";
      } else if (to.path == "/jdQuan") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "京东券";
      } else if (to.path == "/dfk") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "我的订单";
      } else if (to.path == "/sppl") {
        (this.flag1 = false), (this.flag2 = false);
        if (from.query.data.utitle) {
          this.dobject = from.query.data;
        } else {
          this.dobject = this.$store.state.routerObject.data;
        }
        this.flag5 = false;
        this.flag3 = true;
        this.message = "商品评论";
      } else if (to.path == "/userListS") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "订单详情";
      } else if (to.path == "/pinglun") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = false;
        this.flag3 = true;
        this.message = "评价晒单";
      } else if (to.path == "/cars") {
        (this.flag1 = false), (this.flag2 = false);
        this.flag5 = true;
        this.flag3 = false;
        this.message = "详情页面";
      } else if (to.path == "/accounts") {
        (this.flag1 = false), (this.flag2 = false);
        if (from.query.data.utitle) {
          this.dobject = from.query.data;
        } else {
          this.dobject = this.$store.state.routerObject.data;
        }
        this.flag5 = false;
        this.flag3 = true;
        this.message = "确认订单";
      }
    }
  }
};
</script>

<style scoped>
.inputps {
  width: 220px;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  align-items: center;
}
.inputps img {
  width: 15px;
  height: 15px;
}
.inputps > p {
  color: black;
  display: flex;
  align-items: center;
}
.backnone {
  background: rgb(255, 255, 255);
  transition: all 0.6s ease;
}
.yqColor {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #666666;
  padding: 2px;
}
.tex {
  font-size: 18px;
  color: black;
  margin-top: 13px;
  z-index: 99;
  justify-content: center;
  margin: 0 auto;
}
.cs {
  background-color: white;
}
.HeaderInput1 {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0%;
  z-index: 19;
}
.red {
  background-color: red;
}
.HeaderInput1 img {
  margin-left: 10px;
}
.headerImage {
  width: 20px;
  height: 20px;
}
.HeaderInput1 img:nth-child(1) {
  margin-left: 14px;
  margin-right: 10px;
}
.HeaderInput1 img:last-child {
  margin-right: 20px;
}
.writers {
  background-color: white;
  border-bottom: 2px solid #eeeeee;
  height: 26px;
}
.grey {
  background-color: #f7f7f7;
  font-size: 13px;
  text-align: none;
  padding-left: -30px;
  width: 273px;
  height: 30px;
  border-radius: 30px;
  border: none;
  margin-top: 15px;
  margin-right: 5px;
  font-size: 13px;
  padding-left: 40px;
}
.imsg {
  left: -13%;
}
.HeaderInput {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0%;
  z-index: 999;
}
.red {
  background-color: red;
}
.HeaderInput img {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.HeaderInput img:nth-child(1) {
  margin-left: 14px;
  margin-right: 10px;
}
.HeaderInput img:last-child {
  margin-right: 10px;
}
.input {
  width: 70%;
  display: flex;
  position: relative;
  align-items: center;
}
.input .inpput {
  width: 100%;
  height: 30px;
  border-radius: 30px;
  border: none;
  margin-top: 15px;
  font-size: 13px;
  padding-left: 80px;
}
.input > img {
  width: 30px;
  position: absolute;
  margin-left: 55px;
}
.input > img:nth-child(1) {
  margin-left: 15px;
  padding-right: 8px;
  border-right: 1px solid #e9e9e9;
}
.input > img:last-child {
  width: 23px;
  height: 16px;
  padding-right: 8px;
}
.dl {
  color: white;
  margin-right: 10px;
  font-size: 14.5px;
}
</style>