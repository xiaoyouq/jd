<template>
  <div>
    <p class="headerps">这是上传JD轮播图</p>
    <div class="jdSwiper">
      <el-upload
        action
        ref="upload"
        :on-change="getFile"
        :limit="nu"
        list-type="picture"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">选择图片上传,最多上传一张图片</el-button>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <input type="text" v-model="bz" name id />
      <br />
      <el-button @click="tj">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      list: [],
      nu: 25,
      bz: "swiper"
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
        this.list.push({ picture: res });
        this.files = this.list;
        console.log(this.list);
      });
    },
    tj() {
      var c = { swiperList: this.list, title: this.bz };
      this.axios.post("/api/pushSwiper", c).then(data => {
        if (data.data.code == 203) {
          this.$confirm("已检测到有重复的,是否覆盖?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              var b = { title: this.bz, swiperList: this.list };
              this.axios.post("/api/updataSwiper", b).then(data => {
                if (data.data.code == 202) {
                  this.$refs.upload.clearFiles();
                  this.bz = "";
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                } else {
                  this.$message("修改失败");
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        } else {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.bz = "";
          this.$refs.upload.clearFiles();
        }
      });
    }
  },
  created() {
  }
};
</script>

<style scoped>
.el-button {
  margin-left: 20px;
}
.el-button:last-child {
  margin-left: 400px;
  margin-top: 50px;
}
.headerps {
  margin-left: 650px;
  font-size: 20px;
  margin-top: 10px;
}
.jdSwiper {
  border: 1px solid grey;
  width: 60%;
  height: 40%;
  margin: 0 auto;
  height: 500px;
}
.jdSwiper input {
  margin-left: 20px;
  margin-top: 40px;
}
</style>