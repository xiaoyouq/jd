<template>
  <div class="accounts">
    <div class="qrdd">
      <p @click="show = !show">
        <span>{{listObject.person}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{listObject.iphone}}</span>
        <span>{{listObject.getSering.province}}{{listObject.getSering.city}}{{listObject.getSering.area}}{{listObject.getSering.Details}}</span>
      </p>
      <p class="qrddimage1">
        <img v-for="(item,index) in 9" :key="index" :src="image1" alt />
      </p>
    </div>
    <!-- <van-action-sheet v-model="show" :actions="list" @select="onSelect" /> -->
    <van-popup v-model="show" position="bottom" :style="{height:'50%'}">
      <p class="vanP">选择地址</p>
      <ul>
        <li class="vantli" @click="vantUi(item)" v-for="(item,index) in list" :key="index">
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
    <div style="width:100%;height:15px;background:#f7f7f7"></div>
    <div class="sp">
      <div class="carSp" v-for="(item,index) in listCar" :key="index">
        <p class="carSpp">
          <img :src="image9" alt />
          <span class="qjd">{{ item.sort }}&nbsp;&nbsp;旗舰店</span>
        </p>
        <div class="mq">
          <img @click="qweqweqwe" style="widht:75px;height:75px;margin-right:10px;" :src="item.picture[0].picture" alt />
          <div class="ktff">
            <p class="twop">{{ item.content }}</p>
            <div>
              <span>
                <span style="color:red">¥</span>
                <span style="fontSize:16px;color:red;">{{ item.ratepreice }}</span>
              </span>
              <div class="yd1">
                <button v-if="item.count>1" @click="item.count--">-</button>
                <input :value="item.count" type="number" />
                <button @click="item.count++">+</button>
              </div>
              <div class="wywg">
                <p>
                  <span>7</span>支持7天无理由退货
                </p>
                <p>
                  <span>!</span>价格说明
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="np">
        <li class="nps">
          <p>
            <span>配送服务</span>
            <span style="font-size:13px;">快递运输</span>
          </p>
          <p style="font-size:12px.5;margin-bottom:8px;">
            <span>中小件送货时间</span>
            <span>工作日、双休日与节假日均可送货</span>
          </p>
        </li>
        <li class="ulLi22">
          <div class="ulLi2">
            <p>退换无忧</p>
            <span>7天内到货，15天内换货，可享一次运费</span>
            <span>赔付到小金库!</span>
          </div>
          <div class="lx">
            <span style="color:red;font-size:13px;margin-right:5px;">{{thwy}}</span>
            <p style="margin-bottom:0;margin-top:5px;">
              <van-icon @click="flags(1)" v-if="flag1" size="23px" name="circle" />
              <van-icon @click="flags(2)" v-else size="23px" color="red" name="checked" />
            </p>
          </div>
        </li>
        <li class="npLis3">
          <div>
            <span>店铺留言</span>
            <input
              type="text"
              :disabled="false"
              maxlength="45"
              value
              @input="liuyan1(liuyan)"
              v-model="liuyan"
              placeholder="选填，给商家留言"
              name
              id
            />
          </div>
          <span :class="[nums>=45?'red':'ee']" style="font-size: 11px;" class="reds">{{nums}}/45</span>
        </li>
      </ul>
    </div>
    <div style="width:100%;height:15px;background:#f7f7f7"></div>
    <ul class="newUl">
      <li class="nbsps">
        <p>
          <span>发票信息</span>
          <span style="font-size:12px;">个人&nbsp;商品明细</span>
        </p>
        <p @click="showList = true">
          <span>京东券</span>
          <span style="font-size:12px;color:#ACACAC;">&nbsp;{{wenziDefault}}</span>
        </p>
        <p>
          <span>礼品卡</span>
          <span style="font-size:12px;color:#ACACAC;">&nbsp;无可用</span>
        </p>
        <p>
          <span>红包</span>
          <span style="font-size:12px;color:#ACACAC;">&nbsp;无可用</span>
        </p>
        <p>
          <span>京豆</span>
          <span style="font-size:12px;color:#ACACAC;">&nbsp;无可用</span>
        </p>
      </li>
    </ul>
    <div style="width:100%;height:15px;background:#f7f7f7"></div>
    <!-- 结算 -->
    <div class="jiesuan">
      <p>
        <span>商品金额</span>
        <span>￥{{fuNumll1 }}</span>
      </p>
      <p>
        <span>运费</span>
        <span>+￥0.00</span>
      </p>
      <p style="display: flex;justify-content: flex-end;">
        <span style="font-size: 16px;font-weight: 600;">实付金额：</span>
        <span style="font-size:16px;">￥{{fnNumll2}}</span>
      </p>
      <button class="zxzf" @click="show123">在线支付</button>
    </div>
    <img class="jdjd" :src="image10" alt />

    <!-- 优惠券提示 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
        :show-exchange-bar="false"
      />
    </van-popup>
    <van-action-sheet v-model="show1"  title="请选择支付方式">
      <div class="zfbzf">
        <p @click="show12(1)">
          支付宝支付
          <img :src="image3" alt />
        </p>
        <p @click="show12(2)">
          微信支付
          <img :src="image4" alt />
        </p>
      </div>
      <p @click="show12(3)" class="zffs">取消支付</p>
    </van-action-sheet>
  </div>
