<template>
  <div class="redRacket">
    <div v-if="flag">
      <div class="redad">
        <img class="images" :src="image1" alt />
        <p class="hiddenp">
          <span>暂时没有红包</span>
          <span>红包可与促销、优惠券同时抵用,结算时直接抵扣</span>
        </p>
      </div>
      <img class="jduser2" :src="image2" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image1: require("../assets/user/redPack.png"),
      image2: require("../assets/user/jduser2.png"),
      flag:true
    };
  }
};
</script>

<style scoped>
.redRacket {
  width: 100%;
  background-color: white;
  border-top: 1.5px solid gray
}
.redad {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.images {
  width: 120px;
  height: 120px;
  margin-top: 140px;
  margin-left: 130px;
}
.hiddenp {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
}
.hiddenp > span:nth-child(1) {
  color: black;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.hiddenp > span:nth-child(2) {
  font-size: 12px;
}
.jduser2 {
  margin-top: 220px;
  margin-left: 100px;
}
</style>