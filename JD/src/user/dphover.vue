<template>
  <div class="header1">
    <div class="dphovers"></div>
    <div class="spdp">
      <p
        @click="itemIndex(index)"
        :class="[index==num?'redP':'']"
        v-for="(item,index) in listDP"
        :key="item"
      >{{item}}</p>
    </div>
    <p class="plnb" v-if="num == 0">
      <span>共{{list1.length}}件商品</span>
      <span style="color:red">编辑</span>
    </p>
    <p class="plnb" v-else>
      <span>您关注了{{list2.length}}个店铺</span>
      <span style="color:red">编辑</span>
    </p>
    <div v-if="num==0">
      <div class="nbpb" v-for="(item,index) in list1" :key="index">
        <img :src="item.picture[0].picture" alt />
        <div class="lookXs">
          <p>{{item.content}}</p>
          <p class="jcsc" style="margin-top:15px;">
            <span style="color:red;font-size:16px;">
              <span style="font-size:12px;">¥&nbsp;</span>129
              <span style="font-size:12px;">.00</span>
            </span>
            <span class="ckxs">查看相似</span>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="dpp" v-for="(item,index) in list2" :key="index">
        <img :src="image1" alt />
        <span class="ds">
          <span>{{item.name}}</span>
          <img style="width:28px;height:15px;" :src="image2" alt />
        </span>
      </p>
    </div>
    <p class="yijmygd">已经没有更多了~</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listDP: ["商品", "店铺"],
      num: this.$route.query.a,
      list: [],
      list1: [],
      list2: [],
      image1: require("../assets/user/jduser2.png"),
      image2: require("../assets/iconfont/jdzy.png")
    };
  },
  methods: {
    itemIndex(e) {
      console.log(e);
      this.num = e;
    }
  },
  created() {
    console.log(this.$route.query.a);
    if (this.$route.query.a == 0) {
      this.num = 0;
    } else {
      this.num = 1;
    }
    // 关注的商品
    this.$axios
      .get("/api/ggojdnb?iphone=" + this.$cookies.get("userInfoCode").iphone)
      .then(data => {
        console.log(data);
        this.list1 = data.data.data.goodsCollections;
      });
    // 关注的店铺
    this.$axios.get("/api/ggoCarDian").then(data => {
      var list = [];
      console.log(data);
      data.data.data.forEach((element, index) => {
        element.people.forEach(ele => {
          if (ele.username == this.$cookies.get("userInfoCode").username)
          ele.name = element.name
          if(ele.username == this.$cookies.get("userInfoCode").username){
            setTimeout(() => {
              list.push(ele);
              this.list2 = list;
            }, 100);
          }
        });
        //  return el.people.username==this.user.username
      });
      // var lists = [].concat(...list);
    });
  }
};
</script>

<style scoped>
.ds {
  display: flex;
  flex-direction: column;
}
.ds img {
  width: 10px;
  height: 10px;
}
.dpp {
  width: 100%;
  background-color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  color: black;
}
.dpp img {
  width: 90px;
  height: 32px;
  margin-right: 20px;
  border: 1px solid #eeeeee;
}
.yijmygd {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.ckxs {
  color: #70a7ff;
  border: #70a7ff 1px solid;
  border-radius: 15px;
  padding: 0 12px;
  font-size: 12px;
}
.jcsc {
  display: flex;
  justify-content: space-between;
}
.lookXs p:nth-child(1) {
  width: 95%;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.nbpb {
  display: flex;
  margin-top: 10px;
  padding: 10px;
  align-items: center;
  background-color: white;
}
.nbpb img {
  width: 80px;
  height: 80px;
  margin-right: 15px;
}
.plnb {
  width: 100%;
  padding: 4px 10px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: space-between;
}
.redP {
  border-bottom: 1.6px solid red;
  color: red;
}
.spdp {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  background-color: white;
}
.spdp p {
  color: black;
  font-size: 15px;
  padding-bottom: 8px;
}
.dphovers {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f7f7f7;
  z-index: -1;
}
.header1 {
  border-top: 1.8px solid #eeeeee;
  padding-bottom: -50px;
}
</style>