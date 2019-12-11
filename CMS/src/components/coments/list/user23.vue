
<template>
  <div>
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      style="width: 100%"
    >
      <el-table-column label="#" type="index" width="80"></el-table-column>

      <el-table-column label="日期" width="280">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.create_time | formatDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="添加者姓名" width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="分类" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.sort }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
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
      tableData: [],
      currpage: 1,
      pagesize: 6
    };
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
        message: "请求分类列表成功",
        type: "success",
        duration: 1500
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.axios.post("/api/classifydelete", row).then(data => {
        console.log(data);
        if (data.data.error_code == 202) {
          this.axios.get("/api/classifyfind").then(data => {
            this.tableData = data.data.data;
          });
          this.$message("删除成功");
        } else {
          this.$message("删除失败");
        }
      });
    }
  },
  created() {
    this.axios.get("/api/classifyfind").then(data => {
      this.open3();
      this.tableData = data.data.data;
    });
  }
};
</script>

<style>
</style>