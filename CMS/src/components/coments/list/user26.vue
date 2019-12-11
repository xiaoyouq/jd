<template>
  <div>
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="建号时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.iphone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.password | passwods }}</span>
        </template>
      </el-table-column>

      <el-table-column label="最后一次登录" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
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
      :page-sizes="[5, 10, 15, 20]"
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from "vue";
Vue.filter("userNmae1", function(el) {
  console.log(el.length);
  var a = el.slice(0, 5);
  var b = el.slice(el.length - 3, el.length);
  return a + "****" + b;
});
Vue.filter('passwods',function(el){
  return '*****'
})
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      pagesize: 6,
      currpage: 1
    };
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    }
  },
  created() {
    this.axios.get("/api/iphoneUserIN").then(data => {
      console.log(data);
      this.tableData = data.data.data;
    });
  }
};
</script>

<style scoped>
.el-tag {
  margin: 0;
}
</style>