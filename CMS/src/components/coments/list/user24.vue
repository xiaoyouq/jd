<template>
    <div>
      <div class="car">
           增加分类产品分类
           <el-input placeholder="请输入分类名" v-model="value1" minlength="2"></el-input>
           <el-button @click="pushClassify">提交</el-button>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      value1:'',
    }
  },
  created(){
      setTimeout(() => {
           this.axios.get('/api/userinfo').then(data=>{
         this.username=  data.data.session.username
      })
      }, 1000);
  },  
  methods:{
    pushClassify(){
       this.axios.post("/api/classify",{sort:this.value1,username:this.username}).then(data=>{
        if(data.data.error_code==202){
          this.value1 = ''
          this.$message('添加成功')
        }else{
          this.value1 = ''
          this.$message('添加失败或者有重名')
        }
      })
    }

  }
}
</script>

<style>
.car{
  width: 20%;
  margin: 0 auto;
  margin-top: 100px;
}
.car input{
  width: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>