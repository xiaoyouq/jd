<template>
  <div >
    <div :style="note1" class="jbzl2">
      <div class="tx">
        <img :src="userinfo.photo | photo" alt />
        <p class="txs">
          <span>用户名:{{userinfo.username}}</span>
          <span>个性签名：当飞天大猩猩</span>
        </p>
      </div>
      <div class="gxqmp">
        <p class="zdyp">
          <span>
            <el-tag>账号:</el-tag>
            &nbsp;&nbsp;&nbsp;
            {{userinfo.account}}
          </span>
          <span class="scy">
            <el-tag class="el-tag asop" type="success">名字:</el-tag>
            &nbsp;&nbsp;&nbsp;
            {{userinfo.username}}
          </span>
        </p>
        <p class="zdyp">
          <span>
            <el-tag type="info">性别:</el-tag>
            &nbsp;&nbsp;&nbsp;
            {{userinfo.gender}}
          </span>
          <span class="agenl">
            <el-tag class="asop" type="warning">年龄:</el-tag>
            &nbsp;&nbsp;&nbsp;
            {{userinfo.age}}
          </span>
        </p>

        <p class="zdyp">
          <span>
            <el-tag type="danger">生日:</el-tag>
            &nbsp;&nbsp;&nbsp;
            {{userinfo.birthday | fsDate}}
          </span>
          <span class="ahitem">
            <el-tag class="asop" type="success">爱好:</el-tag>&nbsp;&nbsp;&nbsp;
            <a
              class="ns"
              v-for="item in userinfo.lovetodo"
              :key="item.id"
            >{{item | ahlove}}</a>
          </span>
        </p>
        <p class="zdyp">
          <span>
            <el-tag type="warning">创建时间:</el-tag>
            &nbsp;&nbsp;&nbsp;
            {{userinfo.created_time | formatDate}}
          </span>
          <span class="zhycdl">
            <el-tag class="asop" type="danger">最后一次登录:</el-tag>
            &nbsp;&nbsp;&nbsp;
            {{userinfo.end_time | formatDate }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
Vue.filter('photo',function(el){
  if(el == '/public/image/headerimg.jpg' || el == ''){
      return 'http://img0.imgtn.bdimg.com/it/u=4246326797,2657995307&fm=26&gp=0.jpg' || 'http://img0.imgtn.bdimg.com/it/u=3854164330,3005590920&fm=26&gp=0.jpg'
  }else{
    return el
  }
})

Vue.filter("ahlove", function(el) {
  return el+'、'
});

Vue.filter("fsDate", function(el) {
  if (el == undefined) {
    return "2001-09-17";
  } else {
    var date = new Date(el);
    var Y = date.getFullYear() + "年";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "月";
    var D =
      date.getDate() < 10 ? "0" + date.getDate() + "日" : date.getDate() + "日";
    return `${Y}-${M}-${D}`;
  }
});

Vue.filter("formatDate", function(value) {
  if (value == undefined) {
    return "最近";
  } else {
    //格式时间
    var len = parseInt(value);
    var date = new Date(len);
    var Y = date.getFullYear();
    var M =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var S = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var F =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var mm =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return `${Y}-${M}-${D} ${S}:${F}:${mm}`;
  }
});

Vue.filter("birthday", function(i) {
  if (i == undefined) {
    return parseInt(2001-9-18) ;
  }
  return i;
});
export default {
  data() {
    return {
      note1: {
        backgroundImage:
          "url(" + require("../../../assets/image/user24image4.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "77.27% 83%",
        height: "100%",
        position: "fixed",
        width: "100%"
      },
      image1:' require("../../../assets/image/user24image.jpg")',
      userinfo: "" || this.$store.state.datass
    };
  },
  created() {
    if (this.userinfo.username == undefined) {
      this.axios.get("/api/userinfo").then(data => {
        this.$store.state.datass = data.data.session;
        this.userinfo = this.$store.state.datass;
      });
      return;
    } else {
    }
  },
  methods: {}
};
</script>

<style>
.scy {
  margin-left: 345px;
}
.agenl {
  margin-left: 342px;
}
.ahitem {
  margin-left: 232px;
}
.zhycdl {
  margin-left: 196px;
}
.zdyp {
  display: flex;
}
.el-tag {
  margin-left: 20px;
  margin-top: 15px;
}
.gxqmp p {
  width: 70%;
  margin-left: 10px;
  padding: 10px;
}
.gxqmp p span {
  font-weight: 600;
}
.jbzl2 {
  width: 100px;
}
.tx {
  width: 100%;
  border-radius: 50%;
  margin: 30px;
  display: flex;
}
.tx img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.txs {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  line-height: 35px;
}
.txs span:nth-child(1) {
  color: red;
  font-weight: 600;
}
.txs span:nth-child(2) {
  font-size: 13px;
}
</style>