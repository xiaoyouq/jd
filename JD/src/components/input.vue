<template>
  <div class="input">
    <div class="search">
      <div class="inputSearch">
        <img @click="routerGo" :src="image1" alt />
        <div class="ins">
          <input
            type="text"
            ref="inputs"
            @keyup.enter="SearchOQ"
            v-model="masg"
            placeholder="花洒套装"
            name
            id
          />
          <img :src="image3" alt />
        </div>
        <button class="buttons" @click="SearchOQ">搜索</button>
      </div>
    </div>
    <div class="lsjl" v-if="lsjl.length >=1">
      <span class="spanss">
        <span>历史记录</span>
        <span style="color:red" @click="deleteD">删除</span>
      </span>
      <div class="lj12">
        <span v-for="(item,index) in lsjl" :key="index">{{item.title}}</span>
      </div>
    </div>
    <div v-if="flag2" class="board1">
      <p class="boardP">
        <span>最近搜搜</span>
        <!-- <span @click="none">隐藏</span> -->
        <span>
          <img @click="delete1" class="hw" :src="image4" alt />
        </span>
      </p>
      <div v-if="flag2" class="rmss">
        <span
          v-for="(item,index) in listSpan"
          :key="index"
          :class="[item.length >= 3?'red':'']"
        >{{item.title}}</span>
      </div>
      <p class="blacko">已隐藏搜索发现</p>
    </div>
    <div class="board">
      <p class="boardP">
        <span>热门搜索</span>
        <span @click="none">隐藏</span>
      </p>
      <div v-if="flag1" class="rmss">
        <span
          v-for="(item,index) in listSpan1"
          :key="index"
          :class="[item.length >= 3?'red':'']"
        >{{item.sort}}</span>
      </div>
      <p class="blacko" v-else>已隐藏搜索发现</p>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      image1: require("../assets/iconfont/left1.png"),
      image2: require("../assets/iconfont/right1.png"),
      image3: require("../assets/iconfont/search.png"),
      image4: require("../assets/iconfont/delete.png"),
      listSpan: [
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" },
        { title: "媒体去问" }
      ],
      listSpan1: [],
      flag1: true,
      flag2: false,
      masg: "",
      lsjl: []
    };
  },
  methods: {
    deleteD() {
      var a = {
        iphone: this.$cookies.get("userInfoCode").iphone
      };
      this.$axios.post("/api/searchIn", a).then(data => {
        this.lsjl = [];
        Toast.success("删除成功");
      });
    },
    SearchOQ() {
      var c = { title: this.masg };

      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1000
      });
      setTimeout(() => {
        this.$router.push({ path: "/inputSqs", query: c });
        // 保存缓存
        if (this.$cookies.get("userInfoCode")) {
          var a = {
            iphone: this.$cookies.get("userInfoCode").iphone,
            message: this.masg
          };
          this.$axios.post("/api/searchInputHC", a).then(data => {
            this.lsjl = data.data.data;
          });
        }
      }, 1100);
    },
    routerGo() {
      this.$router.push({ path: "/index1" });
    },
    none() {
      this.flag1 = !this.flag1;
    },
    delete() {
      // 删除 待编辑
    }
  },
  mounted() {
    this.$refs.inputs.focus();
  },
  created() {
    if (this.$cookies.get("userInfoCode")) {
      this.$axios
        .get("/api/findJdnb?iphone=" + this.$cookies.get("userInfoCode").iphone)
        .then(data => {
          console.log(data);
          this.lsjl = data.data.data.search;
        });
    }
    if (this.flag2.length >= 1) {
      this.flag2 = true;
    }
    this.$axios.get("/api/classifyfind").then(data => {
      this.listSpan1 = data.data.data;
    });
  }
};
</script>

<style scoped>
.lj12 {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.lj12 span {
  margin: 0;
  padding: 4px;
  padding-left: 6px;
  padding-right: 6px;
  background-color: #f0f2f5;
  margin-left: 8px;
  border-radius: 3px;
  margin-top: 9px;
  text-align: center;
  font-size: 12px;
}
.spanss {
  width: 90%;
  margin: 0 auto;
  font-size: 13px;
  margin: 0 auto;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
}
.lsjl {
  width: 100%;
  background-color: white;
}
.red {
  color: red;
}
.blacko {
  text-align: center;
  line-height: 120px;
  font-size: 12px;
}
.board1 {
  background-color: white;
  padding-top: 10px;
}
.input {
  width: 100%;
  margin-top: 0;
  z-index: 99;
}
.search {
  width: 100%;
  height: 44px;
  background-color: white;
  border-bottom: 0.7px solid grey;
}
.inputSearch {
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  margin-bottom: 0;
}
.inputSearch img {
  width: 20px;
  height: 20px;
  margin: 0;
}
.ins {
  width: 80%;
  display: flex;
  align-items: center;
  position: relative;
}
.ins input {
  width: 95%;
  height: 30px;
  border-radius: 30px;
  padding-left: 35px;
  border: none;
  font-size: 13px;
  background-color: #f7f7f7;
  margin-top: 15px;
}
.ins img {
  width: 15px;
  height: 15px;
  position: absolute;
  left: 5%;
}
.buttons {
  background-color: #e93b3d;
  color: white;
  padding: 5px;
}
.board {
  width: 100%;
  height: 1000px;
  background-color: white;
  padding-top: 15px;
}
.boardP {
  width: 95%;
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  margin: 0 auto;
  padding-bottom: 6px;
}
.boardP span:nth-child(1) {
  font-size: 16px;
  color: black;
}
.boardP span:last-child {
  color: #999999;
}
.rmss {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.rmss span {
  margin: 0;
  padding: 4px;
  padding-left: 6px;
  padding-right: 6px;
  background-color: #f0f2f5;
  margin-left: 8px;
  border-radius: 3px;
  margin-top: 9px;
  text-align: center;
  font-size: 12px;
}
.hw {
  width: 17px;
  height: 17px;
}
</style>