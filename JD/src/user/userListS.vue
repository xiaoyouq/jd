<template>
  <div class="userListSs">
    <div class="poastions"></div>
    <!-- 顶部 -->
    <div class="topuser">
      <van-icon
        style="margin-right:8px;margin-left:10px;margin-top:-8px;"
        name="checked"
        color="white"
        size="22"
      />
      <p v-if="date.x1 && date.x4==false && date.x2 == false">
        <span>等待卖家发货</span>
        <span>商家正在打包您的商品,预计今天到达</span>
      </p>
      <p v-else-if="date.x4 && date.x2 == false">
        <span>等待买家签收</span>
        <span>您的宝贝已到达，请签收❤</span>
      </p>
      <p v-else-if="date.x2">
        <span>交易完成</span>
        <span>您的订单已签收,祝你购物愉快</span>
      </p>
    </div>
    <!-- 订单详情哦 -->
    <div class="userLists">
      <!-- 出库时间 -->
      <!-- 已经发货的提示 -->
      <div v-if="date.x4" class="userLeft">
        <img style="width:30px;height:30px;margin-left:15px;" :src="im2" alt />
        <div class="userLeft2">
          <p>
            您宝贝的已到达{{date.dizhi.getSering.province}}{{date.dizhi.getSering.city}}{{date.dizhi.getSering.area}}{{date.Details}}，派送员：张泽明,手机号:
            <span
              style="color:red"
            >18356944762</span>
          </p>
          <span>{{date.crrtimes | times}}</span>
        </div>
      </div>
      <!-- 还没发货的提示 -->
      <div v-else class="userLeft">
        <img style="width:30px;height:30px;margin-left:15px;" :src="im1" alt />
        <div class="userLeft2">
          <p>您的订单已经提交完成,请等待商家处理您的订单已经提交完成,请等待商家处理</p>
          <span>{{date.crrtimes | times}}</span>
        </div>
      </div>

      <div class="userRifht">
        <van-icon
          style="width:30px;height:30px;margin-left:15px;"
          size="25"
          color="#CCCCCC"
          name="location"
        />
        <div class="userLeft3">
          <span style="font-size:14px;">
            {{date.dizhi.person}}
            <span>{{date.iphone}}</span>
          </span>
          <p
            style="font-size:13.5px;"
          >{{date.dizhi.getSering.province}}{{date.dizhi.getSering.city}}{{date.dizhi.getSering.area}}{{date.dizhi.Details}}</p>
        </div>
      </div>
    </div>
    <!-- 订单的数量以及哪一家电 -->
    <div class="dd">
      <!-- 订单数量头部  -->
      <div class="ddTop">
        <p>
          <img style="margin-right:7px;" :src="im3" alt />
          <span class="fqlix">{{date.sort}}旗舰店</span>
          <img style="width:13px;height:13px;margin-left:7px;" :src="im4" alt />
        </p>
        <span class="gyj">共计{{date.count}}件商品</span>
      </div>

      <!-- 订单图片已经名字 -->
      <div class="ddtp">
        <img :src="date.picture[0].picture" alt />
        <div class="dingdanmz">
          <p class="diyigep">{{date.content}}</p>
          <span style="font-size:12px;color:#A7A7A7;">{{date.count}}件装</span>
          <p class="diergep">
            <span class="fontw">
              <span>¥</span>
              {{date.count*date.ratepreice}}
            </span>
            <span>x{{date.count}}</span>
          </p>
        </div>
      </div>
      <!-- 练习客服 -->
      <p class="lxkfS">
        <img :src="im5" alt />
        <span>联系客服</span>
      </p>
    </div>

    <!-- 退换无忧  -->
    <p class="thwy">
      <span>
        <span style="font-size:16px;color:black;">退换无忧</span>
        <span style="font-size:13px;">您的运费险服务协议已到期</span>
      </span>
      <span>商家赠送></span>
    </p>
    <!-- 退换无忧 真的 -->

    <!-- 订单详情 包括时间等等  -->
    <div class="ddxqs">
      <div class="sx">
        <p>
          <span>订单编号：</span>
          {{date._id}}
        </p>
        <p>
          <span>下单时间：</span>
          {{date.crrtimes |times}}
        </p>
        <p>
          <span>交易方式：</span>微信/支付支付
        </p>
        <p>
          <span>供货商家：</span>
          {{date.sort}}旗舰店
        </p>
        <p>
          <span>配送方式：</span>SF顺丰空运
        </p>
      </div>
      <div class="sxx">
        <p>
          <span>商品金额：</span>
          ¥&nbsp;{{date.count*date.ratepreice}}
        </p>
        <p v-if="!date.thwy">
          <span>运费：</span>+¥&nbsp;3.9
        </p>
        <p v-else>
          <span>运费：</span>¥&nbsp;0.00
        </p>
        <p v-if="!date.yhq1">
          <span>支付优惠：</span>-¥&nbsp;20
        </p>
        <p v-else>
          <span>支付优惠：</span>¥&nbsp;0.00
        </p>
        <p>
          <span>商品优惠：</span>-¥&nbsp;0.00
        </p>
      </div>

      <div class="sfje">
        <p>
          实付金额：
          <span>¥&nbsp;{{date.fnNumll2}}</span>
        </p>
      </div>
    </div>
    <!-- 最后 -->
    <carlist />
    <!-- 底部导航qqqqqq -->

    <div v-if="date.x4||date.x3" class="headerT">
      <el-button type="danger">查看类似</el-button>
      <el-button type="danger" v-if="!date.x2" @click="qrsh">确认收货</el-button>
      <el-button type="danger" v-else-if="date.x3 == false" @click="qpj">去评价</el-button>
    </div>

    <!-- element确认收货的 需要虚入正确的密码 -->
    <van-dialog v-model="show" :beforeClose="qwe" @click="qwe" title="收货验证" show-cancel-button>
      <p class="yzbr">请输入登录密码,验证是否本人</p>
      <input v-model="inputUserName" class="inputs" type="password" />
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
import carlist from "../components/carlist.vue";
import { Dialog } from "vant";
import { Toast } from "vant";
Vue.use(Dialog);
Vue.filter("times", function(el) {
  var c = parseInt(el);
  var date = new Date(c);
  var Y = date.getFullYear() + "年";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "月";
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var S = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var F = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var mm = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return `${Y}${M}${D} ${S}:${F}:${mm}`;
});
export default {
  data() {
    return {
      im1: require("../assets/user/dsh2.png"),
      im2: require("../assets/user/dsh3.png"),
      im3: require("../assets/iconfont/shangdian.png"),
      im4: require("../assets/iconfont/right19.png"),
      im5: require("../assets/user/jdkf.png"),
      date: this.$route.query,
      show: false,
      inputUserName: ""
    };
  },
  methods: {
    // 去评价
    qpj() {
      Toast.loading({
        message: "火速前往...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1000
      });
      setTimeout(() => {
        this.$router.push({ path: "/pinglun", query: this.$route.query });
      }, 1200);
    },
    qrsh() {
      this.show = true;
    },
    qwe(action, done) {
      if (this.inputUserName.length == 0 && action == "confirm") {
        this.inputUserName = "";
        Toast("输入框不能为空");
        done();
        this.show = false;
        return;
      }
      if (action == "cancel") {
        this.inputUserName = "";
        this.show = false;
        done();
      } else if (action == "confirm") {
        var c = {
          iphone: this.$cookies.get("userInfoCode").iphone,
          password: this.inputUserName
        };
        var d = {
          iphone: this.$cookies.get("userInfoCode").iphone,
          _id: this.date._id
        };
        this.$axios.post("/api/passwordSj", c).then(data => {
          if (data.data.error_code != 200) {
            done(false);
            return Toast("密码错误");
          } else {
            this.$axios.post('/api/jdfhnbx5',d).then(data=>{
                console.log(data)
            })
            setTimeout(() => {
              Toast.success("密码正确");
            }, 500);
            setTimeout(() => {
              this.$router.push({ path: "/pinglun", query: this.$route.query });
              this.inputUserName = "";
              this.show = false;
              done();
            }, 1000);
          }
        });
      }
    }
  },
  created() {
    console.log(this.$route.query);
  },
  components: {
    carlist: carlist,
    [Dialog.Component.name]: Dialog.Component
  }
};
</script>

