<template>
  <div class="body">
    <!-- title -->
    <div class="userDiv">
      <label>商品名字</label>
      <el-input placeholder="请输入商品名字" v-model="title" clearable></el-input>
    </div>
    <!-- title -->
    <!-- content -->
    <div class="userDiv">
      <label for>商品内容</label>
      <el-input placeholder="请输入商品内容" v-model="content" clearable></el-input>
    </div>
    <!-- content -->
    <!-- preice -->
    <div class="userDiv">
      <label for>商品价格</label>
      <el-input placeholder="请输入商品价格" type="Number" v-model="preice" clearable></el-input>
    </div>
    <!-- preice -->
    <!-- ratepreice -->
    <div class="userDiv">
      <label for>商品打折后</label>
      <el-input placeholder="请输入商品打折后的价格" type="Number" v-model="ratepreice" clearable></el-input>
    </div>
    <!-- ratepreice -->
    <!-- repertory -->
    <div class="userDiv">
      <label for>库存</label>
      <el-input-number v-model="repertory" @change="handleChange" :min="1" :max="9999" label="描述文字"></el-input-number>
    </div>
    <!-- repertory -->
    <br />
    <!-- 下拉菜单 选择综合等等 -->
    <el-dropdown @command="handleCommand">
      <el-button type="primary">
           {{ lx }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in xlcd" :key="index" :command="item.sort">{{ item.sort }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 下拉菜单 选择综合等等 -->

    <!-- 上传图片 -->
    <!-- <el-upload
     ref='upload'
      action="api/prc"
       class="tjm" 
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="successImage"
      limit:6
    >
      <i class="el-icon-plus"></i>
    </el-upload>
     -->
     <el-upload action='' ref="upload" :on-change="getFile" :limit="nu" list-type="picture" :auto-upload="false">
            <el-button size="small" type="primary">选择图片上传,最多上传一张图片</el-button>
          </el-upload>
    <el-dialog  :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
<!-- 此处修改 -->
      <el-upload action='' ref="upload1" :on-change="getFile1" :limit="nu" list-type="picture" :auto-upload="false">
            <el-button size="small" type="primary">选择图片上传,最多上传一张图片</el-button>
          </el-upload>
    <el-dialog  :visible.sync="dialogVisible1">
      <img width="100%" :src="dialogImageUrl1" alt />
    </el-dialog>


    <!-- 上传图片 -->

        <el-button @click="save" type="danger">提交</el-button>

  </div>
</template>

<script>
import { type } from 'os';
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogImageUrl1: "",
      dialogVisible: false,
      dialogVisible1: false,
      title: "",
      content: "",
      preice: "",
      ratepreice: "",
      repertory: 1,
      lx:'类型',
      files:[],
      files1:[],
      xlcd:[],
      nu:20,
      list:[],
      list1:[],
    };
  },
  methods: {
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
     getFile(file, fileList) {
      //  console.log(file)
      this.getBase64(file.raw).then(res => {
        this.list.push({picture:res})
        console.log(this.list)
        this.files = this.list
      });
    },
      getFile1(file, fileList) {
      //  console.log(file)
      this.getBase64(file.raw).then(res => {
        this.list1.push({picture:res})
        console.log(this.list1)
        this.files1 = this.list1
      });
    },
    save(){
      var user = {sort:this.lx,utitle:this.title,picture:this.files,picture1:this.files1,content:this.content,preice:this.preice,ratepreice:this.ratepreice,repertory:this.repertory}
      // user.picture =  { picture:this.files.url }
      console.log(typeof this.files)
      if(this.title==''||this.content==''||this.preice==''||this.ratepreice==''||this.repertory==''||this.lx=='类型'||this.files.length <=0){
        this.$message('不能有一项为空')
        return
      }
      this.axios.post('/api/pushCarList',user).then(data=>{
          if(data.data.error_code == 2002){
            this.title=this.content=this.preice=this.ratepreice=""
            this.repertory =1 
            this.lx = '类型'
            this.files = []
            this.$refs.upload.clearFiles();
            this.$refs.upload1.clearFiles();
            this.$message('添加成功！')
          }else{
            this.$message('添加失败！')
          }
      })
      
    },
    handleCommand(command) {
      this.$message("您选中的类型是 " + command);
      this.lx = command
    },
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("ok");
    },
    successImage(esponse, file, fileList) {
      // this.files = fileList
    },
    handleChange(value) {
      // console.log(value);
    },
  },
  created(){
        this.axios.get("/api/classifyfind").then(data=>{
          this.xlcd = data.data.data
      })
  }
};
</script>


<style>
.el-button--primary{
  margin-top: 10px
}
.el-button el-button--primary el-button--small{
  width: 60px;
}
.tjm{
  margin-top: 10px;
}
.xlcd{
  margin-top: 10px;
}
.body {
  width: 80%;
  margin: 0 auto;
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