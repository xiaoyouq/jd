<template>
  <div class="userIndex">
    <div class="userTop">
      <p class="userInfoImageSz" @click="management">
        <img :src="image" alt />账号管理
      </p>
      <div class="userInfoIpictute">
        <div>
          <img style="width:60px;height:60px;" :src="image1" alt />
        </div>
        <div class="userInfoIpictureLeft">
          <p class="userInfoIpictureLeftP">
            <span class="userName12">{{user.username1}}</span>
            <img class="userInFoleft4" :src="image4" alt />
            <span>
              <img :src="image5" alt />
              <span>铜牌</span>
            </span>
          </p>
          <p class="userInfoIpictureLeftP2">用户名:{{user.username}}</p>
          <p class="userInfoIpictureLeftP3">
            <span>京享值:{{user.jxz}}</span>
            <span>小白信用{{user.xbxy}}</span>
          </p>
        </div>
      </div>

      <div class="userInfoBottom" :style="note">
        <div>
          <img class="userInfoBot" :src="image3" alt />
          <span>每月五张消费券</span>
        </div>
        <span class="userInfoLjck">立即查看</span>
      </div>
    </div>

    <!-- 头部以上 -->
    <!-- 头部以下 -->
    <div class="conet1">
      <p v-for="(item,index) in shUserList" @click="routerI(index)" :key="index">
        <img :src="item.image" alt />
        <span>{{item.title}}</span>
      </p>
    </div>

    <!-- 底部 -->
    <div class="jdbt">
      <p v-for="(item,index) in jdbt" @click="redRacket(index)" :key="index">
        <span>{{item.title1}}</span>
        <span>{{item.title}}</span>
      </p>
      <p>
        <img :src="image6" alt />
        <span>我的资产</span>
      </p>
    </div>

    <!-- 收藏足迹 -->

    <div class="wdzj">
      <p @click="dphover(0)">
        <span>{{goodsCollections2}}</span>
        <span>商品收藏</span>
      </p>
      <p @click="dphover(1)">
        <span>{{goodsCollections}}</span>
        <span>店铺收藏</span>
      </p>
      <p @click="wdzj">
        <span>{{footprint}}</span>
        <span>我的足迹</span>
      </p>
    </div>
    <!-- 火车票 -->
    <div class="hcpzh">
      <p v-for="(item,index) in hcp" :key="index">
        <img :src="item.image" alt />
        <span>{{item.title}}</span>
      </p>
    </div>

    <p class="khfw">客户服务</p>
    <div class="pd"></div>
    <carList></carList>
  </div>
</template>

<script>
import carList from "../components/carlist.vue";
import { Toast } from 'vant';
export default {
  data() {
    return {
      image: require("../assets/iconfont/szVip.png"),
      image1: require("../assets/jdBackground/userIndexPictrue.png"),
      note: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/vipS.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      image3: require("../assets/iconfont/ssss.png"),
      image4: require("../assets/iconfont/xgVip.png"),
      image5: require("../assets/iconfont/tpVip.png"),
      image6: require("../assets/user/wdzc.png"),
      user: {},
      shUserList: [
        { title: "待付款", image: require("../assets/user/dfk.png") },
        { title: "待收货", image: require("../assets/user/dsh.png") },
        { title: "退换 / 售后", image: require("../assets/user/sh.png") },
        { title: "全部订单", image: require("../assets/user/qb.png") }
      ],
      jdbt: [
        { title: "京东券", title1: this.$cookies.get('userInfoCode').coupons.length },
        { title: "白条", title1: "开通有礼" },
        { title: "京豆", title1: "0" },
        { title: "红包", title1: "0" }
      ],
      hcp: [
        { title: "我的预约", image: require("../assets/user/hcp1.webp") },
        { title: "京东火车票", image: require("../assets/user/hcp2.webp") },
        { title: "应用推荐", image: require("../assets/user/hcp3.webp") },
        { title: "用户福利", image: require("../assets/user/hcp4.webp") },
        { title: "京东机票", image: require("../assets/user/hcp5.webp") },
        { title: "京东酒店", image: require("../assets/user/hcp6.webp") }
      ],
      shoucangdianpu: 0,
      goodsCollections: 0,
      goodsCollections2:0,
      footprint:0
    };
  },
  methods: {
    wdzj(){
      this.$router.push({path:'/wdzj'})
    },
    // 店铺的跳转
    dphover(e){
      this.$router.push({path:'/dphover',query:{a:e}})
    },
    routerI(e){
      console.log(e)
      this.$router.push({path:'/dfk?num='+e})
    },
    management() {
      this.$router.push({ name: "management" });
    },
    redRacket(e) {
      if (e == 3) {
        this.$router.push({ name: "redRacket" });
      } else if (e == 0) {
        this.$router.push({ name: "jdQuan" });
      }
    }
  },
  created() {
    if(this.$cookies.get("userInfoCode").shouhuodizhi.length ==0){
        Toast('新用户请先设置收货地址谢谢>账号管理>收货地址管理')
    }
      if(this.$cookies.get("userInfoCode")){
        this.user = this.$cookies.get("userInfoCode");
        this.$axios.get("/api/ggojdnb?iphone="+this.user.iphone).then(data => {
            this.goodsCollections2 = data.data.data.goodsCollections.length
            this.footprint = data.data.data.footprint.length
        });
      }
    this.$axios.get("/api/ggoCarDian").then(data => {
      var list = [];
      data.data.data.forEach((element, index) => {
        list.push(element.people);
        //  return el.people.username==this.user.username
      });
      var lists = [].concat(...list);
      var ac = 1;
        console.log(lists)
        if(lists.length ==0){
          return
        }else{
          var c = lists.find(el => {
            if (el.username == this.user.username) {
              ac++;
              return;
            }
          });
          this.goodsCollections = ac-1;
          this.$store.state.gwcAC1 = this.goodsCollections
        }
    });
  },
  components: {
    carList: carList
  }
};
</script>

