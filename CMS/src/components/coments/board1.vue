<template>
  <div class="lyb" :style="note1">
    <el-tag type="warning" class="lybs">留言板</el-tag>
    <hr />
    <ul class="lybul">
      <li @click="browse(list[0])" v-if="flags1">
        <h2>{{list[0].title}}</h2>
        <a class="lyba">
          <span>{{list[0].content}}</span>
          <span class="lybahr">火热</span>
        </a>
        <div class="dz12">
          <p>
            <img class="photo12" :src="list[0].photo | qwe" alt />
            <span>{{list[0].username}}</span>
          </p>
          <p class="lybpp">
            <span class="q">
              <img
                @click.stop="likes(list[0])"
                class="photo123"
                :src="require('../../assets/image/dz3.png')"
                alt
              />
              {{list[0].dzg.length -1}}
            </span>
            <span>
              <img class="photo123" :src="require('../../assets/image/ll.png')" alt />
              {{ list[0].message }}
            </span>
          </p>
        </div>
      </li>
      <li @click="browse(list[1])" v-if="flags2">
        <h2>{{list[1].title}}</h2>
        <a class="lyba">
          <span>{{list[1].content}}</span>
          <span class="lybahr">火热</span>
        </a>
        <div class="dz12">
          <p>
            <img class="photo12" :src="list[1].photo | qwe" alt />
            <span>{{list[1].username}}</span>
          </p>
          <p class="lybpp">
            <span class="q">
              <img
                @click.stop="likes(list[1])"
                class="photo123"
                :src="require('../../assets/image/dz3.png')"
                alt
              />
              {{list[1].dzg.length -1}}
            </span>
            <span>
              <img class="photo123" :src="require('../../assets/image/ll.png')" alt />
              {{ list[1].message }}
            </span>
          </p>
        </div>
      </li>
      <li @click="browse(list[2])" v-if="flags3">
        <h2>{{list[2].title}}</h2>
        <a class="lyba">
          <span>{{list[2].content}}</span>
          <span class="lybahr">火热</span>
        </a>
        <div class="dz12">
          <p>
            <img class="photo12" :src="list[2].photo | qwe" alt />
            <span>{{list[2].username}}</span>
          </p>
          <p class="lybpp">
            <span class="q">
              <img
                @click.stop="likes(list[2])"
                class="photo123"
                :src="require('../../assets/image/dz3.png')"
                alt
              />
              {{list[2].dzg.length -1}}
            </span>
            <span>
              <img class="photo123" :src="require('../../assets/image/ll.png')" alt />
              {{ list[2].message }}
            </span>
          </p>
        </div>
      </li>
      <img class="imageB" :src="imageB" alt />
    </ul>
    <h1 v-if="flags4">快点来留言吧</h1>
    <!-- 加载更多 -->
    <div class="jzgdboard">
      <el-button type="success" @click="qwe123">发表留言</el-button>
      <el-button type="danger" @click="viewMore">查看更多</el-button>
    </div>
    <div class="dg">
      1
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from 'mint-ui';
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
      flags1: false,
      flags2: false,
      flags3: false,
      flags4: false,
      imageB:
        "http://img5.imgtn.bdimg.com/it/u=4120014259,878321162&fm=26&gp=0.jpg",
             note1: {
        backgroundImage:
          "url(" + require("../../assets/image/user24image4.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
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
          Indicator.open({
            text: "Loading...",
            spinnerType: "fading-circle"
          });
          setTimeout(() => {
            Indicator.close();
            this.$router.push({ name: "NewsDetails", query: data });
          }, 1500);
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
                this.axios.get("/api/newListboard").then(data => {
                  this.list = data.data.data;
                  this.list = this.list.sort(
                    (a, b) => b.dzg.length - a.dzg.length
                  );
                  this.$store.state.lylbqq = data.data.data;
                });
              } else if (data2.data.error_code == 204) {
                Toast("已经点赞过了");
                this.axios.get("/api/newListboard").then(data => {
                  this.list = data.data.data;
                  this.list = this.list.sort(
                    (a, b) => b.dzg.length - a.dzg.length
                  );
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
    this.list = this.$store.state.lylbqq;
    if (this.list.length == 1) {
      this.flags1 = true;
      this.flags2 = false;
      this.flags3 = false;
    } else if (this.list.length == 2) {
      this.flags1 = true;
      this.flags2 = true;
      this.flags3 = false;
    } else if (this.list.length >= 3) {
      this.flags1 = true;
      this.flags2 = true;
      this.flags3 = true;
    } else {
      this.flags4 = true;
    }
    this.list = this.list.sort((a, b) => b.dzg.length - a.dzg.length);
  },
  computed: {}
};
</script>

<style scoped>
.dg{
  height: 120px;
}
.imageB {
  position: absolute;
  width: 620px;
  height: 300px;
  top: 52%;
  left: 54%;
}
.lybul:hover {
  cursor: pointer;
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
  width: 95%;
  display: block;
  margin-top: 7px;
  margin-bottom: 5px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.lyba span:nth-child(1) {
  width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
  width: 95%;
  height: 450px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;
}
.lybs {
  width: 100px;
  text-align: center;
  font-size: 16px;
  margin-left: 680px;
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
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 600;
  font-size: 22px;
}
.lybul li {
  width: 40%;
  margin-top: 10px;
}
.lybul h2:hover {
  cursor: pointer;
  color: red;
}
.jzgdboard {
  width: 41%;
  display: flex;
  margin-top: 30px;
  justify-content: flex-end;
}
</style>