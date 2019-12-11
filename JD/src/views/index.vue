<template>
  <div>
    <div class="note1" :style="note">
      <!-- 引入的头部 -->
      <!-- 引入的头部 -->
      <!-- 轮播 -->
      <mt-swipe class="mint-swipe123" :auto="4000">
        <mt-swipe-item class="mints" v-for="(item,index) in list" :key="index">
          <img v-lazy="item.picture" alt />
        </mt-swipe-item>
      </mt-swipe>
      <!-- 轮播 -->
    </div>

    <div class="note2" :style="note2">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <div class="mt-swiper43">
            <p class="note2p" v-for="(item,index) in list2" :key="index">
              <span>
                <img class="note2pImage" :src="item.pictrue" alt />
                <span class="note2span">{{item.title}}</span>
              </span>
            </p>
          </div>
        </mt-swipe-item>
        <mt-swipe-item>
          <div class="mt-swiper43">
            <p class="note2p" v-for="(item,index) in list3" :key="index">
              <span>
                <img class="note2pImage" :src="item.pictrue" alt />
                <span class="note2span">{{item.title}}</span>
              </span>
            </p>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="purple">
      <img :src="pupreimg" alt />
    </div>

    <!-- 限时秒杀 -->
    <seckill></seckill>
    <!-- 限时秒杀 -->

    <!-- 新人专享 -->
    <div class="newuser">
      <div class="newuser1">
        <img :src="jiujiu1" alt />
        <img :src="jiujiu2" alt />
      </div>
    </div>

    <!-- 新人专享2 -->

    <!-- 推荐1 -->
    <div class="No1">
      <div class="no11">
        <img v-for="(item,index) in list4" :src="item.picture" :key="index" alt />
      </div>
    </div>
    <!-- end -->

    <!-- 走心推荐 -->

    <div class="zxtj1" :style="note3"></div>

    <!-- end -->

    <!-- 推荐的东西 -->
    <div class="zxtj2">
      <div class="zxtj22">
        <div class="nav4" :style="note4">
          <p>面部精华榜</p>
          <img :src="fw11" alt />
          <p>热卖尖货</p>
        </div>
        <div class="nav4" :style="note5">
          <p>含氟牙膏</p>
          <img :src="fw22" alt />
          <p>人气好物</p>
        </div>
        <div class="nav4" :style="note6">
          <p>乔迁之喜</p>
          <img :src="fw33" alt />
          <p>喜庆人家</p>
        </div>
        <div class="nav4" :style="note7">
          <p>悠闲周末</p>
          <img :src="fw44" alt />
          <p>惬意满满</p>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- 精选会场 -->

    <div class="zxtj1" :style="note8"></div>

    <!-- end -->

    <!-- 精选会场 -->
    <div class="jxhc">
      <div class="jdhc">
        <div class="jhcd" v-for="(item,index) in list5" :key="index" :style="note9">
          <img :src="item.pictrue" alt />
          <span>{{item.title}}</span>
          <p>{{item.title2}}</p>
        </div>
      </div>
    </div>

    <!-- 京东小院 -->

    <div class="zxtj1" :style="note10"></div>

    <div class="jdxy">
      <div class="jdxy1">
        <div class="jdxyTop">
          <div class="jdxyTopLeft">
            <p>在路上</p>
            <span>长途旅行</span>
            <p class="jdxyTopLeftDiv">
              <img :src="q1" alt />
              <img :src="q2" alt />
            </p>
          </div>
          <div class="jdxyTopLeft">
            <p>呵护温暖</p>
            <span>呵护你的温暖</span>
            <p class="jdxyTopLeftDiv">
              <img :src="q3" alt />
              <img :src="q4" alt />
            </p>
          </div>
        </div>

        <div class="jdxyBottom">
          <div v-for="(item,index) in list6" :key="index">
            <p>{{item.title}}</p>
            <span>{{item.title2}}</span>
            <img :src="item.pictrue" alt />
          </div>
        </div>
      </div>
    </div>
    <!-- end -->

    <!-- 每日逛逛 -->

    <div class="zxtj1" :style="note11"></div>

    <div class="mrgg">
      <div class="mrgg1">
        <div class="jdxyBottom">
          <div v-for="(item,index) in list7" :key="index">
            <p class="xcss">{{item.title}}</p>
            <span>{{item.title2}}</span>
            <img :src="item.pictrue" alt />
          </div>
        </div>
      </div>
    </div>

    <!-- end -->

    <!-- 竖向轮播 -->
    <div class="jdkb">
      <div class="jdkblb">
        <img :src="jdkb" alt />
        <div class="sxlb">
          <swiper class="swipersps" :options="swiperOption" ref="mySwiper">
            <!-- 这部分放你要渲染的那些内容 -->
            <swiper-slide class="swipers">
              <div class="swiperCon">
                <p class="overs">
                  <span class="talk">最新</span>&nbsp;&nbsp;
                  <span>华为P40将于12月正式发布，搭载鸿蒙OS亮相</span>
                </p>
              </div>
              <div class="swiperCon">
                <p class="overs">
                  <span class="talk">Hot</span>&nbsp;&nbsp;
                  <span>iPhone SE2来了！5.5英寸+A13，售价感人</span>
                </p>
                <p class="overs">
                  <span class="talk">Hot</span>&nbsp;&nbsp;
                  <span>iPhone SE2来了！5.5英寸+A13，售价感人</span>
                </p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <span class="jdkbSpan">更多</span>
      </div>
    </div>
    <!-- end -->

    <!-- 商品加载列表 -->
    <div class="newClass">
      <carList></carList>
    </div>
  </div>
