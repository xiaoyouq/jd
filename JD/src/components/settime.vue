<template>
  <div class="setime">
    <div :class="[classActive == 1 ? 'redBorder':'']">
      <span>{{dd}}</span>:
      <span>{{ddd}}</span>:
      <span>{{dddd}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
      flag: false,
      dd: "",
      ddd: "",
      dddd: ""
    };
  },
  mounted() {
    let time = setInterval(() => {
      if (this.flag == true) {
        clearInterval(time);
      }
      this.timeDown();
    }, 500);
  },
  props: {
    endTime: {
      type: String
    },
    classActive: {
      type: Number
    }
  },
  methods: {
    timeDown() {
      const endTime = new Date(this.endTime);
      const nowTime = new Date();
      let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
      let d = parseInt(leftTime / (24 * 60 * 60));
      let h = this.formate(parseInt((leftTime / (60 * 60)) % 24));
      this.dd = h;
      let m = this.formate(parseInt((leftTime / 60) % 60));
      this.ddd = m;
      let s = this.formate(parseInt(leftTime % 60));
      let sd = this.formate(parseInt(leftTime % 6000));
      this.dddd = s;
      if (leftTime <= 0) {
        this.flag = true;
        this.$emit("time-end");
      }
      this.time = `${h}时${m}分${sd}秒`; // 需要修改时间样式的话 ，比如需要什么30分钟倒计时，就只保留分和秒
    },
    formate(time) {
      if (time >= 10) {
        return time;
      } else {
        return `0${time}`;
      }
    }
  }
};
</script>

<style scoped>
.setime span {
  font-size: 12px;
  border: 2px solid #efefef;
  margin-left: 2.3px;
}
.redBorder {
  color: red;
  font-weight: 500;
}
.redBorder span{
  border: 1px solid #E2E2E2;
  border-radius: 3px;
  height: 18px;
  padding: 1.5px;
  font-weight: 600;
}
</style>