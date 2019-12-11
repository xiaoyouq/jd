<template>
  <div class="">
    <el-tag class="grxhtag" type="success">童年回忆</el-tag>
    <hr />
    <div class="grxxx">
      <el-tag
        :key="index"
        v-for="(tag,index) in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >{{tag.name}}</el-tag>
    </div>
    <hr />
    <el-tag type="danger" class="grxhtag">我的标签</el-tag>
    <br />
    <div class="grxs">
    <el-tag
      :key="index"
      v-for="(tag,index) in newlist"
      closable
      type="warning"
      :disable-transitions="false"
      @close="handleClose32(tag)"
    >{{tag.name}}</el-tag>
    </div>
    <br />
    <mt-button type="danger" @click="tij" class="btn456">提交</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newlist: [],
      inputVisible: false,
      inputValue: "",
      dynamicTags: [
        { name: "哆啦A梦"},
        { name: "喜洋洋"},
        { name: "阿童木"},
        { name: "火影忍者"},
        { name: "麦克奥特曼"},
        { name: "巴啦啦小魔仙"},
        { name: "花园宝宝"},
        { name: "网球王子"},
        { name: "成龙历险记"},
        { name: "恐龙世界总动员"},
        { name: "大耳朵图图"},
        { name: "海绵宝宝"},
        { name: "魔动王"},
        { name: "小猪佩奇"},
        { name: "十万个为什么"},
        { name: "虹猫蓝兔奇侠传"},
        { name: "快乐星球"},
        { name: "神兵小将"},
        { name: "托马斯和朋友"},
        { name: "天眼有奇招"},
        { name: "马丁的早晨"},
        { name: "落语天女"}
      ]
    };
  },
  methods: {
    handleClose(tag) {
      this.newlist.push(tag);
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    handleClose32(tag) {
      this.dynamicTags.push(tag);
      this.newlist.splice(this.newlist.indexOf(tag), 1);
    },

    tij(){
      console.log(this.newlist,this.dynamicTags)
      var c = JSON.stringify(this.newlist)
      var b = JSON.stringify(this.dynamicTags)
       this.axios.get(
        "/api/memory?memory=" +
          c+
          "&nomemory=" +
          b +
          "&account=" +
          this.$store.state.datass.account
      ).then(data=>{
        console.log(data);
        this.$store.state.datass=data.data.data
    })
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  created() {
    console.log(this.$store.state.datass)
     this.dynamicTags = JSON.parse(this.$store.state.datass.nomemory)
     this.newlist = JSON.parse(this.$store.state.datass.memory)
    // this.newlist = this.$store.state.datass.memory;
    this.axios.get('/api/userinfo').then(data=>{
      console.log(data)
    })
  }
};
</script>

<style scoped>
.grxxx{
  width:1000px;
  overflow: hidden;
}
.grxs{
  margin-left:15px;
}
.btn456 {
  margin-top: 40px;
  margin-left: 30px;
  line-height: 40px;
}
.grxhtag {
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.grxhh1 {
  margin-left: 470px;
  margin-top: 30px;
}
.grxxx .el-tag{
  margin-left: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
