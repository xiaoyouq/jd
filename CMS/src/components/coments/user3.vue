<template>
  <div>
    <div class="ddgl">
      <!-- 监听搜索键盘弹起时间 -->
      <p class="inputp1">
        <el-input
          type="number"
          @keyup.enter.native="searchH"
          placeholder="请输入手机号查询"
          v-model="input"
          clearable
          ref="inputfounts"
        ></el-input>
        <el-button type="danger" icon="el-icon-search" @click="searchH">搜素</el-button>
      </p>
      <!-- 下面的搜索到的列表 -->

      <el-tag type="success">待收货</el-tag>
      <!-- 待收货 -->
      <el-table :data="daishouhuo" style="width: 100%">
        <el-table-column label="创建订单日期" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.crrtimes | times}}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.iphone }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商品" width="190">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span class="spanx" size="small">{{ scope.row.utitle }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ 'x'+ scope.row.count }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.fnNumll2 }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span v-if="scope.row.x4" size="medium">待收货</span>
                <span v-else size="medium">待发货</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 待评价 -->
      <el-tag type="info">待评价</el-tag>
      <el-table :data="daipingjia" style="width: 100%">
        <el-table-column label="创建订单日期" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.iphones }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商品" width="190">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span class="spanx" size="small">{{ scope.row.utitle }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ 'x'+ scope.row.count }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.count*scope.row.ratepreice |jiage }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope>
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">待付款</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">提醒</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 待付款 -->
      <el-tag type="warning">待付款</el-tag>
      <el-table :data="daifukuan" style="width: 100%">
        <el-table-column label="创建订单日期" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.iphone }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商品" width="190">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span class="spanx" size="small">{{ scope.row.data.utitle }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ 'x'+ scope.row.data.count }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.data.count*scope.row.data.ratepreice |jiage }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope>
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">待付款</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 卡点 -->
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">提示付款</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 已完成 -->
      <el-tag type="danger">已完成</el-tag>
      <el-table :data="yiwancheng" style="width: 100%">
        <el-table-column label="创建订单日期" width="220">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.iphone }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商品" width="190">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span class="spanx" size="small">{{ scope.row.utitle }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ 'x'+ scope.row.count }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="实付金额" width="150">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.count*scope.row.ratepreice |jiage }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope>
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <span size="medium">待付款</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";
import { Toast } from "vant";
import { type } from "os";
Vue.use(Toast);
Vue.use(Button);
Vue.filter("times", function(el) {
  var c = parseInt(el);
  var date = new Date(c);
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
Vue.filter("jiage", function(el) {
  return parseInt(el);
});
Vue.filter("iphones", function(el) {
  if (el) {
    return el;
  } else {
    console.log(this.input);
    return this.input;
  }
});
export default {
  data() {
    return {
      input: "",
      yiwancheng: [],
      daipingjia: [],
      daifukuan: [],
      daishouhuo: []
    };
  },
  created() {
    console.log(this.$store.state.daishouhuo);
    if (this.$store.state.daishouhuo) {
      this.daishouhuo = this.$store.state.daishouhuo;
      this.daifukuan = this.$store.state.daifukuan;
      this.yiwancheng = this.$store.state.yiwancheng;
      this.daipingjia = this.$store.state.daipingjia;
      this.input = this.$store.state.inputbb;
    }
    var d = { iphone: 15550918652 };
    this.axios.post("/api/jdnbFInd", d).then(data => {
      console.log(data);
    });
  },
  methods: {
    handleEdit(index, row) {
      console.log(row);
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1000
      });
      setTimeout(() => {
        this.$router.push({ path: "/user28", query: row });
      }, 1100);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    searchH() {
      Toast.loading({
        message: "查询中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1500
      });
      // 此处监听键盘弹起时间
      var d = { iphone: parseInt(this.input) };
      this.axios.post("/api/jdnbFInd", d).then(data => {
        if (data.data.error_code == 200) {
          var c = data.data.data;
          var daishouhuo1 = [];
          var daishouhuo2 = [];
          var daishouhuo3 = [];
          console.log(c);
          c.receiving.forEach(element => {
            console.log(element);
            element.listCar.forEach(ele => {
              ele.liuyan = element.liuyan;
              ele.thwy = element.thwy;
              ele.fnNumll2 = element.fnNumll2;
              ele.iphone = element.iphone;
              ele.iphones = this.input;
              if (ele.x1 == true && ele.x2 == false) {
                daishouhuo1.push(ele);
              } else if (ele.x2 == true && ele.x4 == true) {
                daishouhuo2.unshift(ele);
              }
              daishouhuo2.forEach(el => {
                if (el.x3 == false && el.x2 == true) {
                  daishouhuo3.unshift(ele);
                }
              });
            });
          });
          setTimeout(() => {
            this.$store.state.daifukuan = c.dfk;
            this.$store.state.daishouhuo = daishouhuo1;
            this.$store.state.yiwancheng = daishouhuo2;
            this.$store.state.daipingjia = daishouhuo3;
            this.$store.state.inputbb = this.input;
            this.daifukuan = c.dfk;
            this.daishouhuo = daishouhuo1;
            console.log(this.daishouhuo);
            this.yiwancheng = daishouhuo2;
            this.daipingjia = daishouhuo3;
          }, 1000);
        } else {
          setTimeout(() => {
            Toast.fail("该用户暂未有订单");
          }, 1600);
          this.daishouhuo = [];
          this.yiwancheng = [];
          this.daipingjia = [];
          this.daifukuan = [];
        }
      });
    }
  },
  mounted() {
    this.$refs.inputfounts.focus();
  }
};
</script>

<style scoped>
.el-button .el-button {
  margin-left: 0;
}
.el-table td div {
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.spanx {
  font-size: 13px;
}
.ddgl {
  width: 80%;
  margin: 0 auto;
  margin-top: 5px;
}
.inputp1 {
  display: flex;
}
.elbuttons {
  width: 60px;
  height: 30px;
  padding: 0;
}
</style>