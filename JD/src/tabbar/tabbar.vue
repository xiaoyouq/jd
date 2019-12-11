<template>
  <div class="tabbar">
    <div class="tabbarS">
      <div @click="rout(1)" class="fl">
        <img v-if="flag1" :src="a1" alt />
        <img v-else :src="a2" alt />
      </div>
      <div @click="rout(2)" class="fl">
        <img v-if="flag2" :src="b1" alt />
        <img v-else :src="b2" alt />
      </div>
      <div @click="rout(3)" class="fl">
        <img v-if="flag3" :src="c1" alt />
        <img v-else :src="c2" alt />
      </div>
      <div @click="rout(4)" class="fl">
        <img v-if="flag4" :src="d1" alt />
        <img v-else :src="d1" alt />
      </div>
      <div @click="rout(5)" class="fl">
        <img v-if="flag5" :src="e1" alt />
        <img v-else :src="e2" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a1: require("../assets/tabbar/a1.png"),
      a2: require("../assets/tabbar/a2.png"),
      b1: require("../assets/tabbar/b1.png"),
      b2: require("../assets/tabbar/b2.png"),
      c1: require("../assets/tabbar/c1.png"),
      c2: require("../assets/tabbar/c2.png"),
      d1: require("../assets/tabbar/d1.png"),
      e1: require("../assets/tabbar/e1.png"),
      e2: require("../assets/tabbar/e2.png"),
      flag1: false,
      flag2: true,
      flag3: true,
      flag4: true,
      flag5: true
    };
  },
  methods: {
    rout(e) {
      if (e == 1) {
        this.$router.push({ name: "index1" });
        this.flag1 = false;
        this.flag2 = true;
        this.flag3 = true;
        this.flag4 = true;
        this.flag5 = true;
      } else if (e == 2) {
        this.$router.push({ name: "tabbar2" });
        this.flag2 = false;
        this.flag1 = true;
        this.flag3 = true;
        this.flag4 = true;
        this.flag5 = true;
      } else if (e == 3) {
        this.$router.push({ name: "tabbar3" });
        this.flag3 = false;
        this.flag1 = true;
        this.flag2 = true;
        this.flag4 = true;
        this.flag5 = true;
      } else if (e == 4) {
        this.$router.push({ name: "tabbar4" });
        this.flag4 = false;
        this.flag1 = true;
        this.flag2 = true;
        this.flag3 = true;
        this.flag5 = true;
      } else if (e == 5) {
        this.$router.push({ name: "tabbar5" });
        this.flag5 = false;
        this.flag1 = true;
        this.flag2 = true;
        this.flag3 = true;
        this.flag4 = true;
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "index1") {
        this.flag1 = false;
        this.flag2 = true;
        this.flag3 = true;
        this.flag4 = true;
        this.flag5 = true;
      } else if (to.name == "tabbar2Right") {
        this.flag2 = false;
        this.flag1 = true;
        this.flag3 = true;
        this.flag4 = true;
        this.flag5 = true;
      } else if (to.name == "tabbar3") {
        this.flag3 = false;
        this.flag1 = true;
        this.flag2 = true;
        this.flag4 = true;
        this.flag5 = true;
      } else if (to.name == "userIndex") {
        this.flag5 = false;
        this.flag1 = true;
        this.flag2 = true;
        this.flag3 = true;
        this.flag4 = true;
      }
    }
  }
};
</script>

<style scoped>
.tabbar {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0%;
  background-color: white;
  z-index: 99;
  box-shadow: 1px 1px 5px black;
}
.tabbarS {
  width: 100%;
  height: 100%;
  display: flex;
}
.tabbarS > div {
  width: 20%;
  height: 100%;
  padding: 5px;
}
.tabbarS > div > img {
  width: 60px;
  height: 43px;
}
</style>