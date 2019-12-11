<template>
  <div :class="[tabbar5 == 'tabbar5'?'seckill1':'seckill']">
    <div class="nav" :style="note">
      <div class="topnav">
        <div class="ms" :style="note2"></div>
        <p class="msp">8点场</p>
        <settime class="settimeout" :endTime="endTime"></settime>
        <p class="lastmapP">
          <span>更多秒杀</span>
          <img :src="image1Left" alt />
        </p>
      </div>
      <div class="bscroll" ref="bscroll">
        <ul class="bscroll-container">
          <li class="container1" v-for="item in list1" :key="item.id">
            <img class="images"  v-lazy="item.picture[0].picture" alt="">
            <span class="coat">￥{{item.ratepreice}}</span>
            <span class="price">￥{{item.preice}}</span>
          </li>
          <p class="ckgd">
              <img :src="im" alt="">
              <span>查</span>
              <span>看</span>
              <span>更</span>
              <span>多</span>
          </p>  
        </ul>
      </div>
    </div>
  </div>
  <!-- 滑块 -->
</template>

<script>
import BScroll from "better-scroll";
// const wrapper = document.querySelector('.wrapper')
// const scroll = new BScroll(wrapper)

import settime from "../components/settime.vue";
export default {
  data() {
    return {
      goods: [],
      listHeight: [],
      list1:[],
      im:require('../assets/iconfont/l.png'),
      scrollY: 0,
      endTime: "2020-08-29 8:00:00",
      note: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/jdcode2.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      note2: {
        backgroundImage:
          "url(" + require("../assets/jdBackground/jdcode.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
      image1Left: require("../assets/jdBackground/left.png")
    };
  },
  components: {
    settime: settime
  },
  methods: {
    // verScroll() {
    //   this.$nextTick(() => {
    //     if (!this.scroll) {
    //       this.scroll = new BScroll(this.$refs.bscroll, {
    //         startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
    //         click: true,
    //         scrollX: true,
    //         scrollY: false,
    //         eventPassthrough: "vertical"
    //       });
    //     } else {
    //       this.scroll.refresh(); //如果dom结构发生改变调用该方法
    //     }
    //   });
    // }
  },
  mounted() {
    this.$nextTick(() => {
      let bscrollDom = this.$refs.bscroll;
      this.aBScroll = new BScroll(bscrollDom, {scrollX:true});
    });
  },
  props:['tabbar5'],
  created(){
    if(this.$store.state.seckillList.length <=0){
      this.$axios.get('/api/djms?title=xsqg').then(data=>{
          this.list1 = data.data.data
          this.$store.state.seckillList = this.list1
      })
    }else{
      this.list1 = this.$store.state.seckillList
    }
  },
};
</script>

<style scoped>
.ckgd{
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  text-align: center;
  margin-left: 10px;
  background-color: gray;
  height: 100px;
  border-radius: 30px;
  line-height: 1.6;
}
.ckgd img{
  width: 25px;
  height: 25px;
  padding: 5px;
}
.content {
  display: flex;
  height: 100%;
}
.content li {
  width: 200px;
  height: 100%;
  list-style: none;
}
.seckill {
  width: 100%;
  height: 175px;
  background-color: #9921c5;
  padding-top: 15px;
}
.seckill1{
  background-color: #F7F7F7;
}
.nav {
  width: 95%;
  overflow: hidden;
  height: 155px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
}
.ms {
  width: 69px;
  height: 27px;
  margin-top: 6.5px;
  margin-left: 6.5px;
}
.settimeout{
  margin-top: -5px;
}
.msp {
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
  margin-right: 5px;
  margin-top: 05px;
}
.topnav {
  width: 95%;
  height: 34px;
  display: flex;
  align-items: center;
  margin-left: 3.5%;
}
.lastmapP {
  display: flex;
  font-size: 12px;
  color: red;
  margin-left:65px;
  margin-top: 6px;
  margin-right: 2px;
  justify-content: space-between;
}
.lastmapP img {
  width: 11px;
  height: 11px;
  margin-top: 4px;
}
.bscroll {
  width: 95%;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
}
.bscroll-container{
  width: 163%;
  display: flex;
  list-style: none;
}
.bscroll-container li {
  display: flex;
  margin-left: 10px;
}
.container1{
  width: 73px;
  height: 120px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.container1 img{
  width: 66px;
  height: 66px;
  margin-left: 3px;
  margin-right: 3px;
}
.coat{
  color: red;
  font-weight: 800;
  margin-top: 4px;
  font-size: 14px;
}
.price{
  font-size: 12px;
  margin-top: 3px;
  text-decoration: line-through;
}
.images{
  background-color: gray;
}
</style>