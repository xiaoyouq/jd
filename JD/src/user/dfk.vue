<template>
  <div class="dfk">
    <div class="jdysS"></div>
    <div v-show="show2" style="z-Index:10" @click="show2 = false" class="zz"></div>
    <van-overlay :show="show" @click="show = false">
      <div class="ads"></div>
    </van-overlay>
    <!-- 头部 -->
    <div class="jinput">
      <div class="jdiv">
        <van-icon class="iconts" name="search" />
        <input
          class="jddinput"
          @input="inputMessag(inputMessage1)"
          v-model="inputMessage1"
          :class="[show2==true?'jinputWidth':'jinputWidth1']"
          @click="inputClick"
          placeholder="商品名称/商品订单/订单号"
          type="text"
          name
          id
        />
        <button ref="messages" @click="inputs" v-show="show2==true">{{inputMessage}}</button>
      </div>
    </div>
    <!-- 头部 -->

    <!-- 分类 -->
    <div class="fl">
      <ul @click="indexUl(index)" v-for="(item,index) in list1" :key="index">
        <li :class="[num1 == index?'red1':'']">{{item.name}}</li>
      </ul>
    </div>
    <!-- 分类、、、、 -->

    <!-- 切换的div -->
    <div class="tabbarDiv">
      <!-- 待付款》》 -->

      <div v-if="flag1">
        <div class="tabbar" v-for="(item,index) in daifukuan" :key="item.id">
          <div class="tabbars">
            <div class="tabbarsTop">
              <p>
                <img :src="image1" alt />
                <span>{{item.data.sort}}旗舰店</span>
              </p>
              <p>待付款</p>
            </div>
            <!-- 图片文字区域 -->
            <div class="tabbarsTop2">
              <img class="imagesa" v-lazy="item.data.picture[0].picture" alt />
              <p>{{item.data.content}}</p>
            </div>
            <!-- 金额区域 -->
            <p class="tabbarsp3">
              <span>共{{item.data.count}}件商品</span>&nbsp;&nbsp;应付金额:&nbsp;&nbsp;
              <span>¥{{item.data.count*item.data.ratepreice}}</span>
            </p>
            <!-- 支付确认等功能! -->
            <div class="tabbarsplce3">
              <button
                @click="qweRed1(index,item)"
                style="background:red;color:white;margin-right:10px;"
              >不想要了</button>
              <button @click="qweRed(index,item)" style="background:red;color:white">去支付</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 待收货》》 -->
      <div v-if="flag2">
        <div class="tabbar" v-for="item in daishouhuo" :key="item.id">
          <div class="tabbars">
            <div class="tabbarsTop">
              <p>
                <img :src="image1" alt />
                <span>{{item.sort}}旗舰店</span>
              </p>
              <p v-if="item.x4">待收货</p>
              <p v-else>待发货</p>
            </div>
            <!-- 图片文字区域 -->
            <div class="tabbarsTop2">
              <img class="imagesa" v-lazy="item.picture[0].picture" alt />
              <p>{{item.content}}</p>
            </div>
            <!-- 金额区域 -->
            <p class="tabbarsp3">
              <span>共{{item.count}}件商品</span>&nbsp;&nbsp;应付金额:&nbsp;&nbsp;
              <span>¥{{item.count*item.ratepreice}}</span>
            </p>
            <!-- 支付确认等功能! -->
            <div class="tabbarsplce3">
              <button style="background:red;color:white" @click="lookList(item)">物流详情</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 已完成 -->
      <div v-if="flag3">
        <div class="tabbar" v-for="item in yiwancheng" :key="item.id">
          <div class="tabbars">
            <div class="tabbarsTop">
              <p>
                <img :src="image1" alt />
                <span>{{item.sort}}旗舰店</span>
              </p>
              <p>已完成</p>
            </div>
            <!-- 图片文字区域 -->
            <div class="tabbarsTop2">
              <img class="imagesa" v-lazy="item.picture[0].picture" alt />
              <p>{{item.content}}</p>
            </div>
            <!-- 金额区域 -->
            <p class="tabbarsp3">
              <span>共{{item.count}}件商品</span>&nbsp;&nbsp;应付金额:&nbsp;&nbsp;
              <span>¥{{item.count*item.ratepreice}}</span>
            </p>
            <!-- 支付确认等功能! -->
            <div class="tabbarsplce3">
              <button style="background:red;color:white" @click="lookList(item)">查看详情</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 待评价 -->
      <div v-if="flag4">
        <div class="tabbar" v-for="item in daipingjia" :key="item.id">
          <div class="tabbars">
            <div class="tabbarsTop">
              <p>
                <img :src="image1" alt />
                <span>{{item.sort}}专卖店</span>
              </p>
              <p>待评价</p>
            </div>
            <!-- 图片文字区域 -->
            <div class="tabbarsTop2">
              <img class="imagesa" v-lazy="item.picture[0].picture" alt />
              <p>{{item.content}}</p>
            </div>
            <!-- 金额区域 -->
            <p class="tabbarsp3">
             <span>共{{item.count}}件商品</span>&nbsp;&nbsp;应付金额:&nbsp;&nbsp;
              <span>¥{{item.count*item.ratepreice}}</span>
            </p>
            <!-- 支付确认等功能! -->
            <div class="tabbarsplce3">
              <button style="background:red;color:white" @click="chkanxq(item)">去评论</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 切换的div -->
    <p class="yjmy">已经没有更多订单了</p>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
