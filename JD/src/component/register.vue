<template>
  <div class="resgister">
      <div class="zxd"></div>
    <div class="grzc">
      <input type="number" @input="inputs(iphone)" v-model="iphone" placeholder="请输入手机号" name id />
      <p>86+</p>
    </div>
    <el-button class="caor" @click="lef" type="danger" :disabled="buttonFlag">下一步</el-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
import { Dialog } from "vant";
Vue.use(Dialog);
export default {
  data() {
    return {
      buttonFlag: true,
      iphone: "",
      zcFlag: true
    };
  },
  methods: {
    lef() {
      this.$axios.get("/api/iphones?iphones=" + this.iphone).then(data => {
        console.log(data)
        if (data.data.error_code == 201) {
          // start
          Dialog.confirm({
            title: "确认",
            message: "我们将把验证码以短信的形式发至你的手机\n" + this.iphone
          })
            .then(() => {
              // on confirm
              Toast.loading({
                message: "加载中...",
                forbidClick: true,
                loadingType: "spinner",
                duration: 1000
              });
              setTimeout(() => {
                this.$router.push({
                  name: "rep",
                  query: { iphone: this.iphone }
                });
              }, 1200);
            })
            .catch(() => {
              // on cancel
            });
            // end
        }else if(data.data.error_code == 200){
          Toast('已经注册过 请直接登录')
        }
      });
    },
    inputs(e) {
      if (e.length == 11) {
        this.buttonFlag = false;
      } else {
        this.buttonFlag = true;
      }
    },
    created() {}
  },
  components: {}
};
</script>

<style scoped>
.zxd{
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  z-index: -1;
}
.resgister {
  width: 100%;
  background-color: white;
  margin-bottom: -50px;
}
.grzc {
  width: 90%;
  height: 100px;
  display: flex;
  margin: 0 auto;
  position: relative;
  padding-top: 40px;
}
.grzc p {
  position: absolute;
  top: 49%;
  font-size: 17px;
  color: black;
  left: 5%;
}
.grzc input {
  border: none;
  border-bottom: 2px solid #f4f4f4;
  padding-left: 60px;
  font-size: 16px;
}
.caor {
  width: 90%;
  height: 50px;
  margin-left: 20px;
  border-radius: 30px;
  margin-top: 30px;
}
</style>