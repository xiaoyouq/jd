<template>
  <div class="carlist" id="dody">
    <div class="Top" :style="note"></div>
    <ul
      class="carList1"
      ref="heights"
      v-infinite-scroll="load"
      :infinite-scroll-immediate-check="true"
      :infinite-scroll-immediate="false"
    >
      <li
        class="class1"
        id="scrollTp"
        @click="userIndex(item)"
        v-for="(item,index) in list"
        :key="index"
      >
        <img class="jdsx" :src="item.picture[0].picture" alt />
        <span>
          <img v-if="item.picture.length>4" :src="image4" alt />
          <img v-else class="jdcss" :src="image5" alt />
          {{item.utitle}}
        </span>
        <p class="newcalssP">
          <span>
            ￥
            <span class="nbp">{{item.ratepreice}}</span>
          </span>
          <span>拼购</span>
          <img v-if="ta =='gwc'" class="gwccc" :src="image6" alt />
          <span v-else class="kxs">看相似</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import Vue from "vue";
import { Toast } from "vant";
import { Overlay } from "vant";
Vue.use(Overlay);
export default {
  props: ["ta"],
  data() {
    return {
      image3: require("../assets/jdBackground/fw1.jpg"),
      image4: require("../assets/iconfont/jdzy.png"),
      image5: require("../assets/iconfont/jdcs.png"),
      image6: require("../assets/iconfont/gwc.png"),
      note: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/wntj.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      list: [],
      num: 0,
      num1: 0,
      num2: 0,
      disabled1: false,
      disabled2: true,
      scFlag: false,
      dws: false
    };
  },
  created() {
    // this.$axios.get('/api/getnb?iphone?='+this.$cookies.get('userInfoCode').iphone).then(data=>{
    //   console.log(data)
    // })
    if (this.$store.state.carList.length >= 1) {
      this.disabled2 = false;
      this.disabled1 = true;
      this.list = this.$store.state.carList;
    } else {
      this.$axios.get("/api/newList").then(data => {
        var list = [];
        data.data.data.forEach(element => {
          if (element.sort == "xsqg" || element.sort == "百雀羚") {
            return list.push(element);
          }
        });
        this.list = list;
      });
    }
  },
  mounted() {
    // window.addEventListener("scroll", this.windowScroll);
  },
  methods: {
    userIndex(item) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 550
      });
      if (this.$cookies.get("userInfoCode")) {
        this.$axios
          .post("/api/zuji", {
            iphone: this.$cookies.get("userInfoCode").iphone,
            data: item
          })
          .then(data => {
            // console.log(data)
          });
        this.$axios
          .post("/api/getGoodsCollections", {
            useri: this.$cookies.get("userInfoCode").iphone,
            utitle: item.utitle
          })
          .then(data => {
            if (data.data.data) {
              this.scFlag = false;
            } else {
              this.scFlag = true;
            }
          });
      }
      setTimeout(el => {
        this.$router.push({
          path: "/cars",
          query: { data: item, ins: this.scFlag }
        });
      }, 600);
    },

    // 加载更多
    load(el) {
      if (this.disabled2 == false) {
        return Toast("就这些啦...");
      }
      if (this.disabled1 == false) {
        var list = [];
        Indicator.open({
          text: "努力加载中...",
          spinnerType: "double-bounce"
        });
        this.disabled1 = true;
        this.$axios.get("/api/newList").then(data => {
          console.log(data);
          data.data.data.forEach(element => {
            if (element.sort != "xsqg" && element.sort != "百雀羚") {
              setTimeout(ele => {
                console.log(list, ele);
                this.dws = true;
                return list.push(element);
              }, 500);
            }
          });
        });
          setTimeout(() => {
            setTimeout(ele => {
              this.list = this.list.concat(list);
              console.log(this.list);
              this.$store.state.carList = this.list;
              Indicator.close();
              this.disabled2 = false;
            }, 300);
          }, 3000);
      }
    }
    // windowScroll() {
    //   // 滚动条距离页面顶部的距离
    //   // 以下写法原生兼容
    //   this.num =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   var b =
    //     document.documentElement.scrollHeight || document.body.scrollHeight;
    //   var c =
    //     document.documentElement.clientHeight || document.body.clientHeight;
    //   var a = parseInt(this.num);
    //   if (a + c >= b) {
    //     // console.log("ok");
    //     this.$axios.get("/api/newList").then(data => {
    //       var list = [];
    //       data.data.data.forEach(element => {
    //         if (element.sort != "xsqg" && element.sort != "百雀羚") {
    //           setTimeout(ele => {
    //             return list.push(element);
    //           }, 1000);
    //         }
    //       });
    //       Indicator.open({
    //         text: "努力加载中...",
    //         spinnerType: "fading-circle"
    //       });
    //       setTimeout(ele => {
    //         Indicator.close();
    //         Toast({
    //           message: "加载成功",
    //           position: "middle",
    //           duration: 1000
    //         });
    //         this.list = this.list.concat(list);
    //       }, 1200);
    //     });
    //   } else if (a + c == b - 1) {
    //     Toast("已经到底啦");
    //   }
    // }
  }
};
</script>

<style>
.gwccc {
  width: 23px;
  height: 23px;
}
.carlist {
  width: 95%;
  margin: 0 auto;
}
.Top {
  width: 100%;
  height: 35px;
}
.carList1 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.class1 {
  width: 49.55%;
  height: 275px;
  margin-top: 2.5px;
  background-color: white;
}
.class1 > img {
  width: 100%;
  height: 176px;
}
.class1 > span {
  display: block;
  width: 90%;
  height: 38px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 3px;
}
.class1 span img:last-child {
  width: 22px;
  height: 13px;
}
.newcalssP {
  width: 95%;
  display: flex;
  height: auto;
  height: 26px;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
}
.newcalssP span:first-child {
  color: red;
  display: flex;
  line-height: 30px;
}
.newcalssP span:nth-child(2) {
  font-size: 10px;
  padding: 2px;
  padding-bottom: 0;
  padding-top: 0;
  border: 1px solid red;
  color: red;
  margin-right: 35px;
  margin-top: 3px;
}
.newcalssP .nbp {
  font-size: 16.5px;
}
.newcalssP button {
  width: 20px;
  font-size: 10px;
}
.kxs {
  padding: 1px;
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 0;
  background-color: white;
  border: 1px solid #8b8b8b;
  font-size: 11px;
  color: black;
}
</style>