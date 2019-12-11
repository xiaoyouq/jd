<template>
  <div class="user4" :style="note">
    <div class="header">
      <div class="headerLeft">
        <ul class="headerUl">
          <li
            @click="LiActive(index)"
            :class="[index == nums?'links':'']"
            v-for="(item,index) in list"
            :key="index"
          >{{ item.title }}</li>
        </ul>
      </div>
      <div class="headerRight">
          <router-view :style="note1"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {
        backgroundImage:
          "url(" + require("../../assets/image/uuser24image2.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: "100%",
        position: "fixed",
        width: "100%"
      },
      list: [
        { title: "基本资料" },
        { title: "完善资料" },
        { title: "修改资料" },
        { title: "修改密码" },
        { title: "童年回忆" },
      ],
      nums: 0,
         note1: {
        backgroundImage:
          "url(" + require("../../assets/image/user24image4.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "77.27% 83%",
        height: "100%",
        position: "fixed",
        width: "100%"
      },
    };
  },
  created() {
  },
  methods: {
    LiActive(e) {
      this.nums = e;
      if(e == 0){
        this.$router.push({name:'jbzl'})
      }else if(e==1 ){
        this.$router.push({name:'wszl'})
      }else if(e==2 ){
        this.$router.push({name:'xgzl'})
      }else if(e==3 ){
        this.$router.push({name:'xgmm'})
      }else if(e==4 ){
        this.$router.push({name:'grxh'})
      }else if(e==5 ){
        this.$router.push({name:'sz'})
      }
    }
  }
};
</script>
<style>
.user4 {
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
.header {
  width: 85%;
  height: 600px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
}
.headerLeft {
  width: 10%;
  height: 100%;
  background-color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: 1px solid gray;
}
.headerRight {
  width: 100%;
  height: 100%;
  background-color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.headerUl {
  width: 100%;
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}
.headerUl li {
  width: 100%;
  height: 25%;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
}
.links {
  border: 1.5px solid grey;
}
</style>