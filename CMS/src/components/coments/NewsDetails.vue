<template>
  <div>
    <div class="news">
      <h1>{{obj.title}}</h1>
      <p class="qws">
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>{{ obj.created_time | formatDate }}&nbsp;&nbsp;&nbsp;来源：{{ obj.username }}</span>
        <span>
          <img class="photo123" :src="require('../../assets/image/ll.png')" alt />
          {{obj.message}}
        </span>
      </p>
      <hr />
      <p class="sj">{{ obj.content}}</p>
      <img v-if="length1" class="imageA"   v-lazy='obj.photos[0].picture' alt />
      <p class="sj">{{ obj.content1}}</p>
      <img v-if="length2" class="imageA" :src="obj.photos[1].picture" alt />
      <p class="sj">{{ obj.content2}}</p>
      <img v-if="length3" class="imageA" :src="obj.photos[2].picture" alt />
      <p class="sj">{{ obj.content3}}</p>
      <img v-if="length4" class="imageA" :src="obj.photos[3].picture" alt />
      <p class="sj">{{ obj.content4}}</p>
      <img v-if="length5" class="imageA" :src="obj.photos[4].picture" alt />
      <p class="sj">{{ obj.content5}}</p>
      <img v-if="length6" class="imageA" :src="obj.photos[5].picture" alt />
    </div>
    <!-- 评论 -->
    <div class="pl">
      <P class="pldzg">
        点赞过的有：
        <span v-for="item in obj.dzg" :key="item.id">&nbsp;&nbsp;{{item |qs }}&nbsp;&nbsp;</span>
      </P>
      <div class="plk">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        <el-button @click="tjan" type="danger">提交</el-button>
      </div>
    </div>

    <!-- 加载评论 -->
    <div class="jzpl">
      <h1 v-if="ff">快点来抢沙发</h1>
      <ul v-else>
        <li v-for="item in list" :key="item.id">
          <img :src="item.photo |qwe" alt />
          <p class="lip">
            <span>{{item.username}}</span>
            <span>{{item.created_time |formatDate}}</span>
          </p>
          <p class="lip2">
            <span class="dlam">哆啦A梦说</span>
            ：{{ item.content }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Lazyload } from 'mint-ui';
import { Toast } from 'mint-ui';
Vue.use(Lazyload);
Vue.filter("qs", function(value) {
  return value;
});
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
Vue.filter("formatDate", function(value) {
  //格式时间
  var len = parseInt(value);
  var date = new Date(len);
  var Y = date.getFullYear() + "年";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "月";
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var S = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var F = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var mm = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return `${Y}-${M}-${D} ${S}:${F}:${mm}`;
});
export default {
  data() {
    return {
      obj: {},
      imageA: require("../../assets/image/f1.jpg"),
      textarea: "",
      length1: false,
      length2: false,
      length3: false,
      length4: false,
      length5: false,
      length6: false,
      imageC:
        "https://rs1.huanqiucdn.cn/dp/api/images//F2-q41YQzOfho_4Ef8tKIK3c.jpg?w=1000",
      usefinfo1: {},
      ff: true,
      list: []
    };
  },
  methods: {
    tjan() {
      var li = {
        title: this.obj.title,
        content: this.textarea,
        account: this.usefinfo1.account,
        username: this.obj.username,
        photo: this.usefinfo1.photo
      };
      // li = JSON.stringify(li)
      this.axios.post("/api/disussbtn", li).then(data => {
        if (data.data.error_code == 201) {
          this.textarea = ''
          // 成功
          Toast('评论成功！')
          this.axios
            .get("/api/dismessage?utitle=" + this.obj.title)
            .then(data => {
              this.ff =false
              data.data.data =  data.data.data.sort((a, b) => a.created_time > b.created_time);
              this.list = data.data.data;
            });
        } else {
          this.$message("访问留言失败");
        }
      });
    }
  },
  created() {
    this.axios.get("/api/userinfo").then(data => {
      this.usefinfo1 = data.data.session;
    });

    this.obj = this.$route.query.data.data;
    this.axios.get("/api/dismessage?utitle=" + this.obj.title).then(data => {
      if (data.data.data.length <= 0) {
        this.ff = true;
      } else {
        this.list = data.data.data;
        this.ff = false;
      }
    });
    if (this.obj.photos.length == 1) {
      this.length1 = true;
    } else if (this.obj.photos.length == 2) {
      this.length1 = true;
      this.length2 = true;
    } else if (this.obj.photos.length == 3) {
      this.length1 = true;
      this.length2 = true;
      this.length3 = true;
    } else if (this.obj.photos.length == 4) {
      this.length1 = true;
      this.length2 = true;
      this.length3 = true;
      this.length4 = true;
    } else if (this.obj.photos.length == 5) {
      this.length1 = true;
      this.length2 = true;
      this.length3 = true;
      this.length4 = true;
      this.length5 = true;
    } else if (this.obj.photos.length == 6) {
      this.length1 = true;
      this.length2 = true;
      this.length3 = true;
      this.length4 = true;
      this.length5 = true;
      this.length6 = true;
    }
  }
};
</script>

<style scoped>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.dlam {
  color: red;
  font-weight: 600;
}
.jzpl {
  width: 54%;
  margin: 0 auto;
}
.lip2 {
  margin-left: 40px;
  margin-top: 20px;
}
.jzpl ul li {
  border: 1px solid grey;
  list-style: none;
  margin-top: 5px;
  display: flex;
}
.lip {
  display: flex;
  flex-direction: column;
  margin-top: 4px;
}
.jzpl ul li img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 10px;
}
.pldzg {
  font-weight: 600;
  border: 1px solid grey;
}
.photo123 {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.qws {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
}
.plk {
  width: 90%;
  margin: 0 auto;
  display: flex;
}
.sj {
  text-indent: 25px;
  line-height: 30px;
}
.pl {
  width: 60%;
  margin: 0 auto;
  margin-bottom: 40px;
}
.news {
  width: 60%;
  margin: 0 auto;
  margin-top: 40px;
}
.news h1 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
}
.imageA {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
  height: 480px;
  display: flex;
  margin-left: 40px;
}
</style>