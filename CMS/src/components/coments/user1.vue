<template>
  <div class="user11">
    <h3 class="userzx">用户中心</h3>
    <!-- 头部 -->
    <div class="user">
      <div class="user1" :style="note1">
        <i class="el-icon-coordinate icon"></i>
        <p>
          <span>客户端用户</span>
          <span>{{ iphoneLenght | fwdo }}</span>
        </p>
      </div>
      <div class="user1" :style="note1">
        <i class="el-icon-user icon"></i>
        <p>
          <span>服务端用户</span>
          <span>{{ fwd | fwdo }}</span>
        </p>
      </div>
      <div class="user1" :style="note1">
        <i class="el-icon-shopping-cart-full icon"></i>
        <p>
          <span>已上线商品</span>
          <span>{{ ysx | fwdo }}</span>
        </p>
      </div>
      <div class="user1" :style="note1">
        <i class="el-icon-document-copy icon"></i>
        <p>
          <span>已上线分类</span>
          <span>{{ fl | fwdo }}</span>
        </p>
      </div>
    </div>
    <!-- 头部 end -->
    <lyb></lyb>
  </div>
</template>

<script>
import lyb from "./board1.vue";
import Vue from "vue";
Vue.filter("fwdo", el => {
  if (el <= 9) {
    return "0" + el;
  } else {
    return el;
  }
});

export default {
  data() {
    return {
      image1: require("../../assets/image/f2.jpg"),
      fwd: 0,
      fl: 0,
      ysx: 0,
      khd: 0,
      note1: {
        backgroundImage:
          "url(" + require("../../assets/image/user24image4.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      iphoneLenght:0
    };
  },
  methods: {},
  created() {
      this.axios.get("/api/iphoneUserIN").then(data => {
      console.log(data);
      this.iphoneLenght = data.data.data.length;
    });
    this.axios.get("/api/userinfoget").then(data => {
      if (data.data.error_code == 200) {
        return (this.fwd = data.data.datas.length);
      } else {
        console.log("请求错误");
      }
    });

    // 请求分类数据
    this.axios.get("/api/classifyfind").then(data => {
      if (data.data.error_code == 200) {
        return (this.fl = data.data.data.length);
      }
      console.log("请求分类数据失败");
    });

    // 请求商品列表的商品
    this.axios.get("/api/newList").then(data => {
      if (data.data.error_code == 200) {
        this.$notify({
          title: "数据获取成功",
          message: "数据已全部加载完毕",
          type: "success",
          duration: 2200
        });
        return (this.ysx = data.data.data.length);
      }
      console.log("请求分类数据失败");
    });
  },
  components: {
    lyb: lyb
  }
};
</script>

<style>

.el-notification.right {
  padding: 0;
  color: black;
  margin-top: 46px;
}
.right p {
  color: black;
}
.el-notification__icon {
  margin-top: 10px;
  margin-left: 15px;
}
.userzx {
  margin-left: 40px;
  margin-top: 20px;
}
.user {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
}
.user1 {
  width: 20%;
  background-color: white;
  height: 100px;
  display: flex;
  border-radius: 10px;
}
.user1 .icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 40px;
  margin-top: 25px;
  font-size: 40px;
}
.user1 p {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-left: 30px;
}
.user1 p span:nth-child(1) {
  margin-top: 3px;
  color: #868e96;
}
.user1 p span:nth-child(2) {
  margin-top: 2px;
  font-size: 26px;
  font-weight: 600;
}
</style>