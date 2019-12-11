<template>
  <div class="tabbar4">
    <div v-if="flag2" class="tabbar4top">
      <p class="np">
        <span>登录后可同步账户购物车中的商品</span>
        <button @click="logo">登录</button>
      </p>
    </div>
    <div class="npp" v-if="flag5">
      <img :src="image1" alt />
      <p>{{message}}</p>
    </div>
    <div v-if="flag5" class="jdms">
      <p>
        <span></span>
        <span>京东秒杀</span>
        <span></span>
      </p>
    </div>
    <seckill v-if="flag5" tabbar5="tabbar5"></seckill>
    <div v-if="flag4" class="xyh">
      <p class="smp">
        <span>新用户福·利专属优惠礼包</span>
        <button>一键领取</button>
      </p>
      <img class="yhq" :src="image2" alt />
    </div>

    <p class="bjsp">
      <img class="dz3" :src="image3" alt />
      <span
        v-if="flag8"
      >{{list2.getSering.province}}{{list2.getSering.city}}{{list2.getSering.area}}</span>
      <span @click="bjpsp">{{message1}}</span>
    </p>

    <!-- 商品 -->
    <div class="cars">
      <div class="vantQuanx1">
        <div class="ymyfVantQuan1">
          <van-icon size="20px" @click="qx(1)" v-if="flag3" color="#949499" name="circle" />
          <van-icon size="20px" @click="qx(2)" v-else color="red" name="checked" />
          <img :src="image4" alt />
          <span class="h1Ym">京东自营</span>
        </div>
        <div class="ymyfVantQuan1">
          <van-icon size="14px" name="info-o" />
          <span class="h2ym">已免运费</span>
        </div>
      </div>
      <!-- 此处便是需要循环的地方 -->
      <div class="flXym" v-for="(item,index) in list" :key="index">
        <p class="top30">
          <van-icon
            size="20px"
            @click="qxx(item,1,index)"
            v-if="item.xz"
            color="red"
            name="checked"
          />
          <van-icon size="20px" @click="qxx(item,2,index)" v-else name="circle" />
        </p>
        <div>
          <img class="imags" :src="item.picture[0].picture" alt />
        </div>
        <div class="zxImp">
          <p class="zxmins">{{item.content}}</p>
          <p class="zxpspan">
            <span>{{item.utitle}}</span>
            <span>选服务></span>
          </p>
          <span class="shangozhong">闪购中，12月31日结束</span>
          <div class="displflex">
            <p class="disSPan">
              <span>¥</span>
              <span>{{item.ratepreice}}</span>
            </p>
            <div class="displ">
              <button @click="jg(1,item)" v-if="item.jg>=2">-</button>
              <span v-else></span>
              <input type="number" value="value" v-model="item.jg" />
              <button @click="jg(2,item)">+</button>
            </div>
          </div>
          <p class="flexEnd">
            <span>移入关注</span>
            <span @click="deleteFlex(index)">删除</span>
          </p>
        </div>
      </div>
    </div>

    <!-- 你可能还想要 -->
    <div v-show="flag9" class="jdms">
      <p>
        <span></span>
        <span>你可能还想要</span>
        <span></span>
      </p>
    </div>
    <carList v-show="flag9" :ta="'gwc'"></carList>
    <!-- tabbar区域 -->
    <van-submit-bar v-if="flag6" :price="fullNumber" button-text="去结算" @submit="onSubmit">
      <p class="vantQuanx">
        <van-icon @click="qx(1)" v-if="flag3" size="20px" name="circle" />
        <van-icon @click="qx(2)" v-else size="20px" color="red" name="checked" />
        <span>全选</span>
      </p>
    </van-submit-bar>
    <!-- 修改此处 -->
    <div  :class="[this.flag11 == true?'velse' :'opc1']" v-else>
      <p class="vantQuanx23">
        <van-icon @click="qx(1)" v-if="flag3" size="20px" name="circle" />
        <van-icon @click="qx(2)" v-else size="20px" color="red" name="checked" />
        <span>全选</span>
      </p>
      <div class="yzscj">
        <button @click="yzscj">移至收藏</button>
        <button @click="bzxDeile" class="yzscjdelete">删除</button>
      </div>
    </div>
    <!-- tabbar区域 -->
  </div>
