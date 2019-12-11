<template>
  <div class="lts" ref="inputDiv1" @click.stop="flag1 = false">
    <div class="lt" v-loading="loading"  element-loading-text="拼命加载中"></div>
    <!-- 内容部分 -->
    <div ref="inputDiv">
      <div class="inputCss" v-for="(item,index) in valueArr" :key="index">
        <p v-if="item.time" class="createD">{{item.create_time1 | times1}}</p>
        <div class="inputCs1" v-else-if="!item.kf">
          <p class="inputP">{{item.title}}</p>
          <img :src="tx" alt />
        </div>
        <div v-else-if="item.kf" class="inputCs2">
          <img :src="right1" alt />
          <p class="inputP1">{{item.title}}</p>
        </div>
      </div>
      <!-- <p class="inputS12">
        <span></span>上次聊到这里
        <span></span>
      </p>-->
      <!-- 这里是第二次要循环的地方 需要加载起来 就怎么简单 -->
      <!-- <div class="inputCss" v-for="(item,index) in valueArr" :key="index">
        <p v-if="item.time" class="createD">{{item.create_time1 | times1}}</p>
        <div class="inputCs1" v-else-if="!item.kf">
          <p class="inputP">{{item.title}}</p>
          <img :src="tx" alt />
        </div>
        <div v-else-if="item.kf" class="inputCs2">
          <img :src="right1" alt />
          <p class="inputP1">{{item.title}}</p>
        </div>
      </div>-->
    </div>
    <!-- 底部输入框部分 -->
    <div class="tabbarBottom">
      <van-icon name="volume-o" size="25" />
      <div class="inputs">
        <input v-model="inputValue" @keyup.enter="putS" @click.stop="flag1 = true" type="text" />
        <transition name="rightN">
          <img v-if="flag1" @click="putS" :src="right" alt />
        </transition>
      </div>
      <van-icon name="smile-o" size="25" />
      <van-icon color="#E95A44" size="25" name="add" />
    </div>
    <!-- 箭头 -->
  </div>
</template>

<script>
import { Toast } from "vant";
import Vue from "vue";
Vue.filter("times1", function(el) {
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
  return `${S}:${F}`;
});
export default {
  data() {
    return {
      right: require("../assets/xiaoxi/right.png"),
      right1: require("../assets/xiaoxi/sj.jpg"),
      tx: require("../assets/jdBackground/userIndexPictrue.png"),
      flag1: false,
      inputValue: "",
      valueArr: [],
      valueArr1: [],
      data: this.$route.query,
      flag2: true,
      data1: this.$cookies.get("userInfoCode"),
      numc: 0,
      nodec: false,
      loading:true
    };
  },
  methods: {
    putS() {
      if (this.inputValue == "") {
        Toast("输入框内容不能为空");
        return;
      }
      var c = { kf: false, title: this.inputValue };
      var time = Date.now();
      var data = {
        iphone: this.data1.iphone,
        kf: false,
        create_time1: time,
        title: this.inputValue,
        username: this.data1.username,
        tx: 1,
        sort: this.data.data.sort,
        data: this.$route.query.data
      };
      var data3 = {
        iphone: this.data1.iphone,
        kf: true,
        create_time1: time,
        title:
          "欢迎咨询在线客服，本次由“个护化妆供应商客服_小泽玛利亚”为您解答，感谢您的支持！",
        username: this.data1.username,
        tx: 1,
        sort: this.data.data.sort,
        data: this.$route.query.data
      };
      var data4 = { iphone: this.data1.iphone, sort: this.data.data.sort };
      if(this.nodec == true){
        this.$axios.post("/api/newItime", data4).then(data => {
          if(data.data.success == 200){
            this.nodec = false
          }
        });
      }
      setTimeout(() => {
        this.$axios.post("/api/ltPut", data).then(data => {
          this.valueArr = data.data.data.lt;
          if (data.data.data.lt.length == 2) {
            this.$axios.post("/api/ltPut", data3).then(data => {});
          }
        });
      }, 300);
      this.inputValue = "";
    }
  },
  created() {
    // 页面加载的时候 请求 第一波数据 也就是根据title还有iphone查找聊天记录
    // 第一次发消息的时候 push一个时间
    console.log(this.$route.query);
    var a = { iphone: this.data1.iphone, sort: this.data.data.sort };
    this.$axios.post("/api/listLt", a).then(data => {
      this.loading = false
      if (data.data.data.lt.length >= 3) {
        this.nodec = true;
      }
      if (data.data.data.lt) {
        this.valueArr = data.data.data.lt;
      } else {
        console.log("没有数据哦");
        this.valueArr = [];
      }
    });
    this.$store.state.clearTime = setInterval(() => {
      console.log('ok')
      this.$axios.post("/api/listLt", a).then(data => {
        if (data.data.data.lt) {
          this.valueArr = data.data.data.lt;
        } else {
          this.valueArr = [];
        }
      });
    }, 3000);
  },
  mounted() {
    this.$nextTick(() => {
      document.documentElement.scrollTop = this.$refs.inputDiv.scrollHeight;
    });
  },
  updated: function() {
    this.$nextTick(() => {
      document.documentElement.scrollTop = this.$refs.inputDiv.scrollHeight;
    });
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    }
  },
  beforeDestroy() {
    clearInterval(this.$store.state.clearTime);
  }
};
</script>

<style scoped>
.inputS12 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11.5px;
}
.inputS12 span {
  width: 65px;
  height: 1px;
  background-color: #dee1e4;
  margin-left: 10px;
  margin-right: 10px;
}
.inputCs2 {
  display: flex;
  margin-top: 10px;
}
.createD {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
.inputCs2 img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
}
.inputCs1 {
  display: flex;
  justify-content: flex-end;
}
.inputCs1 img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
}
.inputP1 {
  width: auto;
  background-color: white;
  color: black;
  padding: 8px;
  margin-left: 10px;
  border-radius: 5px;
  max-width: 78%;
}
.inputP {
  width: auto;
  background-color: #f27979;
  color: white;
  padding: 8px;
  margin-right: 10px;
  border-radius: 5px;
  max-width: 78%;
}
.inputCss {
  width: 93%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.tabbarBottom {
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0%;
  justify-content: space-between;
  padding: 0 5px;
}
.inputs {
  width: 260px;
  height: 30px;
  display: flex;
  position: relative;
  font-size: 12px;
  margin-left: 10px;
  overflow: hidden;
  border-radius: 9px;
}
.inputs input {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 45px;
}
.inputs img {
  width: 38px;
  height: 30px;
  background-color: #fc5d60;
  position: absolute;
  right: 0%;
  padding: 5px;
}
.lts {
  width: 100%;
  background-color: #f2f2f2;
}
.lt {
  width: 100%;
  height: 95%;
  position: absolute;
  z-index: -1;
  background-color: #f2f2f2;
  top: 0%;
}
.rightN-enter {
  opacity: 0;
  margin-right: 50px;
}
.rightN-leave-to {
  opacity: 0;
}
.rightN-enter-active,
.rightN-leave-active {
  transition: all 1s ease;
}
</style>