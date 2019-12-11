<template>
  <div>
    <div class="line"></div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">用户中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">商品管理</template>
        <el-menu-item index="26">用户列表</el-menu-item>
        <el-menu-item index="21">商品列表</el-menu-item>
        <el-menu-item index="22">增加商品</el-menu-item>
        <el-menu-item index="23">商品分类列表</el-menu-item>
        <el-menu-item index="25">商品分类增加</el-menu-item>
        <el-menu-item index="27">轮播图等图上传</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">
        <a target="_blank">订单管理</a>
      </el-menu-item>
      <el-menu-item index="5">个人中心</el-menu-item>

      <el-submenu index="6">
        <template slot="title">设置</template>
        <el-menu-item index="678">退出登录</el-menu-item>
      </el-submenu>

      <div class="right1">
        <p>欢迎用户：{{ userinfo.username }},</p>
      </div>
    </el-menu>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      image: require("../../public/img/icons/apple-touch-icon-180x180.png"),
      userinfo:{}
    };
  },
  props:['listIndex'],
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key);
        this.$emit('listIndex',key)
    },
  },
  created() {
    this.axios.get('/api/userinfo').then(data=>{
      this.userinfo = data.data.session 
    })
  },
};
</script>
<style>
.right1 {
  display: flex;
  align-items: center;
  float: right;
  text-align: center;
  color: white;
}
.right1 p {
  display: flex;
  margin: 0;
  padding: 0;
  color: white;
  line-height: 55px;
  margin-right: 50px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>