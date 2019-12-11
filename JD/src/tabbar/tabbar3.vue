<template>
  <div class="tabbar3">
    <div class="cK"></div>
    <p class="np" v-if="flag4">
      <van-icon style="margin-right:10px;" name="cross" size="20" />
      <span>打开系统通知，物流优惠等消息不错过</span>
      <span class="kq">开启</span>
    </p>
    <!-- 最新消息 -->
    <div v-if="flag4" class="tab1" v-loading="loading"  element-loading-text="首次加载需等待...">
      <p style="margin-bottom:0px;" class="tab1p">
        <img class="newImage" :src="image1" alt />
        <span>最新消息</span>
      </p>
      <!-- 内容 --- 同时也是后期需要循环地方 -->
      <div v-if="flag3">
        <div class="lt" @click="getLT(item)" v-for="(item,index) in this.$store.state.tabbar3LT" :key="index">
          <img :src="image2" alt />
          <p>
            <span>{{item.sort}}供应商客服</span>
            <span v-if="item.lt[item.lt.length-1].kf">客服：{{item.lt[item.lt.length-1].title}}</span>
            <span v-else>我：{{item.lt[item.lt.length-1].title}}</span>
          </p>
          <span style="font-size:11.5px;color:#ADADAD;">{{item.lt[item.lt.length-1].create_time1 | creatimes}}</span>
          <span style="color:white;font-size:14px;" v-if="item.num>=1" class="redFlag4">{{item.num}}</span>
        </div>
      </div>
      <div class="images3" v-else>
        <img :src="image3" alt />
        <p class="images3p">暂时没有消息</p>
      </div>
    </div>
    <div class="qnx" v-else>
      <p class="qnxdl">请您先登录</p>
      <img :src="image4" alt="">
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import { Loading } from 'vant';
Vue.use(Loading);
Vue.use(Icon);
Vue.filter("creatimes", function(el) {
  var c = parseInt(el);
  var date = new Date(c);
  var date1 = Date.now();
  var day = 24 * 60 * 60 * 1000;
  var day1 = Math.floor((date1 - date) / day);
  var Y = date.getFullYear();
  var M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var S = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var F = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var mm = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (day1 == 0 ) {
    return `今天${S}:${F}`;
  } else if (day1 == 1) {
    return `昨天${S}:${F}`;
  } else if (day1 == 2) {
    return `前天${S}:${F}`;
  } else if (day1 == 3) {
    return `三天前${S}:${F}`;
  } else if (day1 >= 7) {
    return `七天前${S}:${F}`;
  } else if (day1 >= 30) {
    return `一个月前${S}:${F}`;
  }
});
export default {
  data() {
    return {
      image1: require("../assets/xiaoxi/new.png"),
      image2: require("../assets/xiaoxi/sj.jpg"),
      image3: require("../assets/user/jduser2.png"),
      image4: require("../assets/user/jduser.png"),
      list: this.$store.state.tabbar3LT || [],
      flag3: false,
      addData: [],
      flag4:true,
      loading:true
    };
  },
  methods: {
    getLT(item) {
      console.log(item);
      var c = { iphone:item.iphone,sort:item.sort}
      this.$store.state.smdx = c
      this.$axios.post('/api/deleteAs',c).then(data=>{
        console.log(data)
      })
      this.$axios.post('/api/deleteAd',c).then(data=>{
        console.log(data)
      })
      setTimeout(() => {
        this.$router.replace({ path: "/lt", query: item });
      }, 500);
    }
  },
  created() {
      this.loading = true
    if(this.$cookies.get('userInfoCode')){
      if(this.$store.state.tabbar3LT.length>=1){
          this.loading = false
          if (this.$store.state.tabbar3LT.length >= 1) {
        this.flag3 = true;
      } else {
        this.flag3 = false;
      }
      }
      this.flag4 = true
    this.$axios.get("/api/lastIi123?iphone="+this.$cookies.get('userInfoCode').iphone).then(data => {
      this.list = data.data.data.sort((a, b) => {
        return b.created_time1 - a.created_time1;
      });
      this.$store.state.xiaoxiList = data.data.data;
      this.loading = false
      this.$store.state.tabbar3LT = data.data.data
      if (this.list.length >= 1) {
        this.flag3 = true;
      } else {
        this.flag3 = false;
      }
    });
    console.log(this.$store.state.tabbar3LT );
    if (this.$store.state.appData.length >= 1) {
      this.addData = this.$store.state.appData;
    }
    }else{
      this.flag4 = false
    }
  },
  computed:{
    full(){
      var list = []
      this.list.forEach(el=>{
        el.lt.forEach(ele=>{
          if(ele.kfts == false){
              list.push(ele)
          }else{
            console.log('awd')
          }
        })
      })
      return 0 
    }
  }
};
</script>

<style scoped>
.qnx{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top:40%;
}
.qnx p{
  font-size: 16px;
  color: #000;
}
.redFlag4 {
  width: 20px;
  height: 20px;
  padding: 3px;
  background-color: red;
  position: absolute;
  margin: 0;
  border-radius: 50%;
  text-align: center;
  right: 5%;
  top: 5%;
  line-height: 16px;
}
.images3 {
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 160px;
  padding-bottom: 160px;
}
.images3p {
  display: flex;
  justify-content: center;
}
.images3 img {
  display: flex;
  justify-content: center;
  width: 150px;
  height: 60px;
}
.lt {
  display: flex;
  align-items: center;
  padding: 12px 12px;
  border-bottom: 1px solid #f3f3f3;
  justify-content: space-around;
  position: relative;
}
.lt img {
  width: 50px;
  height: 50px;
}
.lt p {
  width: 64%;
  display: flex;
  flex-direction: column;
}
.lt span:last-child {
  color: #9a9a9a;
  font-size: 12.8px;
}
.lt p span:nth-child(1) {
  color: black;
  font-size: 16px;
}
.lt p span:nth-child(2) {
  width: 99%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kq {
  padding: 0 9px;
  background-color: #ea692e;
  border-radius: 10px;
  color: white;
  display: flex;
  margin-left: 8%;
  font-size: 11px;
  text-align: center;
}
.np {
  width: 94%;
  margin: 0 auto;
  border-radius: 13px;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 7px 5px;
  color: black;
  margin-top: 10px;
  box-shadow: 0 0 0.6px #000 inset;
}
.np span:nth-child(1) {
  color: black;
}
.tab1 {
  width: 100%;
  background-color: white;
  border-radius: 13px;
  margin-top: 10px;
  border: 1px solid #eeeeee;
}
.tab1p {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.tab1p span {
  font-weight: 600;
  font-size: 15px;
}
.tabbar3 {
  width: 100%;
  background-color: #f7f7f7;
  margin-bottom: -50px;
  border-top: 1.7px solid #eeeeee;
}
.newImage {
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  margin-right: 7px;
}
.cK {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f7f7f7;
  z-index: -1;
}
</style>