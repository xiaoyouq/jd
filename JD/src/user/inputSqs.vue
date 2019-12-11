<template>
  <div class="inputS">
    <div class="qsj"></div>
    <div class="back">
      <img @click="goOut" :src="image1" alt />
      <input type="text" class="inputs1" v-model="input1"/>
      <img :src="image2" alt />
    </div>
    <div class="xp">
      <p v-for="(item,index) in ad" :key="index">{{item.title}}</p>
    </div>
    <div class="xpys" v-for="(item,index) in searchs(input1)" @click="iteminS(item)" :key="index">
      <img  style="widht:120px;height:120px;margin-right:10px;"  :src="item.picture[0].picture" alt />
      <div>
        <p class="dy">{{item.content}}</p>
        <p><span style="color:red;">¥<span style="font-size:17px;">{{item.ratepreice}}</span><span>.00</span> </span></p>
        <span style="font-size:12px;color:#9D9D9D;">12万+条评价 好评率：98%</span>
        <p>{{item.sort}}旗舰店&nbsp;></p>
      </div>
    </div>
    <div class="qwe2">
      <img :src="image14" alt="">
      <p class="images">已全部加载完成...</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search } from "vant";
import { Toast } from "vant";
Vue.use(Search);
export default {
  data() {
    return {
      image1: require("../assets/iconfont/left1.png"),
      image2: require("../assets/iconfont/right1.png"),
      ad: [
        { title: "综合" },
        { title: "销量" },
        { title: "有货有先" },
        { title: "筛选" }
      ],
      input1:this.$route.query.title,
      list:[],
      list1:[],
      image14:require('../assets/user/jduser2.png'),
      flag5:false,
      scFlag:false
    };
  },
  methods: {
    iteminS(item){
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
    },
    searchs(e){
      var list = []
      this.list1.forEach(el=>{
          if(el.content.indexOf(e) != -1){
            list.unshift(el)
          }
      })
      return list
    },
    goOut() {
      this.$router.replace({path:'/input'});
    }
  },
  created() {
    this.$axios.get('/api/newList').then(data=>{
      var list = []
      this.list1 =  data.data.data
      data.data.data.forEach(element => {
          if(element.content.indexOf(this.$route.query.title) != -1){
            list.unshift(element)
            setTimeout(() => {
                this.list = list
            }, 100);
          }
      });
    })
  }
};
</script>

<style scoped>
.qsj{
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  z-index: -1;
}
.qwe2{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: white;
}
.qwe2 img{
  width: 140px;
  height: 55px;
  margin-left:30%;
}
.dy{
  width: 85%;
   text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.xpys{
  background-color: white;
  display: flex;
  padding: 5px;
  border-top: 1px solid #F2F2F2;
  border-bottom: 1px solid #F2F2F2;
}
.xp {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  justify-content: space-around;
  padding: 10px 0px;
  border-bottom: 2px solid #f7f7f7;
}
.xp p {
  margin-top: 10px;
  font-size: 16px;
  color: black;
}
.inputs1 {
  width: 75%;
  border-radius: 30px;
  margin: 0;
  height: 28px;
  background-color: #f7f7f7;
  border: none;
  font-size: 12px;
}
.inputS {
  padding-bottom: -50px;
  margin-top: 0px;
  margin-bottom: -50px;
}
.back {
  padding: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid #f7f7f7;
}
.back img {
  width: 20px;
  height: 20px;
}
</style>