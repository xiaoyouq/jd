<template>
  <div class="wdzj1">
    <div class="wdzj"></div>
    <p class="wdzjp">
      <span>共1条记录</span>
      <span style="color:red;">编辑</span>
    </p>
    <div class="wdzj2">
      <div class="xdpt" v-for="(item,index) in list" :key="index">
        <img :src="item.picture[0].picture" alt />
        <p class="pasd">{{item.content}}</p>
        <p class="p23" style="color:red">
          <span>¥</span>
          <span>{{item.ratepreice}}</span>
          <!-- <span>.00</span> -->
        </p>
        <img style="width:25px;height:25px;margin-left:140px" class="gwc" :src="image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      image:require('../assets/iconfont/gwc.png')
    };
  },
  created() {
    this.$axios
      .get("/api/ggojdnb?iphone=" + this.$cookies.get("userInfoCode").iphone)
      .then(data => {
        console.log(data);
        this.list = data.data.data.footprint;
      });
  }
};
</script>

<style scoped>
.gwc{
  display: flex;
  justify-content: flex-end;
}
.p23{
  width: 90%;
  margin: 0 auto;
  margin-top: 5px;
}
.xdpt {
  width: 47%;
  height: 282px;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
}
.xdpt img {
  width: 100%;
  height: 182px;
}
.pasd {
  width: 90%;
  margin: 0 auto;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.wdzj2 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.wdzjp {
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  color: black;
}
.wdzj1 {
  margin-bottom: -50px;
  border-top: 1.5px solid #eeeeee;
}
.wdzj {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f7f7f7;
  z-index: -1;
}
</style>