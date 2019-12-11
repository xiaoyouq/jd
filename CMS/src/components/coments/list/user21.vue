<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" clearable></el-input>

    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>

      <!-- 出厂日期 -->
      <el-table-column label="出厂日期" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <!-- 出厂日期 -->

      <!-- 分类 -->
      <el-table-column label="分类" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.sort }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- 分类 -->

      <!-- 姓名 -->
      <el-table-column label="产品名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>介绍: {{ scope.row.content }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.utitle }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 姓名 -->

      <!-- 原价 -->
      <el-table-column label="原价" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.preice }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- 原价 -->

      <!-- 现价 -->
      <el-table-column label="现价" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.ratepreice }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <!--  现价 -->

      <!-- 库存 -->
      <el-table-column label="库存" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.repertory }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- 库存 -->

      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <img class="images" :src="scope.row.picture[0].picture" alt />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
Vue.filter("formatDate", function(value) {
  //格式时间
  var len = parseInt(value);
  var date = new Date(len);
  var Y = date.getFullYear() + "年";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "月";
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var S = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var F = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var mm = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return `${Y}-${M}-${D} ${S}:${F}:${mm}`;
});
export default {
  data() {
    return {
      input: "",
      tableData: [],
      flag: true,
      currpage: 1,
      pagesize: 6
    };
  },
  created() {
    this.axios.get("/api/newList").then(data => {
      this.open3();
      this.tableData = data.data.data;
    });
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    open3() {
      this.$notify({
        title: "成功",
        message: "请求商品列表成功",
        type: "success",
        duration: 1500
      });
    },
    handleEdit(index, row) {
      console.log(index);
    },
    handleDelete(index, row) {
      this.axios.get("/api/sortdelete?uid=" + row._id).then(data => {
        if (data.data.error_code == 200) {
          this.$message("删除成功!");
          this.axios.get("/api/newList").then(data => {
            this.tableData = data.data.data;
          });
        } else {
          this.$message("删除失败");
        }
      });
    }
  }
};
</script>

<style>
.el-pagination {
  margin-left: 540px;
  margin-top: 40px;
  margin-bottom: 30px;
}
.el-button + .el-button {
  margin-left: 0;
}
.el-tag{
  margin: 0;
}
.images {
  width: 50px;
  height: 50px;
}
.el-input {
  width: 60%;
}
.el-table__row input {
  width: 60%;
  font-size: 13px;
  height: 30px;
  background-color: #ecf5ff;
  color: #409eff;
}
</style>