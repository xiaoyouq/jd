<template>
  <div class="sppl">
    <div class="spplsa">
    </div>
    <div class="topP">
      <p>非常喜欢({{funNumbersq}})</p>
      <p>快递很快({{funNumbersq1}})</p>
      <p>服务到位({{funNumbersq2}})</p>
    </div>
    <div>
      <div
        class="xunhuanp"
        style="margin-top:10px;"
        v-for="(item,index) in plList"
        :key="index"
      >
        <div class="xunhaundivp">
          <p>
            <img :src="item.touxiang | imageFilter" alt />
            <span>
              <span style="color:black;font-size:12.5px;">{{item.username | usernameIphone}}</span>
              <span
                style="padding:2px;color:#E4D887;font-size:5px;background:#424241;margin-right:5px;"
              >PLUS</span>
            </span>
            <van-rate
              v-model="value"
              :size="13"
              gutter="0"
              color="#ee0a24"
              void-icon="star"
              void-color="#eee"
            />
          </p>
          <p>{{item.time | times1}}</p>
        </div>
        <!-- 这是评论的内容 -->
        <p class="plnba">{{item.neirong}}</p>
        <!-- 这是图片 -->
        <div class="zheshitupian" v-if="item.tu.length>=1">
          <img
            v-for="(item1,index1) in item.tu"
            :key="index1"
            :src="item1.content | imageContent"
            alt
          />
        </div>
        <div class="qwes" v-else>
          <img :src="im5" alt="">
          <img :src="im5" alt="">
          <img :src="im5" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plList: [],
      value:5,
      im5:require('../assets/user/gyhmytp.png')
    };
  },
  created() {
    this.$axios
      .get("/api/utitleConter?utitle=" + this.$route.query.data.utitle)
      .then(data => {
        this.plList = data.data.data.pl;
        console.log(this.plList);
      });
  },
    computed: {
    funNumbersq() {
      var c = [];
      this.plList.forEach(el => {
        if (el.spzl >= 4) {
          c.push(c);
        }
      });
      return c.length;
    },
    funNumbersq1() {
      var c = [];
      this.plList.forEach(el => {
        if (el.shzl >= 4) {
          c.push(c);
        }
      });
      return c.length;
    },
    funNumbersq2() {
      var c = [];
      this.plList.forEach(el => {
        if (el.psyzl >= 4) {
          c.push(c);
        }
      });
      return c.length;
    }
  }
};
</script>

<style scoped>
.qwes{
  display: flex;
}
.qwes img{
  margin-left: 10px;
}
.xunhuanp{
  border: 1px solid #EFEFEF;
}
.zheshitupian {
  width: 92%;
  margin: 0 auto;
}
.zheshitupian img {
  width: 80px;
  height: 80px;
  border: 1px solid #eeeeee;
  margin-right: 10px;
}
.plnba {
  width: 92%;
  margin: 0 auto;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}
.xunhaundivp {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.xunhaundivp p:nth-child(1) {
  display: flex;
  align-items: center;
}
.xunhaundivp p img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 5px;
}
.plssss {
  width: 100%;
  height: auto;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #eeeeee;
  overflow: hidden;
}
.pplss {
  margin: 0;
  padding: 0;
  width: 100px;
  padding: 3px 5px;
  font-size: 11px;
  background-color: #fdf0f0;
  color: black;
  text-align: center;
  margin-left: 15px;
  margin-top: 7px;
}
.doyoulike2 {
  padding: 10px;
  color: black;
  font-size: 16px;
  display: flex;
  justify-content: center;
}
.topP {
  display: flex;
  border-top: 2px solid #eeeeee;
}
.topP p {
  margin: 0;
  padding: 0;
  width: 100px;
  padding: 3px 5px;
  font-size: 11px;
  background-color: #fdf0f0;
  color: black;
  text-align: center;
  margin-left: 15px;
  margin-top: 7px;
}
.sppl {
  background-color: white;
  padding-bottom: -50px;
}
.spplsa {
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  z-index: -1;
}
</style>