import { Toast } from "vant";
Vue.use(Toast);
import { Overlay } from "vant";
Vue.use(Overlay);
import { Icon } from "vant";
Vue.use(Icon);
import { Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      show2: false,
      inputMessage: "取消",
      inputMessage1: "",
      list1: [
        { name: "全部" },
        { name: "待付款" },
        { name: "待收货" },
        { name: "已完成" },
        { name: "待评价" }
      ],
      num1: 0,
      image1: require("../assets/iconfont/shangdian.png"),
      list: [],
      listt: [],
      daifukuan: [],
      daishouhuo: [],
      yiwancheng: [],
      daipingjia: [],
      flag1: true,
      flag2: true,
      flag3: true,
      flag4: true
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
  methods: {
    // 去评论
    chkanxq(a){
      console.log(a)
      Toast.loading({
        message: "跳转中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1000
      });
            var d = {
        iphone: this.$cookies.get("userInfoCode").iphone,
        _id: a._id
      };
      this.$axios.post('/api/jdfhnbx6',d).then(data=>{
        console.log(data)
      })
      setTimeout(() => {
        this.$router.push({ path: "/pinglun", query: a });
      }, 1100);
    },  
    lookList(item) {
      Toast.loading({
        message: "跳转中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1000
      });
      setTimeout(() => {
        this.$router.push({ path: "/userListS", query: item });
      }, 1100);
    },
    qweRed1(a, b) {
      var a = { iphone: this.$cookies.get("userInfoCode").iphone, index: a };
      Dialog.confirm({
        title: "京东",
        message: "确定删除还没支付的商品吗？",
        confirmButtonText: "忍痛放手",
        cancelButtonText: "再想想!",
        confirmButtonColor: "red"
      })
        .then(confirm => {
          // on confirm
          Toast.loading({
            message: "删除中...",
            forbidClick: true,
            loadingType: "spinner",
            duration: 1000
          });
          setTimeout(() => {
            this.daifukuan.splice(a, 1);
            this.$axios.post("/api/bxyaoleq", a).then(data => {
            });
          }, 1100);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 待付款 前去付款
    qweRed(a, b) {
      var ls = {};
      this.$cookies.get("userInfoCode").shouhuodizhi.forEach(el => {
        if (el.checked == true) {
          ls = el;
        }
      });
      var data = {
        iphone: this.$cookies.get("userInfoCode").iphone,
        data: b.data,
        dizhi: ls,
        index2: a
      };
      this.$router.push({ path: "/accounts", query: data });
    },
    indexUl(e) {
      this.num1 = e;
      if (e == 0) {
        this.flag1 = true;
        this.flag2 = true;
        this.flag3 = true;
        this.flag4 = true;
      } else if (e == 1) {
        this.flag1 = true;
        this.flag2 = false;
        this.flag3 = false;
        this.flag4 = false;
      } else if (e == 2) {
        this.flag1 = false;
        this.flag2 = true;
        this.flag3 = false;
        this.flag4 = false;
      } else if (e == 3) {
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = true;
        this.flag4 = false;
      } else if (e == 4) {
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = false;
        this.flag4 = true;
      }
    },
    inputMessag(e) {
      if (e.length >= 1) {
        this.$refs.messages.style.background = "red";
        this.$refs.messages.style.color = "white";
        this.inputMessage = "搜索";
      } else {
        this.$refs.messages.style.background = "white";
        this.$refs.messages.style.color = "black";
        this.inputMessage = "取消";
      }
    },
    inputs() {
      if (this.inputMessage == "搜索") {
      } else {
        this.show2 = false;
      }
    },
    inputClick() {
      this.show2 = true;
    }
  },
  created() {
    if (this.$route.query.num == 0) {
      this.num1 = 1;
    } else if (this.$route.query.num == 1) {
      this.num1 = 2;
    } else if (this.$route.query.num == 3) {
      this.num1 = 0;
    }
    this.$axios
      .get("/api/findJdnb?iphone=" + this.$cookies.get("userInfoCode").iphone)
      .then(data => {
        var c = data.data.data;
        var b = c.receiving.concat(c.dfk);
        b.forEach(element => {
          element.dataT = element.listCar || element.data;
        });
        var list = [];
        var listFalse = [];
        b.forEach(el => {
          if (el.fnNumll2) {
            list.unshift(el);
          } else {
            listFalse.push(el);
          }
        });
        var daishouhuo1 = [];
        var yiwancheng1 = [];
        var daipingjia1 = [];
        list.forEach(el => {
          el.listCar.forEach(ell => {
            ell.dizhi = el.dizhi;
            ell.fnNumll2 = el.fnNumll2;
            ell.liuyan = el.liuyan;
            ell.thwy = el.thwy;
            ell.yhq1 = el.yhq1;
            ell.iphone = el.iphone;
            if (ell.x1 == true && ell.x2 == false) {
              daishouhuo1.unshift(ell);
            } else if (ell.x2 == true && ell.x4 == true) {
              yiwancheng1.unshift(ell);
            }
          });
        });
        yiwancheng1.forEach(el => {
          if (el.x3 == false) {
            daipingjia1.unshift(el);
          }
        });
        setTimeout(() => {
          this.daishouhuo = daishouhuo1;
          this.yiwancheng = yiwancheng1;
          this.daipingjia = daipingjia1;
          this.daifukuan = listFalse;
        }, 100);
      });
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 300);
    // 自定义加载图标
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      duration: 300
    });
    var e = this.num1;
    if (e == 0) {
      this.flag1 = true;
      this.flag2 = true;
      this.flag3 = true;
      this.flag4 = true;
    } else if (e == 1) {
      this.flag1 = true;
      this.flag2 = false;
      this.flag3 = false;
      this.flag4 = false;
    } else if (e == 2) {
      this.flag1 = false;
      this.flag2 = true;
      this.flag3 = false;
      this.flag4 = false;
    } else if (e == 3) {
      this.flag1 = false;
      this.flag2 = false;
      this.flag3 = true;
      this.flag4 = false;
    } else if (e == 4) {
      this.flag1 = false;
      this.flag2 = false;
      this.flag3 = false;
      this.flag4 = true;
    }
  }
};
</script>

