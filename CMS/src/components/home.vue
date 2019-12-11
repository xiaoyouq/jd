<template>
  <div>
    <xlcd @listIndex = 'listIndex'></xlcd>
    <router-view></router-view>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import xlcd from  './xlcd.vue'
export default {
  data(){
    return{
      datas:{},
      account:''
    }
  },
  methods: {
    listIndex(data){
      if (data == 678) {
        var time = Date.now()
      this.axios.get("/api/logout?account="+this.account+'&time='+time).then(data => {
        console.log(data)
      });
      Toast("退出成功");
      this.$store.state.datass=''
      setTimeout(() => {
        this.$router.push({ path: "/login" });
      }, 1000);
    }else if(data == 1 ){
        this.$router.push({ name: "user1" });
    }else if(data == 3 ){
        this.$router.push({ path: "/user2" });
    }else if(data == 4 ){
        this.$router.push({ path: "/user3" });
    }else if(data == 5 ){
        this.$router.push({ path: "/user4" });
    }else if(data == 21 ){
        this.$router.push({ path: "/user21" });
    }else if(data == 22 ){
        this.$router.push({ path: "/user22" });
    }else if(data == 23 ){
        this.$router.push({ path: "/user23" });
    }else if(data == 25 ){
        this.$router.push({ path: "/user24" });
    }else if(data == 26 ){
        this.$router.push({ path: "/user26" });
    }else if(data == 27 ){
        this.$router.push({ path: "/user27" });
    }
    },
  },
  created() {
    this.axios.get('/api/userinfo').then(data=>{
      this.account = data.data.session.account
    })
    this.axios.get('/api/newListboard').then(data=>{
      this.$store.state.lylbqq = data.data.data
    })

    setTimeout(() => {
        this.$router.push({name:'user44'})
    }, 500);
  },
  components:{
    xlcd
  }
};
</script>

<style scoped>

</style>