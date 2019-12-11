<template>
  <div class="xgzll" >
    <h2 class="xgzlh2">修改个人资料</h2>
    <div class="eledialong">
      <el-upload
        action
        ref="upload"
        :on-change="getFile"
        :limit="nu"
        list-type="picture"
        :auto-upload="false"
      >
        <el-button class="sctx" size="small" type="primary">上传个人头像</el-button>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>

    <div class="name">
      <label for>姓名</label>
      <el-input class="ages1" placeholder="请输入内容" v-model="input1" :disabled="false"></el-input>
    </div>
    <div class="name">
      <label for>性别</label>
      <el-radio v-model="input2" label="男" value="男">男</el-radio>
      <el-radio v-model="input2" label="女" value="女">女</el-radio>
    </div>
    <div class="name">
      <label for>年龄</label>
      <el-input class="ages1" placeholder="请输入您的真实年龄" max="150" min="1" type="number" v-model="input3" :disabled="false"></el-input>
    </div>
    <div class="name">
      <label for>生日</label>
      <div class="block">
        <el-date-picker v-model="input4" type="date" placeholder="选择生日"></el-date-picker>
      </div>
    </div>
    <div class="name">
      <label for>喜欢</label>
      <el-select v-model="value1" multiple placeholder="请选择您喜欢干的事">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <mt-button class="btn43" @click="puhsxgzl" type="danger">提交</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: this.$store.state.datass.username,
      input2: this.$store.state.datass.gender,
      input3: this.$store.state.datass.age,
      input4: this.$store.state.datass.birthday,
      value1: "",
      options: [
        { value: "打篮球", label: "打篮球" },
        { value: "摄影", label: "摄影" },
        { value: "打排球", label: "打排球" },
        { value: "做饭", label: "做饭" },
        { value: "踢足球", label: "踢足球" }
      ],
      nu: 1,
      dialogVisible: false,
      dialogImageUrl: "",
      photo: "",
         note1: {
        backgroundImage:
          "url(" + require("../../../assets/image/user24image4.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "77.27% 83%",
        height: "100%",
        position: "fixed",
        width: "100%"
      },
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
      this.getBase64(file.raw).then(res => {
        this.photo = res;
        console.log(this.photo);
      });
    },
    puhsxgzl() {
      if(this.$store.state.datass.lovetodo <= 0 ){
        return this.$message('爱好不能为空！')
      }
      if( this.value1.length <=0){
        this.value1 = this.$store.state.datass.lovetodo
      }
      var c = {
        username: this.input1,
        gender: this.input2,
        age: this.input3,
        birthday: this.input4,
        lovetodo: this.value1,
        photo: this.photo,
        account: this.$store.state.datass.account
      };
      console.log(c)
      this.axios.post("/api/modified", c).then(data => {
        if (data.data.error_code == 200) {
          this.input1 = "";
          this.input2 = "";
          this.input3 = "";
          this.input4 = "";
          this.value1 = "";
          this.$refs.upload.clearFiles();
          this.$message({
            showClose: true,
            message: "修改成功！",
            type: "success"
          });
          this.$store.state.datass = data.data.data;
        } else {
          this.$message({
            showClose: true,
            message: "修改失败",
            type: "error"
          });
        }
      });
    }
  },
  created() {
  }
};
</script>

<style>
.el-upload-list__item .is-ready{
      margin-left: 30px;
}
.el-upload-list{
  width: 100px;
}
.el-upload-list {
  margin-left: 40px;
}
.xgzll .sctxsl{
  width: 140px;
}
.xgzll{
  width: 70%;
}
.xgzll button{
  margin-left: 30px;
  margin-bottom: 15px;
}
.xgzll .ages1{
  width: 450px;
}
.name {
  width: 90%;
  display: flex;
}
.name label {
  width: 7%;
  text-align: center;
  line-height: 40px;
}
.xgzlh2 {
  margin-left: 400px;
  margin-top: 50px;
  margin-bottom: 30px;
}
.btn43{
  margin-left: 25px;
}
</style>