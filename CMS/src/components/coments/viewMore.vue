<template>
  <div class="lyb">
    <el-tag type="warning" class="lybs">留言板</el-tag>
    <hr />
    <ul class="lybul" v-if="flags">
      <li @click="browse(item)" v-for="(item,index) in list" :key="index">
        <h2>{{item.title}}</h2>
        <a class="lyba">
          <span>{{item.content}}</span>
            <span class="lybahr" v-if="index<3">火热</span>
        </a>
        <div class="dz12">
          <p>
            <img class="photo12" :src="item.photo | qwe" alt />
            <span>{{item.username}}</span>
          </p>
          <p class="lybpp">
            <span class="q">
              <img
                @click.stop="likes(item)"
                class="photo123"
                :src="require('../../assets/image/dz3.png')"
                alt
              />
              {{item.dzg.length -1}}
            </span>
            <span>
              <img class="photo123" :src="require('../../assets/image/ll.png')" alt />
              {{ item.message }}
            </span>
          </p>
        </div>
      </li>
    </ul>
    <h1 v-else>快点来留言吧</h1>
    <!-- 加载更多 -->
    <div class="jzgdboard">
      <el-button type="success" @click="qwe123">发表留言</el-button>
      <el-button type="danger" @click="viewMore">查看更多</el-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Vue from "vue";
Vue.filter("qwe", function(el) {
  if (el == "/public/image/headerimg.jpg" || el == "") {
    return (
      "http://img0.imgtn.bdimg.com/it/u=4246326797,2657995307&fm=26&gp=0.jpg" ||
      "http://img0.imgtn.bdimg.com/it/u=3854164330,3005590920&fm=26&gp=0.jpg"
    );
  } else {
    return el;
  }
});
export default {
  data() {
    return {
      list: [],
      flags: true,
      account: "",
      dz:true
    };
  },
  methods: {
    // 查看更多
    viewMore() {
      this.$router.push({ name: "viewMore" });
    },
    //  浏览
     browse(data) {
      this.axios.post("/api/NewsDetails", data).then(data => {
        if (data.data.error_code == 201) {
          this.axios.get("/api/newListboard").then(data => {
            this.list = data.data.data;
            this.$store.state.lylbqq = data.data.data;
          });
          this.$router.push({ name: "NewsDetails", query: data });
        } else {
            this.axios.get("/api/newListboard").then(data => {
                  this.list = data.data.data;
                  this.$store.state.lylbqq = data.data.data;
                });
          this.$message("找不到该资源");
        }
      });
    },
    // 点赞
    likes(a) {
      var that = this;
      this.axios.get("/api/userinfo").then(data1 => {
        if (data1.data.error == 200) {
          that.account = data1.data.session.account;
          this.axios
            .get("/api/discussdz?title=" + a.title + "&account=" + that.account)
            .then(data2 => {
              if (data2.data.error_code == 205) {
                Toast("点赞成功");
                this.dz = false
                this.axios.get("/api/newListboard").then(data => {
                  this.list= data.data.data
                  this.$store.state.lylbqq = data.data.data;
                });
              } else if (data2.data.error_code == 204) {
                this.dz = true
                Toast("已经点赞过了");
                this.axios.get("/api/newListboard").then(data => {
                  this.list= data.data.data
                  this.$store.state.lylbqq = data.data.data;
                });
              }
            });
        }
      });
    },

    qwe123() {
      this.$router.push({ name: "board" });
    }
  },
  created() {
    console.log(this.$store.state.lylbqq);
    this.list = this.$store.state.lylbqq;
    if (this.list.length <= 0) {
      this.flags = true;
    }
    this.list = this.list.sort((a, b) => b.dzg.length - a.dzg.length);
  },
  computed: {}
};
</script>

<style scoped>
.lyba span:nth-child(1){
  width: 80%;
   white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.el-button{
  padding: 15px;
}
.boarda {
  width: 41%;
  display: flex;
  justify-content: flex-end;
}
.dz12 {
  display: flex;
  justify-content: space-between;
}
.lyba {
  width: 97%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  margin-top: 7px;
  margin-bottom: 5px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.lybahr {
  background-color: red;
  color: white;
  width: 50px;
  text-align: center;
  font-size: 12px;
  border-radius: 5px;
}
.photo12 {
  width: 30px;
  height: 30px;
  border: 2px solid red;
  border-radius: 50%;
  margin-right: 7px;
}
.photo123 {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
  margin-left: 5px;
}
.dz12 {
  display: flex;
}
* {
  margin: 0;
  padding: 0;
}
.lyb {
  width: 65%;
  margin: 0 auto;
  border: 1.5px solid grey;
  margin-top: 30px;
  padding-bottom: 30px;
}
.lybs {
  width: 100px;
  text-align: center;
  font-size: 16px;
  margin-left: 420px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.lybul {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  list-style: none;
}
.lybul h2 {
    width: 95%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 600;
  font-size: 22px;
}
.lybul h2:hover{
  color: red;
}
.lybul li {
  width: 80%;
  margin-top: 10px;
}
.lybul li:hover{
  cursor: pointer;
}
.jzgdboard {
  width: 78%;
  display: flex;
  margin-top: 30px;
  justify-content: flex-end;
}
</style>