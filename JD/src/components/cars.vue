<template>
  <div class="cars">
    <el-carousel class="im" indicator-position="outside">
      <el-carousel-item v-for="(item,index) in ObjectList.picture" :key="index">
        <img :src="item.picture" alt />
      </el-carousel-item>
    </el-carousel>
    <div class="price">
      <div class="priceLeft">
        <p>
          <span>￥</span>
          <span>
            {{ jiage1}}<a class="ka">{{jiage2 | fover}}</a>
          </span>
        </p>
      </div>
      <div class="priceRight">
        <p>
          <span>距秒杀结束还剩</span>
          <span>
            <settime :classActive="classActive" :endTime="endTime"></settime>
          </span>
        </p>
      </div>
    </div>
    <!-- 京东自营 -->
    <div class="jdzyA">
      <div class="jdzyTitle">
        <div class="jdzyTitleL">
          <span>
            <img :src="image1" alt />
            {{ ObjectList.content }}
          </span>
        </div>
        <div class="jdzyTitleR">
          <img @click="scHover" v-if="scFlag" :src="image2" alt />
          <img @click="scHover" v-else :src="image3" alt />
          <span>{{ysc}}</span>
        </div>
      </div>
      <p class="jdzyTitles">
        <span>{{ ObjectList.utitle }}</span>
        <span>库存:{{ ObjectList.repertory}}</span>
      </p>
    </div>
    <div class="yhq">
      <p class="yhx" style="color:#9E9EA3;">优惠 ：该商品并未有任何优惠</p>
    </div>
    <!-- 已选和未选 -->

    <div class="actives">
      <div class="yx">
        <p>
          <span>已选</span>
          <span>{{ObjectList.utitle}}</span>
          <img :src="image4" alt />
        </p>
        <p class="yxax">本商品支持保障服务,点击可选服务</p>
      </div>
      <div class="yx">
        <p>
          <span>送至</span>
          <span>{{listU.getSering.province }}{{listU.getSering.city }}{{listU.getSering.area }}</span>
          <img @click="getSend" :src="image4" alt />
        </p>
        <van-popup v-model="show" position="bottom" :style="{height:'50%'}">
          <p class="vanP">选择地址</p>
          <ul>
            <li class="vantli" @click="vantUi(item)" v-for="(item,index) in listSHDZ" :key="index">
              <img v-if="item.checked" style="width:18px;height:18px" :src="image6" alt />
              <span class="vantSPan">{{item.tags}}</span>
              <span
                class="vantOver"
              >{{item.getSering.province}}{{item.getSering.city}}{{item.getSering.area}}</span>
              <img class="vantLeft" style="width:17px;height:17px" :src="image7" alt />
            </li>
          </ul>
          <p @click="putShdz" class="putShdz">
            新增收货地址
            <img :src="image8" alt />
          </p>
        </van-popup>
        <p class="yxax">现货 22:00前下单,预计明天送达</p>
      </div>
      <div class="yx">
        <p>
          <span>运费</span>
          <span>免运费</span>
        </p>
      </div>
      <!-- 、1 -->
      <div class="dhx">
        <div style="display: flex;flex-wrap: wrap;">
          <p v-for="(itme,index) in listTitle" :key="index">
            <img class="vantImage" :src="image5" alt />
            {{itme.title}}
          </p>
        </div>
        <img class="vantImage" :src="image4" alt />
      </div>
    </div>
    <!-- 底部 -->
    <div class="zindex999">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" @click="kefuGet" text="客服" />
        <van-goods-action-icon icon="cart-o" @click="gwcgsSS" text="购物车" :info="gwcgsS" />
        <van-goods-action-icon icon="shop-o" @click="dpAps" text="店铺" :info="dpAps1" />
        <van-goods-action-button @click="pushjdnb" type="warning" text="加入购物车" />
        <van-goods-action-button @click="routerAccounts" type="danger" text="立即购买" />
      </van-goods-action>
    </div>

    <!-- 评论 -->
    <div class="pinglun">
      <div @click="plqbjz" class="pinglunTop">
        <p>评价</p>
        <span class="hps" v-if="plList.length>=1">好评 {{funNumbersq3 | hpl}}%</span>
        <span class="hps" v-else>好评 0%</span>
        <span class="hbs1">共 {{plList.length}}+ 条</span>
        <img :src="image9" alt />
      </div>
      <!-- 代填补 -->
    </div>
    <div class="pinglunbottom">
      <div class="plssss">
        <p class="pplss">非常喜欢({{funNumbersq}})</p>
        <p class="pplss">快递很快({{funNumbersq1}})</p>
        <p class="pplss">服务到位({{funNumbersq2}})</p>
      </div>

      <!-- 此处循环 -->
      <div
        class="xunhuanp"
        style="margin-top:10px;"
        v-for="(item,index) in plList"
        :key="index"
        v-show="index<2"
      >
        <div class="xunhaundivp">
          <p>
            <img :src="item.touxiang | imageFilter" alt />
            <span>
              <span style="color:black;font-size:12.5px;">{{item.username | usernameIphone}}</span>
              <span
                style="padding:2px;color:#E4D887;font-size:5px;background:#424241;margin-right:5px;"
              >PLUS</span>
            </span>
            <van-rate
              v-model="value"
              :size="13"
              gutter="0"
              color="#ee0a24"
              void-icon="star"
              void-color="#eee"
            />
          </p>
          <p>{{item.time | times1}}</p>
        </div>
        <!-- 这是评论的内容 -->
        <p class="plnba">{{item.neirong}}</p>
        <!-- 这是图片 -->
        <div class="zheshitupian" v-if="item.tu.length>=1">
          <img
            v-for="(item1,index1) in item.tu"
            :key="index1"
            :src="item1.content | imageContent"
            alt
          />
        </div>
        <div v-else>
          <img style="margin-left: 10px;" :src="im5" alt />
          <img style="margin-left: 10px;" :src="im5" alt />
          <img style="margin-left: 10px;" :src="im5" alt />
        </div>
      </div>
    </div>
    <!-- 关注店铺 -->
    <div class="leaveBottom">
      <p class="jdzyBtoom">
        <img :src="image10" alt />
        <span class="jdwdmd">{{sort}}</span>
        <span>京东自营</span>
      </p>
      <div class="jdzyS">
        <p>
          <span>{{shoucangdianpu}}</span>
          <span>粉丝人数</span>
          <button @click="guanzhudianpu">
            <img :src="image11" alt />
            {{guanzhudianpu1}}
          </button>
        </p>
        <p>
          <span>{{tupianjianjieImage.length}}</span>
          <span>全部商品</span>
          <button>
            <img :src="image12" alt /> 进入店铺
          </button>
        </p>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="guessLike">
      <p class="doyoulike">猜你喜欢</p>
      <ul class="doyoulikeUl">
        <li
          class="doyoulikeLi"
          @click="carListTrueClick(item)"
          v-for="(item,index) in carListTrue"
          :key="index"
        >
          <img :src="item.picture[0].picture" alt />
          <span class="qwk">{{item.content}}</span>
          <span class="reds">￥{{item.ratepreice}}</span>
        </li>
      </ul>
    </div>

    <!-- 商品介绍 -->
    <div class="jdJS">
      <p class="doyoulike2">商品简介</p>
      <img
        class="doyoulikeImage"
        v-for="(item,index) in tupianjianjieImage"
        :key="index"
        :src="item.picture"
        alt
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "mint-ui"; //轮播图
import { Rate } from "vant";
Vue.use(Rate);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.filter("hpl", function(el) {
  var c = Number(el);
  var d = c.toFixed(2);
  return d;
});
Vue.filter("imageContent", function(el) {
  return el;
});
Vue.filter("usernameIphone", function(el) {
  var c = el.length - 4;
  var b = el.substring(0, 4);
  var d = el.substring(c);
  return b + "****" + d;
});
Vue.filter("times1", function(el) {
  var c = parseInt(el);
  var s = new Date(c);
  var cs = s.getMonth() + 1;
  var cs1 = s.getFullYear();
  var css = s.getDate();
  return cs1 + "-" + cs + "-" + css;
});
Vue.filter("imageFilter", function(el) {
  if (el == 1) {
    return require("../assets/jdBackground/userIndexPictrue.png");
  } else {
    return el;
  }
});
import settime from "../components/settime.vue";
import { type } from "os";
import { Popup } from "vant";
Vue.use(Popup);
import { Toast } from "vant";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import { lstat } from "fs";
Vue.use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton);
Vue.filter("fover", function(el) {
  return el;
});
export default {
  data() {
    return {
      ObjectList: {},
      Topimage: {},
      endTime: "2020-08-29 12:00:00",
      classActive: 1,
      jiage1: "",
      jiage2: "",
      image1: require("../assets/iconfont/jdzy.png"),
      image2: require("../assets/iconfont/sc.png"),
      image3: require("../assets/iconfont/sc2.png"),
      scFlag: this.$route.query.ins,
      image4: require("../assets/iconfont/right1.png"),
      image5: require("../assets/iconfont/duihaox.png"),
      listTitle: [
        { title: "商家发货&售后" },
        { title: "七天无理由退货(使用后不支持)" },
        { title: "24H发货" },
        { title: "自提" },
        { title: "送运费险" },
        { title: "闪电退款" },
        { title: "急速审核" },
        { title: "30天质保" },
        { title: "七天保价" }
      ],
      show: false,
      value: 5,
      listU: {
        Details: "123123",
        checked: true,
        iphone: "15550918652",
        person: "顾召同666",
        tags: "家",
        getSering: { area: "无", city: "无", province: "无" }
      },
      image6: require("../assets/iconfont/vantyes.png"),
      image7: require("../assets/iconfont/vantyes1.png"),
      image8: require("../assets/iconfont/vantjiahao.png"),
      image9: require("../assets/iconfont/right19.png"),
      image10: require("../assets/user/jduser2.png"),
      image11: require("../assets/iconfont/xingxing1.png"),
      image12: require("../assets/iconfont/xingxing2.png"),
      listSHDZ: [
        {
          Details: "123123",
          checked: true,
          iphone: "15550918652",
          person: "顾召同666",
          tags: "家",
          getSering: { area: "无", city: "无", province: "无" }
        }
      ],
      ysc: "收藏",
      cokkiesA: true,
      flagC: false,
      sort: "",
      carListTrue: [],
      tupianjianjieImage: [],
      guanzhudianpu1: "关注店铺",
      guanzhudianpu2: [],
      shoucangdianpu: 0,
      nums: 0,
      plList: [],
      im5: require("../assets/user/gyhmytp.png"),
      gwcgsS: this.$store.state.gwcAC2, //购物车
      dpAps1: this.$store.state.gwcAC1
    };
  },
  methods: {
    // 跳转到 客服聊天的页面
    kefuGet() {
      if (this.$cookies.get("userInfoCode")) {
        Toast.loading({
          message: "联系客服...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 400
        });
        setTimeout(() => {
          this.$router.replace({ path: "/lt", query: this.$route.query });
        }, 500);
        return;
      } else {
        Toast("登录后才能查看");
      }
    },
    // 跳转到店铺
    dpAps() {
      if(this.$cookies.get('userInfoCode')){
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 800
        });
        setTimeout(() => {
          this.$router.replace({ path: "/dphover", query: 1 });
        }, 900);
      }else{
        Toast('登录后才能查看')
      }
    },
    // 跳转到购物车
    gwcgsSS() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 800
      });
      setTimeout(() => {
        this.$router.replace({ path: "/tabbar4" });
      }, 1000);
    },

    // 商品的评论以及里面的东西
    plqbjz() {
      var data = {
        data: this.ObjectList,
        dizhi: this.listU
        // dizhi:this.listU
      };
      this.$router.push({ path: "/sppl", query: data });
    },
    // 立即购买
    routerAccounts() {
      if (this.$cookies.get("userInfoCode")) {
        var data = {
          iphone: this.$cookies.get("userInfoCode").iphone,
          data: this.ObjectList,
          dizhi: this.listU
          // dizhi:this.listU
        };
        Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 800
        });
        setTimeout(() => {
          this.$router.push({ path: "/accounts", query: data });
        }, 1000);
      } else {
        Toast("登录后才能购买");
      }
    },
    // 加入购物车
    pushjdnb() {
      if (this.$cookies.get("userInfoCode")) {
        var data = {
          iphone: this.$cookies.get("userInfoCode").iphone,
          data: this.$route.query.data
        };
        this.$axios.post("/api/pushjdnb", data).then(data => {
          if (data.data.error_code == 303) {
            Toast.fail("请勿重复添加!");
          } else if (data.data.error_code == 200) {
            Toast.loading({
              message: "加载中...",
              forbidClick: true,
              loadingType: "spinner",
              duration: 400
            });
            setTimeout(() => {
              Toast.success("添加成功！");
            }, 450);
          }
        });
      } else {
        Toast("登录后才能添加");
      }
    },
    // 关注店铺
    guanzhudianpu() {
      if (this.$cookies.get("userInfoCode")) {
        if (this.guanzhudianpu1 == "已经关注店铺") {
          this.$axios
            .get(
              "/api/deleteCarDian?name=" +
                this.ObjectList.sort +
                "&username=" +
                this.$cookies.get("userInfoCode").username
            )
            .then(data => {
              this.shoucangdianpu = data.data.data.people.length;
              if (data.data.error_code == 223) {
                Toast.fail("取消成功");
                this.guanzhudianpu1 = "关注店铺";
              }
            });
        } else if (this.guanzhudianpu1 == "关注店铺") {
          var c = {
            username: this.$cookies.get("userInfoCode").username,
            ic: 1
          };
          this.$axios
            .post("/api/putCarDian2", { name: this.ObjectList.sort, title: c })
            .then(data => {
              this.shoucangdianpu = data.data.data.people.length;
              if (data.data.error_code == 222) {
                Toast.success("关注店铺成功");
                this.guanzhudianpu1 = "已经关注店铺";
              }
            });
        }
      } else {
        Toast("登录后才能关注哦");
      }
    },
    scHover() {
      if (this.cokkiesA == true) {
        this.scFlag = !this.scFlag;
        if (this.scFlag == false) {
          this.$axios
            .post("/api/goodsCollections", {
              useri: this.$cookies.get("userInfoCode").iphone,
              data: this.ObjectList
            })
            .then(data => {
              if (data.data.error_code == 200) {
                Toast("收藏成功");
                this.ysc = "已收藏";
              } else {
                Toast("收藏失败");
              }
            });
        } else {
          Toast("取消成功");
          this.ysc = "收藏";
          this.$axios
            .post("/api/deleteGoodsCollections", {
              useri: this.$cookies.get("userInfoCode").iphone,
              data: this.ObjectList
            })
            .then(data => {});
        }
      } else {
        Toast("登录后才能收藏哦");
      }
    },
    getSend() {
      if (this.cokkiesA == true) {
        this.show = true;
      } else if (this.cokkiesA == false) {
        Toast("请先登录");
      }
    },
    putShdz() {
      this.$router.push({
        path: "/goShippingPut",
        query: { data: this.ObjectList }
      });
    },
    vantUi(item) {
      this.listU = item;
      this.show = false;
    }
  },
  created() {
    // 请求商品评论
    this.$axios
      .get("/api/utitleConter?utitle=" + this.$route.query.data.utitle)
      .then(data => {
        this.plList = data.data.data.pl;
      });
    if (this.$cookies.get("userInfoCode")) {
      this.$axios
        .post("/api/getGoodsCollections", {
          useri: this.$cookies.get("userInfoCode").iphone,
          utitle: this.$route.query.data.utitle
        })
        .then(data => {
          if (data.data.data) {
            this.scFlag = false;
          } else {
            this.scFlag = true;
          }
        });
    } else {
      this.scFlag = false;
    }
    if (this.$cookies.get("username")) {
      // 请求购物车信息
      this.$axios
        .get("/api/findJdnb?iphone=" + this.$cookies.get("userInfoCode").iphone)
        .then(data => {
          this.$store.state.gwcAC2 = data.data.data.obligation.length;
          this.gwcgsS = data.data.data.obligation.length;
        });

      this.$axios.get("/api/ggoCarDian").then(data => {
        var list = [];
        data.data.data.forEach((element, index) => {
          element.people.forEach(ele => {
            if (ele.username == this.$cookies.get("userInfoCode").username)
              ele.name = element.name;
            list.push(ele);
            this.$store.state.gwcAC1 = list.length;
            console.log(list)
            this.dpAps1 = list.length;
          });
          //  return el.people.username==this.user.username
        });
        // var lists = [].concat(...list);
      });

      this.cokkiesA = true;
      if (this.$cookies.get("userInfoCode").shouhuodizhi.length >= 1) {
        this.listSHDZ = this.$cookies.get("userInfoCode").shouhuodizhi;
      }

      if (this.$cookies.get("userInfoCode").shouhuodizhi != null) {
        // console.log("ok");
        // console.log(this.$cookies.get("userInfoCode"));
        if (this.$cookies.get("userInfoCode").shouhuodizhi.length == 0) {
        } else {
          this.listU = this.$cookies
            .get("userInfoCode")
            .shouhuodizhi.find(ele => {
              return ele.checked == true;
            });
        }
      }
    } else {
      this.cokkiesA = false;
    }
    // 问题所在！
    this.$store.state.routerObject = this.$route.query;
    this.ObjectList =
      this.$route.query.data || this.$store.state.routerObject.data;
    this.tupianjianjieImage = this.ObjectList.picture1.concat(
      this.ObjectList.picture
    );
    this.sort = this.ObjectList.sort;
    this.$axios.get("/api/djms?title=" + this.ObjectList.sort).then(data => {
      this.carListTrue = data.data.data;
    });
    var a = this.ObjectList.ratepreice.toString().indexOf(".");
    if (a == "-1") {
      this.jiage1 = this.ObjectList.ratepreice.toString();
      this.jiage2 = ".00";
    } else {
      this.jiage1 = this.ObjectList.ratepreice.toString().substring(a, 0);
      this.jiage2 = this.ObjectList.ratepreice.toString().substring(a);
    }
    if (this.$cookies.get("userInfoCode")) {
      this.$axios.get("/api/carDian2").then(data => {
        var c = data.data.success.find(el => {
          return el.name == this.ObjectList.sort;
        });
        c.people;
        var b = c.people.find(el => {
          return el.username == this.$cookies.get("userInfoCode").username;
        });
        if (b) {
          this.guanzhudianpu1 = "已经关注店铺";
        } else {
          this.guanzhudianpu1 = "关注店铺";
        }
      });
      this.$axios.get("/api/ggoCarDian").then(data => {
        var c = data.data.data.find(el => {
          return el.name == this.sort;
        });
        this.shoucangdianpu = c.people.length;
      });
    }
  },
  components: {
    settime: settime
  },
  computed: {
    funNumbersq() {
      var c = [];
      this.plList.forEach(el => {
        if (el.spzl >= 4) {
          c.push(c);
        }
      });
      return c.length;
    },
    funNumbersq1() {
      var c = [];
      this.plList.forEach(el => {
        if (el.shzl >= 4) {
          c.push(c);
        }
      });
      return c.length;
    },
    funNumbersq2() {
      var c = [];
      this.plList.forEach(el => {
        if (el.psyzl >= 4) {
          c.push(c);
        }
      });
      return c.length;
    },
    funNumbersq3() {
      var c = [];
      this.plList.forEach(el => {
        if (el.spzl >= 4) {
          c.push(c);
        }
      });
      var a = c.length;
      var b = this.plList.length;
      var p = (a / b) * 100;
      return p;
    }
  }
};
</script>
<style scoped>
.zheshitupian {
  width: 92%;
  height: 82px;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
}
.zheshitupian img {
  width: 80px;
  height: 80px;
  border: 1px solid #eeeeee;
  margin-right: 10px;
}
.plnba {
  width: 92%;
  margin: 0 auto;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}
