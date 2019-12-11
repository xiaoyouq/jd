<template>
  <div>
    <div class="board">
      <label for>标题</label>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <label for>内容</label>
      <el-input v-model="content" placeholder="请输入内容"></el-input>
      <label for>内容</label>
      <el-input v-model="content1" placeholder="请输入内容"></el-input>
      <label for>内容</label>
      <el-input v-model="content2" placeholder="请输入内容"></el-input>
      <label for>内容</label>
      <el-input v-model="content3" placeholder="请输入内容"></el-input>
      <label for>内容</label>
      <el-input v-model="content4" placeholder="请输入内容"></el-input>
      <label for>内容</label>
      <el-input v-model="content5" placeholder="请输入内容"></el-input>
      <el-upload
        action
        ref="upload"
        :on-change="getFile"
        :limit="nu"
        list-type="picture"
        :auto-upload="false"
      >
        <el-button ref="upload" style="width:100%" size="small" type="primary">选择图片上传,最多上传一张图片</el-button>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>

      <el-button type="success" @click="fbql">发表</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      content1: "",
      content2: "",
      content3: "",
      content4: "",
      content5: "",
      user: "",
      nu: 7,
      dialogImageUrl: "",
      dialogVisible: false,
      list: []
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
        this.list.push({ picture: res });
      });
    },

    fbql() {
      if (this.title == "" || this.content == "") {
        this.$message("不能有一项为空");
        return;
      }
      var time = Date.now();
      var li = {
        title: this.title,
        content: this.content,
        content1: this.content1,
        content2: this.content2,
        content3: this.content3,
        content4: this.content4,
        content5: this.content5,
        photo: this.user.photo,
        username: this.user.username,
        photos: this.list
      };

      this.axios.post("/api/board", li).then(data => {
        if (data.data.error_code == 200) {
          this.axios.get("/api/newListboard").then(data => {
            this.$store.state.lylbqq = data.data.data;
          });
          this.title = "";
          this.content = "";
          this.content1 = "";
          this.content2 = "";
          this.content3 = "";
          this.content4 = "";
          this.content5 = "";
          this.$refs.upload.clearFiles();
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "user1" });
          }, 1000);
        } else if (data.data.error_code == 201) {
          this.$message({
            showClose: true,
            message: "标题已重复",
            type: "danger"
          });
        }
      });
    }
  },
  created() {
    this.axios.get("/api/userinfo").then(data => {
      this.user = data.data.session;
    });
  }
};
</script>

<style scoped>
.el-upload-list{
  display: flex;
  line-height: 20px;
}
.el-upload-list--picture .el-upload-list__item {
  margin-left: 10px;
}
.board {
  width: 90%;
  border: 1px solid grey;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
}
.board .el-input {
  width: 40%;
}
.board .el-button {
  width: 10%;
  margin-top: 30px;
}
</style>