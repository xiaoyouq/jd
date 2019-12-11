<template>
  <div>
    <div class="tabbar2">
      <div class="bscroll" ref="bscroll">
        <ul v-for="(item,index) in list" class="bscroll-container" :key="index">
          <li v-if="flag1">加载中.....</li>
          <li v-else :class="[num == index ? 'red':'']" @click="newClass($event,index,item)">{{item.sort}}</li>
        </ul>
      </div>
      <div class="right">
        <router-view :a="list2"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      list: [
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" },
        { title: "家具情趣" }
      ],
      num: 0,
      flag1:true,
      list2:[]
    };
  },
  methods: {
    newClass(event, b,c) {
      // if (event._constructed) {
      //   return true;
      // }
      this.num = b;
      this.$axios.get('/api/djms?title='+c.sort).then(data=>{
            this.list2 = data.data.data
      })
    }
  },
  created() {
    // console.log(this.$store.state.tabbar2List);
    if (this.$store.state.tabbar2List <= 0) {
      this.$axios.get("/api/classifyfind").then(data => {
        var list = [];
        data.data.data.forEach(element => {
          if (element.sort != "xsqg" && element.sort != "杂") {
            setTimeout(ele => {
              list.push(element);
              return list
            }, 500);
          }
        });
        setTimeout(ele=>{
          this.flag1 = false
           this.list = list;
           this.$store.state.tabbar2List = list;
        },700)
      });
    } else {
      this.flag1 = false
      this.list = this.$store.state.tabbar2List;
    }
  },
  mounted() {
    const options = {
      click: true,
      tap: true,
      scrollY: true,
      mouseWheel: true
    };
    this.$nextTick(() => {
      let bscrollDom = this.$refs.bscroll;
      this.aBScroll = new BScroll(bscrollDom, options);
    });
  }
};
</script>

<style scoped>
.bscroll::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.red {
  color: red;
  background-color: white;
}
.tabbar2 {
  width: 100%;
  background-color: white;
  display: flex;
  overflow: hidden;
}
.bscroll {
  width: 28%;
  height: 86%;
  overflow: hidden;
  position: relative;
  background-color: #f8f8f8;
}
.right {
  width: 70%;
  height: 86%;
  position: fixed;
  overflow: hidden;
  left: 30%;
  background-color: white;
}
.bscroll ul {
  width: 100%;
  height: 100%;
}
.bscroll ul li {
  width: 100%;
  height: 46px;
  text-align: center;
  line-height: 46px;
  font-size: 14px;
}
</style>