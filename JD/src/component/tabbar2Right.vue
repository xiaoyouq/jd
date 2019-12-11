<template>
  <div class="tabbarLeft">
    <div class="bscroll" ref="bscroll1">
      <div class="bscroll-container q">
        <p class="pz">热卖类型</p>
        <transition name="ljz" mode="out-in">
          <div class="cplx" v-if="a.length >0">
            <p class="cplxp" @click="getList(item)" v-for="item in a" :key="item.id">
              <img :src="item.picture[0].picture" alt />
              <span>{{item.utitle}}</span>
            </p>
          </div>
        <p class="zwxx" v-else>暂无</p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Toast } from 'vant'
export default {
  data() {
    return {
      image1: require("../assets/jdBackground/fw1.jpg"),
      scFlag:false
    };
  },
  props: ["a"],
  methods:{
    getList(item){
            Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration:550
      });
      if(this.$cookies.get('userInfoCode')){
        this.$axios.post('/api/zuji',{iphone:this.$cookies.get('userInfoCode').iphone,data:item}).then(data=>{
            // console.log(data)
        })
        this.$axios.post('/api/getGoodsCollections',{useri:this.$cookies.get('userInfoCode').iphone,utitle:item.utitle}).then(data=>{
        if(data.data.data){
          this.scFlag = false
          }else{
          this.scFlag = true
        }
      })
      }
      setTimeout(el=>{
        this.$router.push({ path: "/cars", query: { data: item ,ins:this.scFlag} });
      },600)
    }
  },
  mounted() {
    this.$nextTick(() => {
      let bscrollDom2 = this.$refs.bscroll1;
      this.aBScroll = new BScroll(bscrollDom2, { scrollY: true, click: true });
    });
  },
};
</script>

<style scoped>
.tabbarLeft {
  width: 300px;
  height: 100%;
  position: relative;
}
.bscroll {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.q {
  width: 100%;
  height: 900px;
  background-color: white;
}
.q > p {
  font-weight: 600;
}
.pz {
  margin-top: 5px;
  font-size: 16px;
  color: black;
  margin-top: 12px;
  margin-left: 10px;
}
.cplx {
  width: 80%;
  margin-left: 9px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
.cplx img {
  width: 70px;
  height: 70px;
}
.cplxp {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: 5px;
  text-align: centerc;
}
.cplxp span {
  width: 54px;
  color: black;
  font-size: 12px;
  margin-top: 2px;
  height: 35px;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 15px;
  text-overflow: ellipsis;
}
.zwxx {
  margin-left: 113px;
  margin-top: 100px;
}
.ljz-enter,
.ljz-leave-to {
  opacity: 0;
}
.ljz-enter-active,
.ljz-leave-active {
  transition: all 0.2s ease;
}
</style>