</template>

<script>
import Vue from "vue";
import { ActionSheet } from "vant";
Vue.use(ActionSheet);
import { CouponCell, CouponList } from "vant";
Vue.use(CouponCell).use(CouponList);
import { Icon } from "vant";
Vue.use(Icon);
import { Toast } from "vant";
import { type } from 'os';
export default {
  data() {
    return {
      list: [],
      image1: require("../assets/iconfont/qrddback.png"),
      image3: require("../assets/iconfont/zfbzf.png"),
      image4: require("../assets/iconfont/wxzf.png"),
      listObject: {},
      show: false,
      image6: require("../assets/iconfont/vantyes.png"),
      image7: require("../assets/iconfont/vantyes1.png"),
      image8: require("../assets/iconfont/vantjiahao.png"),
      image9: require("../assets/iconfont/shangdian.png"),
      image10: require("../assets/user/jduser2.png"),
      num: 1,
      flag1: true,
      liuyan: "", //商家留言
      nums: 0,
      listCar: [],
      thwy: 3.9,
      wenziDefault: "无可用",
      showList: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      actions: [{ name: "支付宝" }, { name: "微信" }, { name: "退出" }],
      show1: false
    };
  },
  methods: {
    qweqweqwe(){
      var c = {
        iphone:this.$cookies.get("userInfoCode").iphone,
        c:{
      available: 1,
      condition: "无使用门槛\n最多优惠3.5元",
      reason: "",
      value: 150,
      name: "全场通用",
      startAt: 1573714433,
      endAt: 1605344033,
      valueDesc: 20,
      unitDesc: "元"
    }
      }
      this.$axios.post('/api/yhqtj',c).then(data=>{
          console.log(data)
      })
    },
    show123(e) {
      Toast.loading({
        message: "正在拉起支付...",
        forbidClick: true,
        duration: 1500
      });
      setTimeout(() => {
        this.show1 = true;
      }, 1600);
    },
    show12(e) {
      var b = Date.now();
      console.log(b)
      var c = {
        dizhi: this.listObject,
        listCar: this.listCar,
        fnNumll2: this.fnNumll2,
        liuyan: this.liuyan,
        thwy: this.flag1,
        yhq: this.coupons[this.chosenCoupon],
        yhq1: this.chosenCoupon,
        createdTime: b,
        iphone: this.$cookies.get("userInfoCode").iphone
      };
      var list123 = []
      this.listCar.forEach(el=>{
        el.x1 = true
        el.x2 = false
        el.x3 = false
        el.x4 = false
        el.crrtimes = Date.now()
        if(el.zindex || el.zindex == 0){
          list123.unshift(el.zindex)
        }else{
          console.log('假的',el.zindex)
        }
      })
      setTimeout(() => {
        if(list123.length>=1){
          var d= { iphone:this.$cookies.get('userInfoCode').iphone,c :list123 }
          this.$axios.post('/api/delewgc',d).then(data=>{
            console.log(data)
          })
        }
             if(this.$route.query.index2 >=0){
          this.$axios.get('/api/routerIndexDe?index='+this.$route.query.index2+'&iphone='+this.$route.query.iphone).then(data=>{
            console.log('删除成功')
          })
      }        
      }, 500);
        if(this.chosenCoupon != -1){
          this.$axios.post('/api/yhqzy',c).then(data=>{
              console.log(data.data.data)
              this.$cookies.remove('userInfoCode')
              this.$cookies.set('userInfoCode',data.data.data)
          })
        }
      this.$axios.post('/api/dshss',c).then(data=>{
          console.log(data)
      })
      if (e == 3) {
        this.show1 = false;
      } else if (e == 1 || e == 2) {
        var a = "支付宝";
        var c = e == 1 ? "支付宝" : "微信";
        Toast.loading({
          message: "唤起" + c + "支付...",
          forbidClick: true,
          duration: 700
        });
        setTimeout(() => {
          Toast.loading({
            message: "自动支付...",
            forbidClick: true,
            duration: 1300
          });
        }, 710);
        setTimeout(() => {
          Toast.success({ message: "支付成功!", duration: 1200 });
          this.$router.push({ path: "/jycg" });
          this.show1 = false;
        }, 1850);
      }
    },
    // 优惠券
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      console.log(this.chosenCoupon);
    },
    onExchange(code) {
      this.coupons.push(coupon);
      console.log(this.coupons);
    },
    flags(e) {
      if (e == 1) {
        this.flag1 = false;
      } else if (e == 2) {
        this.flag1 = true;
      }
    },
    liuyan1(e) {
      this.nums = this.liuyan.length;
    },
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.show = false;
      Toast(item.name);
    },
    vantUi(item) {
      this.listObject = item;
      this.show = false;
    },
    putShdz() {
      this.$router.push({
        path: "/goShippingPut",
        query: { data: this.listObject }
      });
    }
  },
  created() {
    console.log(this.$route.query)
    if (this.$cookies.get("userInfoCode").coupons.length >= 1) {
      this.wenziDefault = "有可用";
    } else {
      this.wenziDefault = "无可用";
    }
    this.coupons = this.$cookies.get("userInfoCode").coupons;
    console.log(this.$cookies.get("userInfoCode"))
    this.disabledCoupons = this.$cookies.get("userInfoCode").disabledCoupons;
    console.log(this.$route.query.data)  
      if(this.$route.query.data.content){
        this.listCar.push(this.$route.query.data);
      }else{
        this.listCar = this.$route.query.data
      }
    console.log(this.listCar);
    this.list = this.$cookies.get("userInfoCode").shouhuodizhi;
    this.list.forEach(el => {
      if (el.checked == true) {
        this.listObject = el;
      }
    });
    this.listObject = this.$route.query.dizhi;
  },
  computed: {
    fuNumll1() {
      var c = 0;
      this.listCar.forEach(el => {
        c +=   el.count * el.ratepreice;
      });
      setTimeout(() => {
      }, 200);
      return parseFloat(c).toFixed(2);
    },
    fnNumll2() {
      if (this.flag1 == false) {
        var c = 0;
        this.listCar.forEach(el => {
          c += el.count * el.ratepreice;
        });
        if (this.coupons[this.chosenCoupon]) {
          return parseFloat(
            c + this.thwy - this.coupons[this.chosenCoupon].valueDesc
          ).toFixed(2);
        } else {
          return parseFloat(c + this.thwy).toFixed(2);
        }
      } else {
        var b = 0;
        this.listCar.forEach(el => {
          b += el.count * el.ratepreice;
        });
        if (this.coupons[this.chosenCoupon]) {
          return parseFloat(
            b - this.coupons[this.chosenCoupon].valueDesc
          ).toFixed(2);
        } else {
          return parseFloat(b).toFixed(2);
        }
      }
    }
  }
};
</script>