</template>

<script>
import Vue from "vue";
import { Stepper } from "vant";
Vue.use(Stepper);
import { Icon } from "vant";
Vue.use(Icon);
import { SubmitBar } from "vant";
Vue.use(SubmitBar);
import { Toast } from "vant";
import seckill from "../components/seckill.vue";
import carList from "../components/carlist.vue";
export default {
  data() {
    return {
      image1: require("../assets/jdBackground/ljx.png"),
      image2: require("../assets/iconfont/youhuiquan.png"),
      image3: require("../assets/iconfont/dizhi.png"),
      image4: require("../assets/iconfont/jdjdjd.png"),
      message: "登录后可同步购物车商品",
      flag2: true,
      checked: true,
      flag3: true,
      flag4: true,
      flag5: true,
      flag6: false,
      flag7: true,
      flag8: false,
      flag9: true,
      value: 1,
      list: this.$store.state.gwcList,
      sum: 0,
      list2: {},
      message1: "编辑商品",
      nus: 99999,
      ls: [],
      flag10: false,
      flag11: false
    };
  },
  methods: {
    // 转移到收藏
    yzscj() {
      if (this.nus != 99999) {
        var c = this.ls[this.nus];
        // console.log(c)
        this.$axios
          .post("/api/goodsCollections", {
            useri: this.$cookies.get("userInfoCode").iphone,
            data: c
          })
          .then(data => {
            if (data.data.error_code == 200) {
              Toast("收藏成功");
              this.ysc = "已收藏";
              this.ls = 99999;
            } else {
              Toast("收藏失败");
            }
          });
      }
    },
    // 第二种删除
    bzxDeile() {
      if (this.nus == 99999) {
        Toast("抱歉!一次只能删除一个");
      } else {
        this.$axios
          .get(
            "/api/deletejdnb?iphone=" +
              this.$cookies.get("userInfoCode").iphone +
              "&ins=" +
              this.nus
          )
          .then(data => {
            console.log(data);
          });
        Toast.loading({
          message: "删除中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 400
        });
        setTimeout(el => {
          this.list.splice(this.nus, 1);
        }, 300);
      }
    },
    // 编辑商品
    bjpsp() {
      console.log("ok");
      if (this.message1 == "编辑商品") {
        this.message1 = "完成";
        this.flag9 = false;
        this.flag6 = false;
      } else if (this.message1 == "完成") {
        this.message1 = "编辑商品";
        this.flag9 = true;
        this.flag6 = true;
      }
    },
    // 删除对应的数据
    deleteFlex(e) {
      this.$axios
        .get(
          "/api/deletejdnb?iphone=" +
            this.$cookies.get("userInfoCode").iphone +
            "&ins=" +
            e
        )
        .then(data => {
          console.log(data);
        });
      Toast.loading({
        message: "删除中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 400
      });
      setTimeout(el => {
        this.list.splice(e, 1);
      }, 300);
    },
    // 判断价格
    jg(a, b) {
      if (a == 1) {
        b.jg--;
      } else if (a == 2) {
        b.jg++;
      }
    },
    qxx(a, b, c) {
      console.log(c);
      this.nus = c;
      if (b == 2) {
        a.xz = true;
      } else if (b == 1) {
        a.xz = false;
        this.flag3 = true;
      }
    },
    // 提交订单
    onSubmit() {
      if (!this.list2.getSering.province) {
        Toast("请先设置收货地址地址");
        return;
      }
      var c = [];
      this.list.forEach((el, index) => {
        console.log(index);
        if (el.xz == true) {
          el.zindex = index;
          c.unshift(el);
        }
      });
      var b = {};
      this.$cookies.get("userInfoCode").shouhuodizhi.forEach(el => {
        if (el.checked == true) {
          b = el;
        }
      });
      if (c.length <= 0) {
        Toast("至少选中一样才能结算!");
        return;
      }
      var data = {
        iphone: this.$cookies.get("userInfoCode").iphone,
        data: c,
        dizhi: b
        // dizhi:this.listU
      };
      Toast.loading({
        message: "提交中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 800
      });
      setTimeout(() => {
        this.$router.push({ path: "/accounts", query: data });
      }, 1000);
    },
    qx(e) {
      Toast.loading({
        forbidClick: true,
        loadingType: "spinner",
        duration: 400
      });
      setTimeout(() => {
        if (e == 1) {
          this.list.forEach(el => {
            el.xz = true;
          });
          this.flag3 = false;
        } else if (e == 2) {
          this.list.forEach(el => {
            el.xz = false;
          });
          this.flag3 = true;
        }
      }, 450);
    },
    logo() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 600
      });
      setTimeout(() => {
        this.$router.push({ path: "/tabbar5" });
      }, 800);
    }
  },
  created() {
    // 第一处修改 
    if (this.$cookies.get("userInfoCode")) {
      this.flag11 =true
    }
    if (this.$cookies.get("userInfoCode")) {
      var n = {};
      n = this.$cookies.get("userInfoCode").shouhuodizhi.find(el => {
        return el.checked == true;
      });
      var cd = {
        Details: "罗西街道",
        checked: true,
        getSering: { province: "山东省", city: "临沂市", area: "罗庄区" },
        iphone: "15550918652",
        iphones: 15550918652,
        person: "顾666",
        tags: "家"
      };
      if (!n) {
        this.list2 = cd;
      } else {
        setTimeout(el => {
          this.list2 = n;
        }, 10);
      }
      setTimeout(el => {
        this.flag8 = true;
      }, 10);
    }
    if (this.$cookies.get("userInfoCode")) {
      this.$axios
        .get("/api/ggojdnb?iphone=" + this.$cookies.get("userInfoCode").iphone)
        .then(data => {
          data.data.data.obligation.forEach(element => {
            element.xz = false;
            element.jg = 1;
          });
          setTimeout(() => {
            this.ls = data.data.data.obligation;
            this.$store.state.gwcList = data.data.data.obligation;
            this.list = data.data.data.obligation;
          }, 100);
          if (data.data.data.obligation.length >= 1) {
            this.flag2 = false;
            this.flag4 = false;
            this.flag5 = false;
            this.flag6 = true;
          } else {
          }
        });
    }
    if (this.$cookies.get("username")) {
      this.flag2 = false;
      this.message = "购物车空空如也~,去逛逛吧";
    } else {
      this.flag2 = true;
      this.message = "登录后可同步购物车商品";
    }
  },
  computed: {
    fullNumber(el) {
      var a = 0;
      this.list.forEach(el => {
        if (el.xz == true) {
          a += el.ratepreice * el.jg;
        }
      });
      return a * 100;
    }
  },
  components: {
    seckill: seckill,
    carList: carList
  }
};
</script>
<style scoped>
.opc1{
  display: none
}
.velse {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0%;
  background-color: white;
  display: flex;
}
.yzscj {
  display: flex;
  position: absolute;
  right: 0%;
}
.yzscj button {
  width: 75px;
  height: 32px;
  font-size: 13px;
  line-height: 32px;
  padding: 0;
  text-align: center;
  margin-right: 10px;
  margin-top: 10px;
}
.yzscjdelete {
  background-color: red;
  color: white;
}
.vantQuanx23 {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 12px;
  margin-top: 8px;
  margin-left: 7.5px;
}
.velse > {
  margin-top: -10px;
}
.top30 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.shangozhong {
  color: red;
  font-size: 10px;
  margin: 0;
  padding: 0;
}
.displ {
  display: flex;
  margin-top: 5px;
}
.displ button {
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  margin-left: 3px;
  margin-right: 3px;
  line-height: 20px;
}
.displ input {
  width: 40px;
  height: 20px;
  font-size: 13px;
  text-align: center;
  margin: 0;
  padding: 0;
  padding: 2px;
}
.zxImp {
  margin-left: 11px;
}
.disSPan {
  margin-top: 5px;
}
.disSPan span {
  color: red;
}
.disSPan span:nth-child(1) {
  font-size: 13px;
}
.disSPan span:nth-child(2) {
  font-weight: 600;
  font-size: 15px;
}
.zxImp p:nth-child(1) {
  width: 100%;
  color: black;
  /* text-overflow: -o-ellipsis-lastline; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.zxpspan {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
}
.zxpspan span {
  background-color: #f7f7f7;
  text-align: center;
  padding: 2px 2px;
}
.zxpspan span:nth-child(1) {
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.displflex {
  display: flex;
  margin-top: -4px;
}
.np {
  width: 100px;
  display: flex;
  align-items: center;
  margin: 0;
}
.van-stepper__minus {
  padding: 0;
}
.flexEnd {
  display: flex;
  justify-content: flex-end;
  font-size: 11px;
}
.flexEnd span {
  margin-right: 5px;
}
.imags {
  width: 100px;
  height: 100px;
}
.flXym {
  display: flex;
  width: 95%;
  margin: 0 auto;
  margin-top: 12px;
}
.h1Ym {
  font-weight: 600;
}
.h2ym {
  font-size: 13px;
  color: #a7a7a7;
  margin-left: 2px;
}
.vantQuanx1 {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 8px 10px;
  justify-content: space-between;
  margin: 0 auto;
}
.ymyfVantQuan1 {
  display: flex;
  align-items: center;
}
.vantQuanx1 > div {
  display: flex;
  align-items: center;
}
.vantQuanx1 > div > img {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  margin-left: 10px;
}
.cars {
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
}
</style>
<style scoped>
.bjsp {
  padding: 7px 10px;
  background-color: white;
  margin: 0;
  width: 100%;
  display: flex;
  border-bottom: 1.6px solid #f5f5f5;
  align-items: center;
}
.dz3 {
  width: 20px;
  height: 20px;
}
.bjsp span:nth-child(1) {
  font-size: 14px;
  color: #a2a2a2;
  margin-left: 3px;
}
.bjsp span:nth-child(3) {
  color: black;
  position: absolute;
  right: 5%;
}
.vantQuanx {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 12px;
  margin-top: 17px;
  margin-left: 7.5px;
}
.tabbar4 {
  width: auto;
  overflow: hidden;
  background-color: #f7f7f7;
}
.tabbar4top {
  width: 100%;
  height: 60px;
  background-color: white;
  border-top: 0.5px solid gray;
}
.np {
  width: 100%;
  display: flex;
  justify-content: center;
  color: black;
  align-items: center;
  margin-top: 14px;
}
.np button {
  color: white;
  background-color: red;
  padding: 5px 21px;
  border: none;
  margin-left: 8px;
}
.npp {
  width: 100%;
  height: 256px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.npp img {
  width: 90px;
  height: 90px;
}
.npp p {
  margin-top: 16px;
  font-size: 16px;
  color: black;
}
.jdms {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
}
.jdms span {
  font-size: 11px;
}
.jdms span:first-child {
  width: 130px;
  height: 1px;
  display: inline-block;
  background-color: gray;
  margin-right: 15px;
  margin-bottom: 2px;
}
.jdms span:last-child {
  width: 130px;
  height: 1px;
  display: inline-block;
  background-color: gray;
  margin-left: 15px;
  margin-bottom: 2px;
}
.xyh {
  width: 100%;
  height: 136px;
  background-color: white;
  margin-top: 18px;
}
.smp {
  width: 90%;
  margin: 0 auto;
  display: flex;
  padding-top: 15px;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: black;
}
.smp button {
  border-radius: 30px;
  /* background-color: #FE8969; */
  background-image: linear-gradient(to right, #fc8161, #f33217);
  color: white;
}
.yhq {
  width: 145px;
  height: 80px;
  margin-left: 20px;
}
</style>