</template>

<script>
import seckill from "../components/seckill.vue";
import carList from "../components/carlist.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        pagination: ".swiper-pagination",
        slidesPerView: "auto",
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 5,
        loop: true,
        speed: 1500,
        direction: "vertical",
        autoplay: {
          delay: 2000
        },
        onSlideChangeEnd: swiper => {
          //这个位置放swiper的回调方法
          this.page = swiper.realIndex + 1;
          this.index = swiper.realIndex;
        }
      },
      note: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/jdBackground.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note3: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/zxtj1.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note2: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/jdBackground2.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note4: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/fw1.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note5: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/fw2.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note6: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/fw3.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note7: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/fw4.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note8: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/jxhc.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note9: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/jdhc.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note10: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/jdxy.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note11: {
        backgroundImage: "url(" + require("../assets/gg/mrgg.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      list: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      list7: [],
      listSpan1: [
        { title: "京东超市" },
        { title: "数码电器" },
        { title: "京东服饰" },
        { title: "京东生鲜" },
        { title: "京东到家" },
        { title: "充值缴费" },
        { title: "9.9元拼" },
        { title: "领券" },
        { title: "借钱" },
        { title: "京东会员" }
      ],
      listSpan2: [
        { title: "海囤全球" },
        { title: "京东拍卖" },
        { title: "唯品会" },
        { title: "玩3C" },
        { title: "沃尔玛" },
        { title: "美妆馆" },
        { title: "京东旅行" },
        { title: "拍拍二手" },
        { title: "物流查询" },
        { title: "全部" }
      ],
      listSpan3: [
        { content: "全国民宿5折", title: "特惠酒店" },
        { content: "抢1111元神券", title: "电脑数码" },
        { content: "手机五折抢", title: "手机狂欢购" },
        { content: "领400减50", title: "运动预售" },
        { content: "边刷图边剁手", title: "花样晒图" },
        { content: "天天强五折", title: "品质家电" },
        { content: "满199减100", title: "京东超市" },
        { content: "满100减五十", title: "京东图书" }
      ],
      listSpan4: [
        { content: "海尔家电", title: "家电盛宴" },
        { content: "温暖生活", title: "增添大格调" },
        { content: "TCL", title: "TCL专区" },
        { content: "休假旅行", title: "潮流集结" }
      ],
      listSpan5: [
        { content: "免息星球", title: "白条免息购" },
        { content: "品牌闪购", title: "享品质好物" },
        { content: "品牌秒杀", title: "低价抢大牌" },
        { content: "京东直播", title: "好货即可面" },
        { content: "排行榜", title: "销量排行推荐" },
        { content: "拍拍好物", title: "iphone5折起" },
        { content: "新品首发", title: "5G新品来袭" },
        { content: "发现好货", title: "教你买买买" }
      ],
      pupreimg: require("../assets/jdBackground/purple.webp"),
      jiujiu1: require("../assets/jdBackground/jiujiu1.jpg"),
      jiujiu2: require("../assets/jdBackground/jiujiu2.jpg"),
      fw11: require("../assets/jdBackground/fw11.jpg"),
      fw22: require("../assets/jdBackground/fw22.jpg"),
      fw33: require("../assets/jdBackground/fw33.jpg"),
      fw44: require("../assets/jdBackground/fw44.jpg"),
      q1: require("../assets/gg/q1.jpg"),
      q2: require("../assets/gg/q2.jpg"),
      q3: require("../assets/gg/q3.jpg"),
      q4: require("../assets/gg/q4.jpg"),
      jdkb: require("../assets/iconfont/jdkb.jpg")
    };
  },
  created() {
    // 轮播
      if(this.$store.state.swiperq <=0){
        this.$axios.get("/api/getSwiper?title=swiper").then(data => {
          if (data.data.code == 200) {
            if(this.$store.state.swiperq.length == 0){
              this.list = data.data.data.swiperList;
              this.$store.state.swiperq =  data.data.data.swiperList
            }else{
              this.list =  this.$store.state.swiperq 
            }
          } else {
            console.log("没有找到该相关的图片");
          }
        });
      }else{
        this.list = this.$store.state.swiperq
      }
  // 轮播


    this.$axios.get("/api/getSwiper?title=no1").then(data => {
      if (data.data.code == 200) {
        this.list4 = data.data.data.swiperList;
      } else {
        console.log("没有找到该相关的图片");
      }
    });

    this.$axios.get("/api/getSwiper?title=nav10").then(data => {
      if (data.data.code == 200) {
        var obj = data.data.data.swiperList.map((item, index) => {
          return { pictrue: item.picture, title: this.listSpan1[index].title };
        });
        this.list2 = obj;
      } else {
        console.log("没有找到该相关的图片");
      }
    });

    this.$axios.get("/api/getSwiper?title=navv").then(data => {
      if (data.data.code == 200) {
        var obj = data.data.data.swiperList.map((item, index) => {
          return { pictrue: item.picture, title: this.listSpan2[index].title };
        });
        this.list3 = obj;
      } else {
        console.log("没有找到该相关的图片");
      }
    });
    this.$axios.get("/api/getSwiper?title=jxhc12").then(data => {
      if (data.data.code == 200) {
        var obj = data.data.data.swiperList.map((item, index) => {
          return {
            pictrue: item.picture,
            title: this.listSpan3[index].content,
            title2: this.listSpan3[index].title
          };
        });
        this.list5 = obj;
      } else {
        console.log("没有找到该相关的图片");
      }
    });

    this.$axios.get("/api/getSwiper?title=djxy").then(data => {
      if (data.data.code == 200) {
        var obj = data.data.data.swiperList.map((item, index) => {
          return {
            pictrue: item.picture,
            title: this.listSpan4[index].content,
            title2: this.listSpan4[index].title
          };
        });
        this.list6 = obj;
      } else {
        console.log("没有找到该相关的图片");
      }
    });

    this.$axios.get("/api/getSwiper?title=mrg").then(data => {
      if (data.data.code == 200) {
        var obj = data.data.data.swiperList.map((item, index) => {
          return {
            pictrue: item.picture,
            title: this.listSpan5[index].content,
            title2: this.listSpan5[index].title
          };
        });
        this.list7 = obj;
      } else {
        console.log("没有找到该相关的图片");
      }
    });
  },
  components: {
    seckill: seckill,
    swiper,
    swiperSlide,
    carList: carList
  }
};
</script>