<style scoped>
.yzbr {
  display: flex;
  justify-content: center;
  margin-top: 7px;
}
.inputs {
  width: 80%;
  height: 30px;
  display: flex;
  margin-left: 35px;
}
.headerT {
  width: 100%;
  height: 40px;
  background-color: white;
  position: fixed;
  bottom: 0%;
  border-top: 2px solid #f5f5f5;
  display: flex;
  justify-content: flex-end;
}
.headerT button {
  height: 30px;
  margin: 0;
  font-size: 14px;
  padding: 10px;
  margin-top: 5px;
  background-color: red;
  text-align: center;
  line-height: 5px;
  margin-right: 15px;
}
.headerT button:nth-child(1) {
  background-color: white;
  border: 1px solid red;
  color: red;
}
.sfje {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
}
.sfje p {
  font-size: 16px;
  font-weight: 600;
  color: black;
}
.sfje p span {
  color: red;
  font-size: 17px;
}
.sxx {
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
}
.sxx p {
  display: flex;
  color: black;
  justify-content: space-between;
  font-weight: 600;
}
.sxx p span {
  font-weight: 400;
}
.sx {
  width: 90%;
  margin: 0 auto;
  border-bottom: 2px solid #f6f6f6;
  margin-top: 10px;
  padding-bottom: 10px;
}
.sx p {
  display: flex;
  padding: 0;
  margin: 0;
  margin-top: 5px;
  color: black;
  font-size: 15px;
}
.sx p span {
  color: #a2a2a2;
}
.ddxqs {
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.thwy {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: space-between;
}
.lxkfS {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 21px;
}
.lxkfS img {
  width: 25px;
  height: 25px;
}
.fontw {
  font-weight: 600;
  color: red;
  font-size: 14px;
}
.fontw span {
  font-size: 12px;
}
.dingdanmz {
  width: 75%;
  display: flex;
  flex-direction: column;
}
.diergep {
  display: flex;
  justify-content: space-between;
}
.diyigep {
  color: black;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
}
.ddtp {
  width: 90%;
  margin: 0 auto;
  display: flex;
  margin-top: 15px;
}
.ddtp img {
  width: 75px;
  height: 75px;
  margin-right: 10px;
}
.dd {
  width: 100%;
  height: 195px;
  margin-top: 10px;
  background-color: white;
}
.fqlix {
  font-size: 15px;
  color: black;
}
.ddTop {
  width: 93%;
  height: 48px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1.5px solid #f3f3f3;
}
.ddTop p {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}
.ddTop span {
  padding: 0;
  margin: 0;
}
.gyj {
  font-size: 13px;
  color: #9d9d9d;
}
.ddTop img {
  width: 20px;
  height: 20px;
}
.userLeft3 {
  margin-left: 10px;
}
.userRifht {
  width: 100%;
  height: 39%;
  display: flex;
  align-items: center;
  padding-top: 10px;
}
.userLeft2 {
  width: 90%;
  margin-left: 10px;
}
.userLeft2 p {
  width: 90%;
  margin: 0;
  padding: 0;
  color: black;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.userLeft2 span {
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #999999;
}
.userLeft {
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f7f7f7;
}
.userLists {
  width: 100%;
  height: 146px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.topuser {
  width: 100%;
  height: 67px;
  background-image: linear-gradient(90deg, #f66d70, #e93b3d);
  display: flex;
  align-items: center;
  padding-top: 15px;
}
.topuser p {
  color: white;
  display: flex;
  flex-direction: column;
}
.topuser p span:nth-child(1) {
  font-size: 16px;
}
.userListSs {
  background-color: #f2f3f3;
  padding-bottom: -50px;
}
.poastions {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f2f3f3;
  z-index: -1;
}
</style>