.xunhaundivp {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.xunhaundivp p:nth-child(1) {
  display: flex;
  align-items: center;
}
.xunhaundivp p img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 5px;
}
.plssss {
  width: 100%;
  height: auto;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #eeeeee;
  overflow: hidden;
}
.pplss {
  margin: 0;
  padding: 0;
  width: 100px;
  padding: 3px 5px;
  font-size: 11px;
  background-color: #fdf0f0;
  color: black;
  text-align: center;
  margin-left: 15px;
  margin-top: 7px;
}
.doyoulike2 {
  padding: 10px;
  color: black;
  font-size: 16px;
  display: flex;
  justify-content: center;
}
.jdJS {
  width: 100%;
  background-color: white;
  margin-top: 15px;
}
.doyoulikeImage {
  width: 100%;
}
.reds {
  color: red;
}
.doyoulikeUl {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.doyoulikeLi {
  width: 33%;
  height: 195px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.qwk {
  width: 100%;
  height: 30px;
  line-height: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.doyoulikeLi img {
  width: 100%;
  height: 125px;
}
.guessLike {
  width: 100%;
  height: 450px;
  overflow: hidden;
  background-color: white;
  margin-top: 15px;
}
.doyoulike {
  padding: 12px;
  display: flex;
  justify-content: center;
  color: red;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1.5px solid red;
}
.van-goods-action {
  z-index: 999;
}
.jdzyS {
  display: flex;
}
.jdzyS p {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.jdzyS button {
  width: 90%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.jdzyS button img {
  width: 15px;
  height: 15px;
  margin-right: 7px;
}
.jdzyS p span:nth-child(1) {
  color: black;
}
.jdzyS p span:nth-child(2) {
  font-size: 11px;
}
.jdzyBtoom {
  padding: 10px;
  display: flex;
  align-items: center;
  color: black;
}
.jdzyBtoom img {
  width: 70px;
  height: 25px;
}
.jdwdmd {
  width: 50%;
  margin-left: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
}
.jdzyBtoom span:last-child {
  width: 60px;
  padding-left: 5px;
  background-color: red;
  color: white;
  font-size: 12px;
  border-radius: 2px;
}
.pinglunbottom {
  width: 100%;
  background-color: white;
  padding-bottom: 20px;
}
.leaveBottom {
  width: 100%;
  height: 145px;
  margin-top: 14px;
  background-color: white;
}
.pinglun {
  width: 100%;
  background-color: white;
  margin-top: 15px;
}
.pinglunTop {
  padding: 13px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}
.pinglunTop img {
  width: 17px;
  height: 17px;
  margin-left: 10px;
}
.pinglunTop > p {
  margin: 0;
}
.pinglunTop p:nth-child(1) {
  font-size: 16px;
  color: black;
  margin-right: 10px;
}
.hbs1 {
  margin-left: 40%;
  font-size: 13.5px;
}
.hps {
  font-weight: 600;
  font-size: 13px;
  color: red;
}
.putShdz {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.putShdz img {
  width: 17px;
  height: 17px;
  margin-left: 5px;
}
.vanP2 {
  width: 100%;
  display: flex;
}
.vantImage {
  width: 17px;
  height: 17px;
}
.vantli {
  width: 90%;
  display: flex;
  align-items: center;
  margin-left: 15px;
  color: #898989;
  font-size: 14px;
  padding: 13px;
  border-bottom: 2px solid #f8f8f8;
}
.vantSPan {
  width: 25px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  color: #80b9fa;
  font-size: 11px;
  padding: 0 7px;
  border: 1px solid #80b9fa;
  margin-left: 10px;
  margin-right: 10px;
  overflow: hidden;
}
.vanP {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f3f2f8;
  padding: 6px 0;
  color: black;
  font-size: 12px;
}
.vantOver {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<style scoped>
.jdzyTitles {
  width: 95%;
  margin: 0 auto;
  margin-top: 6px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.jdzyA {
  width: 100%;
  background-color: white;
  padding-top: 15px;
}
.jdzyTitle {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.jdzyTitleL {
  width: 85%;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.jdzyTitleL img {
  width: 26px;
  height: 15px;
  margin-right: 6px;
}
.jdzyTitleR {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  text-align: center;
  align-items: center;
}
.jdzyTitleR img {
  width: 20px;
  height: 20px;
  margin-left: 3px;
}
.yhq {
  width: 100%;
  background-color: white;
  margin-top: 10px;
}
.yhq p {
  width: 90%;
  display: flex;
  color: black;
  padding: 7px 10px;
}
</style>
<style scoped>
.cars {
  width: 100%;
  height: auto;
  margin-top: 0px;
}
.price {
  width: 100%;
  height: 50px;
  display: flex;
}
.priceLeft {
  width: 70%;
  height: 100%;
  background: linear-gradient(90deg, #de3060 5%, #f5732d);
}
.priceLeft p {
  color: white;
  display: flex;
  /* align-content: center; */
  margin-left: 8px;
  margin-top: 17px;
  align-items: flex-end;
}
.priceLeft p span:first-child {
  font-size: 18px;
  font-weight: 600;
}
.priceLeft p span:last-child {
  font-size: 22px;
  font-weight: 600;
}
.priceRight {
  width: 30%;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.priceRight p {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.priceRight p span:first-child {
  color: black;
  font-size: 10px;
}
.ka {
  font-size: 18px;
  color: white;
}
/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
.im {
  width: 100%;
  height: 375px;
}
.el-carousel__item is-active is-animating {
  width: 100%;
  height: 100%;
}
.el-carousel__item {
  height: 375px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
.actives {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.yx {
  padding: 12px 5px;
  border-bottom: 2px solid #f3f3f3;
  overflow: hidden;
}
.yx > p {
  width: 94%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: relative;
}
.yx > p > img {
  width: 17px;
  height: 17px;
  position: absolute;
  right: 3%;
}
.yx p span:nth-child(2) {
  margin-left: 15px;
  color: black;
  font-size: 14px;
}

.yhx {
  font-size: 14px;
  color: #8f8f94;
}
.yxax {
  margin-top: 2px;
  font-size: 12px;
  position: absolute;
  left: 12%;
}
.dhx {
  width: 95%;
  padding: 5px 12px;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-between;
}
.dhx > div {
  width: 95%;
}
.dhx > div > p {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-left: 7px;
  margin-bottom: 3px;
}
.dhx img {
  width: 15px;
  height: 15px;
  margin-right: 3px;
}
</style>