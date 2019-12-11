<template>
  <div class="management">
    <div class="manages">
      <p class="managesP">管理我的账号</p>
      <div class="mangesDiv">
        <p class="mangeps">当前登录</p>
        <div class="meng">
          <img :src="image1" alt />
          <p>
            <span>{{user.username1}}</span>
            <span>用户名:{{user.username}}</span>
          </p>
          <div class="yq1"></div>
          <div class="yq2"></div>
        </div>
      </div>
    </div>
    <p @click="Goshipping" class="newP newTop">
      <span>收货地址管理</span>
      <span>管理我的地址&nbsp;></span>
    </p>
    <div class="newP1">
      <p>
        <span>实名认证</span>
        <span>未实名认证&nbsp;></span>
      </p>
      <p>
        <span>修改手机号</span>
        <span>{{ user.iphone | iphoneUser }}&nbsp;></span>
      </p>
      <p>
        <span>账号密码登录</span>
        <span>定期修改更安全&nbsp;></span>
      </p>
      <p>
        <span>京东支付密码</span>
        <span>已设置&nbsp;></span>
      </p>
      <p>
        <span>关联邮箱</span>
        <span>未设置&nbsp;></span>
      </p>
      <p>
        <span>关联账号</span>
        <span>&nbsp;></span>
      </p>
    </div>
    <div class="newP1">
      <p>
        <span>联系客服</span>
        <span>及时解答用户疑难&nbsp;></span>
      </p>
      <p>
        <span>切换站点</span>
        <span>及时解答用户疑难&nbsp;></span>
      </p>
    </div>
    <div class="jdhkd">
      <p v-for="(item,index) in list" @click="tcdl(index)" :key="index">
        <img :src="item.image1" alt />
        <span>{{item.title}}</span>
      </p>
    </div>
    <img class="footer" :src="image" alt />
  </div>
</template>

<script>
import Vue from 'vue'
Vue.filter('iphoneUser',function(el){
  var c= el.toString()
  var b = c.substring(0,3)
  var v = c.substring(8,11)
  return b+'*****'+v
})
import {Toast} from 'vant'
export default {
  data() {
    return {
      user: {},
      image1: require("../assets/jdBackground/userIndexPictrue.png"),
      list: [
        { title: "意见反馈", image1: require("../assets/user/yjfk.png") },
        { title: "京东客户端", image1: require("../assets/user/jdkhd.png") },
        { title: "退出登录", image1: require("../assets/user/tcdl.png") }
      ],
      image: require("../assets/user/jduser.png")
    };
  },
  created() {
    this.user = this.$cookies.get("userInfoCode");
  },
  methods: {
    Goshipping(){
      this.$router.push({name:'goShipping'})
    },
    tcdl(e) {
      if (e == 2) {
        this.$cookies.remove("username");
        this.$cookies.remove("userInfoCode");
        Toast.loading({
          message: "退出中...",
          forbidClick: true,
          loadingType: "spinner",
          duration:1000
        });
        var c = Date.now()
        this.$axios.get('/api/userEndTie?c='+this.user.iphone).then(data=>{
          console.log(data)
        })
        setTimeout(()=>{
        Toast.success('退出成功！');
          this.$router.push({ name: "index1" });
            window.location.reload(); 
        },1200)
      }
    }
  }
};
</script>

<style scoped>
.management {
  width: 100%;
  overflow: hidden;
  background-color: #f7f7f7;
  margin-bottom: -50px;
}
.manages {
  width: 100%;
  height: 148px;
  background-color: white;
  border-top: 2px solid #eeeeee;
}
.managesP {
  color: black;
  width: 90%;
  margin: 0 auto;
  font-size: 16px;
  margin-top: 15px;
}
.mangesDiv {
  width: 92%;
  height: 85px;
  background-color: #fff9f9;
  border: 1.5px solid #f4a1a2;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
}
.mangeps {
  width: 80px;
  font-size: 12px;
  color: #e2231a;
  padding: 1px 0;
  border-radius: 30px;
  background-color: #ffe4e4;
  position: absolute;
  right: -3%;
  border-top-left-radius: 0%;
  padding-left: 10px;
  align-items: center;
}
.meng {
  display: flex;
  align-items: center;
  margin-left: 21px;
  margin-top: 16px;
}
.meng img {
  width: 50px;
  height: 50px;
}
.meng p {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}
.meng p > span:nth-child(1) {
  color: black;
  font-size: 12px;
}
.meng p > span:nth-child(2) {
  margin-top: 10px;
  font-size: 12.5px;
}
.yq1 {
  position: absolute;
  width: 52px;
  height: 52px;
  bottom: -25px;
  right: -23px;
  border-radius: 100%;
  background-color: #ffa9a9;
  opacity: 0.3;
}
.yq2 {
  position: absolute;
  bottom: 11px;
  right: 21px;
  width: 13px;
  height: 13px;
  background: transparent;
  border-radius: 100%;
  border: 2px solid #ffa9a9;
  opacity: 0.3;
}
.newP {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
}
.newP p {
  width: 95%;
}
.newTop {
  margin-top: 15px;
}
.newP span:first-child {
  color: black;
  font-size: 16px;
}
.newP span:last-child {
  font-size: 12px;
}
.newP1 {
  width: 100%;
  display: flex;
  margin-top: 15px;
  flex-direction: column;
  background-color: white;
}
.newP1 p {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 0;
  border-bottom: 1px solid #f3f3f3;
}
.newP1 span:first-child {
  color: black;
  font-size: 16px;
}
.newP1 span:last-child {
  font-size: 12px;
}
.jdhkd {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 20px;
}
.jdhkd p {
  font-size: 12px;
  display: flex;
}

.jdhkd img {
  width: 18px;
  height: 18px;
}
.footer {
  margin: 0 auto;
  margin-left: 100px;
}
</style>