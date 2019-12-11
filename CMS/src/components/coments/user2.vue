<template>
  <div class="user2">
    <h1 class="khds">消息处理中心</h1>
    <!-- 内容 框架的构建 -->
    <div class="nav">
      <div class="ltLeft" ref="bscroll">
        <div>
          <!-- 循环的列表 -->
          <div
            class="bscroll-container ltfor"
            :class="[num == index?'back':'']"
            v-for="(item,index) in valueArr"
            :key="index"
            @click="xhlist(item,index)"
          >
            <img :src="image1" alt />
            <p>
              <span>
                <span>{{item.username | usernames}}</span>
                <span>{{item.lt[item.lt.length-1].create_time1 | times}}</span>
              </span>
              <span>
                <span>{{item.lt[item.lt.length-1].title}}</span>
                <span style="color:white" class="spanc">{{pullNumber}}</span>
              </span>
              <span>商品:{{item.data.utitle}}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 循环的列表 --end -->

      <div class="ltRight" ref="inputDiv">
        <div class="ltS">
          <div class="inputCss" v-for="(item,index) in valueArr[num].lt" :key="index">
            <p v-if="item.time" class="createD">{{item.create_time1 | times}}</p>
            <div class="inputCs1" v-else-if="item.kf">
              <p class="inputP">{{item.title}}</p>
              <img :src="image2" alt />
            </div>
            <div v-else class="inputCs2">
              <img :src="image3" alt />
              <p class="inputP1">{{item.title}}</p>
            </div>
          </div>
          <p v-if="flag2" class="inputS12">
            <span></span>上次聊到这里
            <span></span>
          </p>
          <div class="srkInput">
            <el-input class="srcinput" @keyup.native.enter="getLista" v-model="input1" placeholder></el-input>
            <el-select v-model="selectSA" @change="ea" placeholder="请选择">
              <el-option v-for="item in selectS" :key="item.title" :value="item.title"></el-option>
            </el-select>
            <el-button type="danger" @click="getLista">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
Vue.filter("usernames", function(el) {
  var a = el.slice(el.length - 5);
  var b = el.substring(0, 5);
  return b + "****" + a;
});
Vue.filter("times", function(el) {
  var c = parseInt(el);
  var date = new Date(c);
  var day = 24*60*60*1000
  var date1 = Date.now()
  var day1 = Math.floor((date1 - date)/day)
  var Y = date.getFullYear() + "年";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "月";
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var S = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var F = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var mm = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    if(day1 ==0){
    return `今天${S}:${F}`;
  }else if(day1 ==1){
    return `昨天${S}:${F}`;
  }else if(day1 ==2){
    return `前天${S}:${F}`;
  }else if(day1 ==3){
    return `三天前${S}:${F}`;
  }else if(day1 >=7){
    return `七天前${S}:${F}`;
  }else if(day1 >=30){
    return `一个月前${S}:${F}`;
  }
});
import BScroll from "better-scroll";
export default {
  data() {
    return {
      image1: require("../../assets/image/back.jpg"),
      image2: require("../../assets/image/sj.jpg"),
      image3: require("../../assets/image/userIndexPictrue.png"),
      valueArr: [],
      flag2: false,
      input1: "",
      selectS: [
        { id: 1, title: "您好  欢迎光临呦   请问有什么可以帮助您的呢?" },
        { id: 2, title: "请问有什么可以帮助您的呢?" },
        {
          id: 3,
          title:
            "欢迎咨询在线客服，本次由“个护化妆供应商客服_小泽玛利亚”为您解答，感谢您的支持！"
        }
      ],
      selectSA: "",
      num: 0,
      kjyh: null
    };
  },
  methods: {
    xhlist(e, b) {
      this.num = b;
      this.input1 = "";
      this.selectSA = "";
    },
    // 选择后清空
    ea(e) {
      this.input1 = this.selectSA;
      this.selectSA = "";
    },
    getLista() {
      console.log('ok')
      var e = this.valueArr[this.num];
      var time = Date.now();
      var data = {
        iphone: e.iphone,
        kf: true,
        create_time1: time,
        title: this.input1,
        username: e.username,
        tx: 1,
        sort: e.sort,
        data: e.data,
        kfts:false
      };
      var toData = {
        iphone:e.iphone,
        title1:e.data.utitle,
        title2:this.input1,
        sort:e.sort,
        tx:1,
        data:e.data
      }
      // 此处是发送消息的 
      // 在这给客户端发送一个请求 来判断用户 是否 发送了  
      this.axios.post('/api/xxts',toData).then(data=>{
        console.log(this.valueArr)
      })
      this.input1 = "";
      // this.valueArr.push(data);
      this.axios.post("/api/ltPut123", data).then(data => {
        this.valueArr = data.data.data.lt;
      });
    }
  },
  created() {
    this.axios.get("/api/lastIi1234").then(data => {
         this.valueArr= data.data.data .sort((a,b)=>{
        return b.created_time1 -a.created_time1
      })
    });
  },
  mounted() {
        this.kjyh = setInterval(() => {
          this.axios.get("/api/lastIi1234").then(data => {
            this.valueArr = data.data.data;
          });
        }, 3000);
    this.$nextTick(() => {
      this.$refs.inputDiv.scrollTop = this.$refs.inputDiv.scrollHeight;
    });
  },
  updated: function() {
    this.$nextTick(() => {
      this.$refs.inputDiv.scrollTop = this.$refs.inputDiv.scrollHeight;
    });
  },
  computed: {
    pullNumber() {
      return 0;
    }
  },
  beforeDestroy() {
    clearInterval(this.kjyh);
  }
};
</script>