<style scoped>
.jdysS {
  z-index: -1;
  width: 100%;
  height: 92.8%;
  position: absolute;
  background-color: #f7f7f7;
}
.tabbarsplce3 {
  display: flex;
  justify-content: flex-end;
}
.tabbarsplce3 button {
  width: 86px;
  height: 30px;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  padding: 0;
  margin: 0;
}
.tabbarsp3 {
  width: 100%;
  border-bottom: 1.8px solid #f6f6f6;
  padding-bottom: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.tabbarsp3 span:nth-child(1) {
  margin-right: 5px;
  font-size: 12px;
}
.tabbarsp3 span:nth-child(2) {
  margin-left: 5px;
  color: black;
  font-size: 15px;
}
.tabbarsTop2 {
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
}
.tabbarsTop2 p {
  width: 70%;
  color: black;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0;
}
.imagesa {
  margin-right: 13px;
  width: 75px;
  height: 75px;
}
.tabbarsTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tabbarsTop p:nth-child(1) span {
  color: black;
  font-size: 16px;
}
.tabbarsTop p:nth-child(1) {
  display: flex;
  align-items: center;
}
.tabbarsTop p:nth-child(2) {
  color: red;
  font-size: 14px;
}
.tabbarsTop img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.tabbarDiv {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.tabbars {
  width: 100%;
  height: 100%;
}
.tabbar {
  width: 90%;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  margin-top: 17px;
  padding: 15px;
  margin-left: 18.5px;
}
.red1 {
  border-bottom: 2px solid red;
  color: red;
}
.fl {
  width: 100%;
  background-color: white;
  display: flex;
}
.fl ul {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.fl ul li {
  padding: 10px 0;
  font-size: 14px;
}
.zz {
  width: 100%;
  height: 87%;
  margin-top: 12%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
}
.jinput {
  background-color: white;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  border-top: 1.5px solid #eaeaea;
}
.jinputWidth {
  width: 75%;
}
.jinputWidth1 {
  width: 90%;
}
.jddinput {
  height: 30px;
  border-radius: 30px;
  background-color: #f7f7f7;
  border: none;
  margin-top: 14px;
  color: black;
  font-size: 14px;
  line-height: 30;
  margin-left: 10px;
  padding-left: 35px;
}
.dfk {
  margin-bottom: -50px;
  background-color: #f7f7f7;
  border-top: 1.5px solid #eaeaea;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.ads {
  width: 100%;
  height: 100%;
  background-color: white;
}
.ads2 {
  width: 100%;
  margin-top: 20%;
}
.jdiv {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.jdiv button {
  width: 15%;
  height: 30px;
  font-size: 14px;
  padding: 0;
  margin: 0;
}
.iconts {
  position: absolute;
  left: 9%;
  top: 30%;
}
.yjmy {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>