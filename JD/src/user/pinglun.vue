<template>
  <div class="pls">
    <div class="pls1"></div>
    <div class="jdGw">
      <img :src="im1" alt />
    </div>
    <!-- 此处评论 -->
    <div class="divP">
      <p class="pl">此处评论</p>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
    </div>

    <!-- 此处上传图片 -->
    <div class="uppicture">
      <p>晒图片有惊喜哦!</p>
      <van-uploader
        style="margin-right:20px;"
        v-model="listA"
        :max-count="6"
        :after-read="afterRead"
      />
    </div>

    <!-- 此处评分 -->
    <div class="spzl">
      <p>
        <span>商品质量</span>
        <van-rate v-model="value1" :size="23" color="#F5A623" void-icon="star" void-color="#eee" />
      </p>
      <p>
        <span>送货速度</span>
        <van-rate v-model="value2" :size="23" color="#F5A623" void-icon="star" void-color="#eee" />
      </p>
      <p>
        <span>配送员服务</span>
        <van-rate v-model="value3" :size="23" color="#F5A623" void-icon="star" void-color="#eee" />
      </p>
    </div>

    <!--提交 -->
    <el-button class="elbuton" @click="tjButton" type="danger">提交</el-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Uploader, Toast } from "vant";
Vue.use(Uploader);
import { Rate } from "vant";
Vue.use(Rate);
export default {
  data() {
    return {
      im1: require("../assets/user/jduser2.png"),
      textarea: "",
      listA: [],
      listB: [],
      value1: 0,
      value2: 0,
      value3: 0,
      date: this.$route.query
    };
  },
  methods: {
    tjButton() {
      var time = Date.now();
      if (this.textarea == "") {
        return Toast("评论不能为空");
      }
      if (this.value1 == 0 || this.value2 == 0 || this.value3 == 0) {
        return Toast("星星也不能为空哦！");
      }
      var data = {
        iphone: this.date.iphone, //评论的手机号
        sort: this.date.sort, //分类
        utitle: this.date.utitle, //商品的名字
        spzl: this.value1, //商品员星星
        shzl: this.value2, //送货员星星
        psyzl: this.value3, //配送员星星
        neirong: this.textarea, //评论的内容
        tu: this.listA, //上传的图
        time: time, //发表评论的时间
        huifu: [], //回复
        touxiang: this.$cookies.get("userInfoCode").picture, //头像
        username: this.$cookies.get("userInfoCode").username
      };
      var d = {
        iphone: this.$cookies.get("userInfoCode").iphone,
        _id: this.date._id
      };
      this.$axios.post('/api/jdfhnbx6',d).then(data=>{
        console.log(data)
      })
      this.$axios.post("/api/pinglunB", data).then(data => {
        console.log(data);
        if (data.data.error_code == 200 || data.data.error_code == 201) {
          Toast.success({ message: "评论成功", duration: 1500 });
          setTimeout(() => {
            this.$router.replace({path:'/dfk'});
          }, 1600);
        }
      });
      console.log(data);
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
    }
  },
  created() {}
};
</script>

<style scoped>
.elbuton {
  width: 90%;
  margin-left: 5%;
  margin-top: 30px;
  background-color: red;
}
.spzl {
  width: 90%;
  margin: 0 auto;
}
.spzl p {
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}
.uppicture {
  width: 90%;
  margin: 0 auto;
}
.divP {
  width: 90%;
  margin: 0 auto;
}
.pl {
  font-size: 16px;
}
.jd {
  width: 100%;
  display: flex;
  justify-content: center;
}
.jdGw {
  width: 100%;
  display: flex;
  justify-content: center;
}
.jdGw img {
  width: 200px;
}
.pls {
  width: 100%;
  border-top: 2px solid #eeeeee;
}
.pls1 {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: white;
  z-index: -1;
}
</style>