<style scoped>
.back {
  background-color: #ebebeb;
}
.ltS {
  margin-bottom: 50px;
  width: 100%;
}
.srkInput {
  position: fixed;
  width: 43%;
  bottom: 12%;
  display: flex;
  background-color: white;
  z-index: 10;
  justify-content: space-between;
  border-top: 2px solid #c8c8c8;
}
.srcinput {
  width: 75%;
  margin-right: 20px;
}
.ltRight {
  width: 69%;
  height: 100%;
  overflow-y: scroll;
}
.ltRight::-webkit-scrollbar {
  display: none;
}
.spanc {
  color: white;
  padding: 0 5px;
  background-color: red;
  text-align: center;
  border-radius: 50%;
}
.ltfor {
  width: 100%;
  height: auto;
  border-bottom: 1px solid gray;
  display: flex;
  align-items: center;
  padding: 10px;
}
.ltfor img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 10px;
}
.ltfor p {
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 0;
}
.ltfor:hover {
  background-color: #f2f2f2;
}
.ltfor p span span:nth-child(1) {
  width: 62%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ltfor p span:nth-child(1) span:nth-child(2) {
  width: 30%;
  font-size: 12px;
}
.ltfor p span span:nth-child(2) {
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ltfor p span span:nth-child(2) {
  width: 10%;
  font-size: 12px;
}
.ltfor p span:nth-child(1) {
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ltfor p span:nth-child(2) {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #888888;
  font-size: 11px;
}
.ltfor p span:nth-child(3) {
  width: 85%;
  color: #888888;
  white-space: nowrap;
  overflow: hidden;
  font-size: 11px;
  text-overflow: ellipsis;
}
.ltLeft {
  width: 30%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-right: 2px solid #ebebeb;
  overflow-y: auto;
}
.ltLeft::-webkit-scrollbar {
  display: none;
}
.nav {
  width: 70%;
  height: 500px;
  border: 2px solid #c8c8c8;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24), 0 0 2px rgba(10, 16, 20, 0.12);
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.user2 {
  width: 90%;
  margin: 0 auto;
}
.khds {
  display: flex;
  justify-content: center;
}
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
</style>