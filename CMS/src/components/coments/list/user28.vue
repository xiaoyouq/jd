<template>
  <div>
    <div class="user28Index">
      <el-button @click="fh">返回上一页</el-button>
      <h2 style="margin-top:20px;">订单详情</h2>
      <van-steps :active="active">
        <van-step v-for="(item,index) in listS" :key="index">{{item.name}}</van-step>
      </van-steps>
      <p>
        订单现状：
        <span class="borderW">{{listS[active].name}}</span>
      </p>
      <div class="mjxx">
        <p>
          买家账号：
          <span class="borderW">{{date.iphone}}</span>
        </p>
        <p>
          卖家信息：
          <span class="borderW">{{date.sort}}旗舰店</span>
        </p>
      </div>
      <p>
        下单时间：
        <span class="borderW">{{date.create_time |times}}</span>
      </p>
      <P>
        买家留言：
        <span>{{date.liuyan | ly}}</span>
      </P>
      <p>
        订单编号：
        <span class="borderW">{{date._id}}</span>
      </p>
      <el-button @click="putHuo" :disabled="flag">{{buttonmessage}}</el-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Step, Steps } from "vant";
import { Toast } from "vant";
Vue.use(Toast);
Vue.use(Step).use(Steps);
Vue.filter("times", function(el) {
  var c = parseInt(el);
  var date = new Date(c);
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
Vue.filter("ly", function(el) {
  if (el == "") {
    return "买家没有留言！这是对卖家最好的信任！";
  } else {
    return el;
  }
});
export default {
  data() {
    return {
      date: this.$route.query,
      active: 0,
      listS: [
        { name: "买家下单" },
        { name: "商家发货" },
        { name: "商家提货并检验" },
        { name: "交易完成" },
        { name: "商品评论" }
      ],
      flag: false,
      buttonmessage: "卖家发货"
    };
  },
  methods: {
    putHuo() {
      Toast.loading({
        message: "智能发货中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 2000
      });
      var a = { iphone: this.date.iphone, _id: this.date._id };
      this.axios.post("/api/jdfhnbx4", a).then(data => {
        console.log(data);
        if (data) {
          setTimeout(() => {
            this.flag = true;
            this.buttonmessage = "卖家已发货";
            this.active = 1;
            Toast.success('发货成功！');
          }, 1100);
        }
      });
      console.log("ok", a);
    },
    fh(){
      this.$router.go(-1)
    }
  },
  created() {
    console.log(this.$route.query);
    if(this.$route.query.x2 == true){
       this.flag = false;
      this.active = 3;
      this.buttonmessage = "买家已签收,暂未评论";
      this.flag = true;
      return
    } else if (this.$route.query.x3 == true) {
      this.active = 4;
      this.buttonmessage = "订单已完成";
      this.flag = true;
    } else if (this.$route.query.x4) {
      this.active = 1;
      this.buttonmessage = "卖家已发货";
      this.flag = true;
    } else if (this.$route.query.x1 == true && this.$route.query.x4 == true) {
      this.flag = false;
      this.active = 0;
      this.buttonmessage = "卖家发货";
      return
    }

  }
};
</script>

<style scoped>
.user28Index {
  margin-top: 20px;
  width: 80%;
  margin: 0 auto;
}
.mjxx {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
.borderW {
  color: red;
  font-weight: 600;
}
</style>