<template>
  <div>
    <!-- 优惠券单元格 -->
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :show-exchange-bar="false"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
  </div>
</template>

<script>
import Vue from "vue";
import { CouponCell, CouponList } from "vant";
Vue.use(CouponCell).use(CouponList);
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "全场通用",
  startAt: 1573714433,
  endAt: 1605344033,
  valueDesc: 3.5,
  unitDesc: "元"
};
export default {
  data() {
    return {
      chosenCoupon: -1,
      coupons: this.$cookies.get('userInfoCode').coupons,
      disabledCoupons:this.$cookies.get('userInfoCode').disabledCoupons,
      duihuanlanFlag:false
    };
  },
  created() {
    console.log(this.$cookies.get('userInfoCode').coupons)
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
  }
};
</script>

<style>
</style>