<style scoped>
.zfbzf img {
  width: 20px;
  height: 20px;
}
.zfbzf p {
  width: 80%;
  margin-left: 30px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}
.zfbzf p:nth-child(1) {
  color: #3884ff;
}
.zfbzf p:nth-child(2) {
  color: green;
}
.zffs {
  text-align: center;
  color: black;
  font-size: 16px;
  padding-bottom: 10px;
}
.jdjd {
  margin-left: 26%;
  margin-top: 30px;
  margin-bottom: 30px;
}
.zxzf {
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
  height: 50px;
  background-color: #3884ff;
  color: white;
  border-radius: 10px;
}
.jiesuan {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.jiesuan p {
  width: 90%;
  padding: 5px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.jiesuan p span:nth-child(1) {
  color: black;
}
.jiesuan p span:nth-child(2) {
  color: red;
}
.nbsps {
  width: 90%;
  margin: 0 auto;
  padding: 0;
  border-bottom: 2px solid #f7f7f7;
}
.nbsps p {
  padding: 13px 0;
  margin: 0;
  font-size: 16px;
  color: black;
  display: flex;
  justify-content: space-between;
}
.newUl {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.red {
  color: red;
}
.ee {
  color: #e4e4e4;
}
.reds {
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  line-height: 10px;
}
.npLis3 {
  display: flex;
  flex-direction: column;
  margin-top: 6px;
}
.npLis3 > div {
  display: flex;
  align-items: center;
}
.npLis3 span {
  font-size: 16px;
  margin: 0;
}
.npLis3 input {
  width: 80%;
  margin: 0;
  font-size: 14px;
  border: none;
}
.lx {
  display: flex;
  align-items: center;
}
.ulLi22 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ulLi2 {
  display: flex;
  flex-direction: column;
}
.ulLi2 p {
  color: black;
  font-size: 16px;
  margin: 0;
  margin-bottom: 5px;
}
.ulLi2 span {
  font-size: 12.5px;
  margin: 0;
  line-height: 17px;
  color: #acacac;
}
.nps {
  margin-top: 7px;
}
.nps p {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  margin-top: 5px;
}
.nps > p:nth-child(1) {
  color: black;
  font-size: 16px;
}
.wywg {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.wywg span {
  padding: 0 4px;
  border: 1px solid #4d9cfb;
  border-radius: 50%;
  color: #4d9cfb;
  margin: 0;
  font-size: 11px;
}
.np {
  width: 93%;
  margin: 0 auto;
}
.np li {
  border-bottom: 1px solid #f4f4f4;
}
.yd1 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -18px;
}
.yd1 button {
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  margin-right: 5px;
  margin-left: 5px;
}
.yd1 input {
  width: 30px;
  height: 20px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  text-align: center;
}
.mq {
  display: flex;
}
.twop {
  width: 100%;
  color: black;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 600;
}
.carSpp {
  display: flex;
  padding: 8px 0px;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
}
.carSpp img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.qjd {
  font-size: 17px;
  font-weight: 600;
  color: black;
}
.carSp {
  width: 93%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #f4f4f4;
}
.sp {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
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
.shdz {
  width: 100%;
  height: 70px;
}
.shdz > p:nth-child(1) {
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-left: 5px;
}
.shdz > p > span:nth-child(1) {
  font-size: 16px;
  color: black;
  font-weight: 600;
  margin-bottom: 3px;
}
.shdz > p > span:nth-child(2) {
  color: black;
}
.qrdd {
  width: 100%;
  height: 70px;
}
.qrddimage1 {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}
.qrddimage1 img {
  display: flex;
  width: 50px;
  height: 5px;
}
.qrdd > p:nth-child(1) {
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-left: 5px;
}
.qrdd > p > span:nth-child(1) {
  font-size: 16px;
  color: black;
  font-weight: 600;
  margin-bottom: 3px;
}
.qrdd > p > span:nth-child(2) {
  color: black;
}
.accounts {
  width: 100%;
  background-color: white;
  margin-bottom: -50px;
}
</style>