<style scoped>
.userName12{
  width: 107px;
  overflow: hidden;
  height: 15px;
  line-height: 15px;
}
.pd {
  width: 100%;
  height: 15px;
}
.khfw {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: white;
  color: black;
}
.hcpzh {
  width: 100%;
  background-color: white;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
}
.hcpzh > p {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  padding: 5px 0;
}
.hcpzh > p > img {
  width: 20px;
  height: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
}
.wdzj {
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 15px;
}
.wdzj > p {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7px 0;
  color: #666666;
}
.wdzj > p > span:nth-child(1) {
  font-weight: 600;
  font-size: 16px;
}
.wdzj > p > span:nth-child(2) {
  margin-top: 6px;
  font-size: 12px;
}
</style>

<style scoped>
.jdbt {
  width: 100%;
  margin-top: 15px;
  background-color: white;
  display: flex;
  justify-content: space-around;
}
.jdbt > p {
  width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
}
.jdbt > p > span:nth-child(1) {
  color: red;
  font-size: 13px;
  margin-top: 5px;
  font-weight: 400;
}
.jdbt > p > span:nth-child(2) {
  color: black;
  font-size: 13px;
  margin-top: 5px;
}
.jdbt > p > img {
  width: 20px;
  height: 20px;
  margin-top: 7px;
}
.conet1 {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: white;
  margin-top: 15px;
  align-items: center;
}
.conet1 > p {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 0;
  font-size: 12px;
  color: #666666;
}
.conet1 > p > img {
  width: 21px;
  height: 21px;
  margin-bottom: 8px;
}
</style>

<style scoped>
.userIndex {
  width: 100%;
  background-color: #f7f7f7;
}
.userTop {
  width: 100%;
  height: 137px;
  background-color: red;
  border-radius: 0 0 300px 300px / 0 0 20px 20px;
  background: linear-gradient(90deg, #eb3c3c, #ff7459);
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(228, 57, 60, 0.4);
  overflow: hidden;
}
.userInfoImageSz {
  width: 95%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  color: #80211a;
  font-size: 12px;
  margin-bottom: 0;
}
.userInfoImageSz img {
  width: 12px;
  height: 12px;
  margin-right: 3px;
}
.userInfoIpictute {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}
.userInfoIpictute > img {
  width: 60px;
  height: 60px;
}
.userInfoBottom {
  width: 87%;
  margin: 0 auto;
  height: 37px;
  margin-top: 6px;
  display: flex;
  padding-top: 5.5px;
  color: #f9e178;
  font-size: 12px;
}
.userInfoBottom img {
  width: 57px;
  height: 12px;
  margin-left: 10px;
  margin-right: 8px;
  border-right: 1px solid #f9e178;
  padding-right: 8px;
}
.userInfoLjck {
  margin-left: 95px;
}
.userInfoBot {
  margin-bottom: -2px;
}
.userInfoIpictureLeft {
  width: 100%;
  height: 100%;
  display: flex;
  line-height: 1.5px;
  flex-direction: column;
  font-family: -apple-system, Helvetica, sans-serif;
  margin-left: 20px;
}
.userInfoIpictureLeftP {
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
}
.userInfoIpictureLeftP span:nth-child(3) {
  font-size: 10px;
  background-color: #c8483f;
  text-align: center;
  border-radius: 20px;
  padding: 3px 5px;
}
.userInFoleft4 {
  margin-left: 5px;
  margin-right: 5px;
}
.userInfoIpictureLeftP img {
  width: 12px;
  height: 12px;
}
.userInfoIpictureLeftP2 {
  margin-top: 5px;
  color: #fcc8c3;
  font-size: 13px;
}
.userInfoIpictureLeftP3 {
  margin-top: 10px;
}
.userInfoIpictureLeftP3 span {
  color: white;
  font-size: 10px;
  background-color: #c8483f;
  margin-left: 2px;
  padding: 3px;
  border-radius: 10px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
}
</style>