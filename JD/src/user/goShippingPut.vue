<template>
  <div class="gos">
    <!-- <van-area :area-list="areaList" confirm="qwe" :value="list" />
    <span>{{list}}</span>-->
    <div class="goShippingS">
      <label for>
        <span>收货人</span>
        <input type="text" v-model="person" placeholder="姓名" />
      </label>
      <label for>
        <span>联系方式</span>
        <input type="number" v-model="iphone" placeholder="手机号码" />
      </label>
      <label for>
        <span>所在地区</span>
        <v-distpicker :province="province" :city="city" :area="area" @selected="onSelected"></v-distpicker>
      </label>
      <label for>
        <span>详情地址</span>
        <textarea name id cols="30" v-model="Details" placeholder="详细地址需填写楼栋楼层或房间号信息" rows="10"></textarea>
      </label>
      <label for>
        <span>地址标签</span>
        <textarea name id cols="30" v-model="tags" placeholder="请填写地址标签/家/学校等等" rows="10"></textarea>
      </label>
      <label for>
        <span>是否设置为默认地址</span>
        <van-switch v-model="checked" />
      </label>
    </div>
    <button @click="Tj1" class="buttons">提交</button>
    <button @click="Tj2" class="buttons">删除</button>
  </div>
</template>

<script>
import Addres from "../assets/user/arr1.js";
import Vue from "vue";
import { Area } from "vant";
Vue.use(Area);
import { Toast } from "vant";
import VDistpicker from "v-distpicker";
import { Switch } from "vant";
Vue.use(Switch);
export default {
  data() {
    return {
      areaList: Addres,
      searchResult: [],
      chosenAddressId: "1",
      list: "11",
      city: "",
      area: "",
      province: "",
      person: "", //收货人
      iphone: "", //收货手机号
      getSering: {}, //收货地址
      Details: "", //详情地址,
      tags: "", //地址标签
      checked: false
    };
  },
  methods: {
    Tj2(){
      this.$axios.get('/api/deletePlot?iphone='+this.$cookies.get("userInfoCode").iphone).then(data=>{
          console.log(data)
      })
    },
    Tj1() {
      if (this.person == "") {
        return Toast("不能有一项为空");
      } else if (this.iphone.length != 11) {
        return Toast("手机号格式错误");
      } else if (this.getSering.city == "") {
        return Toast("地址不能为空");
      } else if (this.Details == "") {
        return Toast("地址详情也不能为空");
      }
      var c = {
        person: this.person,
        iphone: this.iphone,
        getSering: this.getSering,
        Details: this.Details,
        tags: this.tags,
        checked: this.checked,
        iphones: this.$cookies.get("userInfoCode").iphone
      };
      Toast.loading({
        message: "提交中...",
        forbidClick: true,
        loadingType: "spinner",
        duration:600
      });
      setTimeout(() => {
        this.$axios.post("/api/user/plot", c).then(data => {
          this.$cookies.remove('userInfoCode')
          console.log(data)
          this.$cookies.set('userInfoCode',data.data.data)
          console.log(this.$cookies.get('userInfoCode'))
          this.$router.push({path:'/goShipping'})
        });
      }, 800);
    },
    qwe(e) {
      console.log(this.list, e);
    },
    onSelected(data) {
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
      this.getSering.province = this.province;
      this.getSering.city = this.city;
      this.getSering.area = this.area;
      console.log(this.getSering);
    }
  },
  components: {
    VDistpicker: VDistpicker
  }
};
</script>

<style scoped>
.gos {
  width: 100%;
  background-color: #f7f7f7;
}
.distpicker-address-wrapper {
  height: 35px;
  display: flex;
  width: 80%;
  margin: 0;
}
.distpicker-address-wrapper select {
  height: 0;
}
.goShippingS {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.goShippingS > label {
  width: 100%;
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.goShippingS > label > span {
  width: 20%;
}
.goShippingS > label > input {
  width: 80%;
}
.goShippingS > label > textarea {
  width: 80%;
  height: 45px;
  margin-top: 15px;
}
.buttons {
  width: 100%;
  height: 45px;
  background-color: #e4393c;
  color: white;
  margin-top: 30px;
}
</style>>