<style scoped>
.newClass {
  width: 100%;
  background-color: #f0f2f5;
}
.swipersps {
  margin: 0;
  padding: 0;
}
.swipersps .swipers {
  margin-top: 0px;
}
.swiperCon {
  display: flex;
  flex-direction: column;
}
.overs {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.swipers {
  /* border: 2px solid red; */
  margin: 0;
  padding: 0;
  font-size: 13px;
  margin-top: 20px;
}
.talk {
  color: red;
}
.sxlb {
  width: 65%;
  height: 20px;
  overflow: hidden;
}
.jdkb {
  width: 100%;
  height: 42px;
  background-color: #f6f6f6;
  overflow: hidden;
}
.jdkblb {
  width: 95%;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  margin: 0 auto;
  justify-content: space-between;
}
.jdkblb img {
  width: 64px;
  height: 17px;
  margin-left: 10px;
}
.jdkbSpan {
  font-size: 12px;
  border-left: 2px solid gray;
  margin-right: 6px;
}
.xcss {
  background: -webkit-linear-gradient(left, #ff2a2a, #f139d2);
  background: linear-gradient(90deg, #ff2a2a, #f139d2);
  -webkit-background-clip: text;
  color: transparent;
}
.mrgg {
  width: 100%;
  height: 315px;
  background-color: #9921c5;
  padding-bottom: 10px;
  padding-top: 10px;
}
.mrgg1 {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
}
.jdxyTopLeftDiv {
  height: 40%;
  display: flex;
}
.jdxyTopLeft {
}
.jdxyTopLeft p {
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
  margin-top: 5px;
  background: -webkit-linear-gradient(left, #45caff, #1471fb);
  background: linear-gradient(90deg, #45caff, #1471fb);
  -webkit-background-clip: text;
  color: transparent;
}
.jdxyTopLeft span {
  color: grey;
  font-size: 12px;
  margin-left: 10px;
  margin-top: 5px;
}
.jdxyTopLeft img {
  width: 60px;
  height: 60px;
  margin: 5px;
  margin-bottom: 0;
}
.jdxyBottom {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.jdxyBottom div {
  width: 24.8%;
  height: 99%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.jdxyBottom p {
  font-weight: 600;
  font-size: 16px;
  padding-bottom: 3px;
}
.jdxyBottom span {
  font-size: 12px;
  margin-bottom: 2.5px;
  color: gray;
}
.jdxyBottom img {
  width: 60px;
  height: 60px;
}
.jdxyTop {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
}
.jdxyTop div {
  width: 49.8%;
  height: 100%;
  background-color: white;
}
.jdxy {
  width: 100%;
  height: 302px;
  background-color: #9921c5;
  padding-top: 3px;
  padding-bottom: 10px;
}
.jdxy1 {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.jhcd {
  width:24%;
  height: 120px;
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.jhcd img {
  width: 63px;
  height: 63px;
  margin-top:12.5%;
}
.jhcd span {
  font-size: 9px;
  color: white;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
.jhcd p {
  color: white;
  font-size: 14px;
}
.jdhc {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.jxhc {
  width: 100%;
  height: 262px;
  background-color: #9921c5;
  padding-top: 7px;
}
.nav4 {
  width: 24%;
  height: 108%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: white; */
  border-radius: 13px;
  overflow: hidden;
}
.nav4 p:nth-child(1) {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 0;
  margin-bottom: 3px;
}
.nav4 p:last-child {
  font-size: 12px;
  color: white;
  margin-top: 2px;
}
.nav4 img {
  width: 63px;
  height: 57%;
  margin-top: 3px;
}
.zxtj22 {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.zxtj2 {
  width: 100%;
  height: 120px;
  background-color: #9921c5;
  padding-bottom: 10px;
}
.zxtj1 {
  width: 100%;
  height: 35px;
  background-color: #9921c5;
}
.No1 {
  width: 100%;
  height: 100px;
  background-color: #9921c5;
  padding-bottom: 10px;
}
.no11 {
  width: 95%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.No1 img {
  width: 32.5%;
  height: 100%;
}
.newuser {
  width: 100%;
  height: 120px;
  background-color: #9921c5;
  display: flex;
  padding-bottom: 10px;
}
.newuser1 {
  width: 94%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  border-radius: 5px;
  overflow: hidden;
}
.newuser1 img {
  width: 50%;
  height: 120px;
}
.purple {
  width: 100%;
  height: 100px;
}
.purple img {
  width: 100%;
  height: 100%;
}
.note2span {
  width: 100%;
}
.mt-swiper43 {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.note2p {
  width: 20%;
  height: 40%;
  display: flex;
  text-align: center;
  padding-bottom: 3px;
  padding-top: 5px;
  padding-left: 13.5px;
}
.note2p span:nth-child(1) {
  display: flex;
  flex-direction: column;
}
.note2p span:last-child {
  font-size: 0.75rem;
  margin-top: 4px;
}
.note2pImage {
  width: 40px;
  height: 40px;
  border-radius: 35%;
  margin-left: 5px;
}
.mints {
  background-color: gray;
}
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.note1 {
  width: 100%;
  height: 186.5px;
  margin-top: -46px;
}
.mint-swipe123 {
  width: 95%;
  height: 185px;
  margin: 0 auto;
  border-radius: 10px;
  padding-top: 44px;
}
.mint-swipe123 img {
  width: 100%;
  height: 100%;
}
.note2 {
  width: 100%;
  height: 162px;
}
</style>