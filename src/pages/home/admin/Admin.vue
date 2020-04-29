<template>
  <div>
    <section v-loading="loading" element-loading-text="Loading...">
      <el-table
        stripe
        :data="shownData"
        style="width:100%"
        :default-sort="{ prop: 'name', order: 'ascending' }"
      >
        <el-table-column fixed prop="name" label="用户名" min-width="100" sortable></el-table-column>
        <el-table-column prop="register_date" label="注册日期" min-width="200" sortable></el-table-column>
        <el-table-column prop="city" label="城市" min-width="100" sortable></el-table-column>
        <el-table-column prop="privilege" label="用户组" min-width="100" sortable></el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button @click="deleteTableItem(scope.row._id)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        style="color:#18ab8f"
      ></el-pagination>
    </section>
  </div>
</template>

<script>
import * as api from "@/api/index.js";
import moment from "moment";
// 下面是 Vue 组件
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      totalCount: 0,
      currentPage: 1, //当前页码
      pageSize: 20, //每页条目数量
      form: {}, // 用作表单绑定的内容
      formLabelWidth: "120px" // 表单 label 的宽度
    };
  },
  mounted() {
    this.getAdmin();
  },
  methods: {
    // 删除一个数据
    deleteTableItem(id) {
      api
        .deleteAdminById(id)
        .then(response => {
          if (response.ok) {
            this.$message({
              message: "Delete sucess",
              type: "success"
            });
          } else {
            this.$message({
              message: "Delete failed",
              type: "error"
            });
          }
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.getAdmin();
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getAdmin();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getAdmin();
    },
    getAdmin() {
      this.loading = true;
      api
        .getAdminList({ offset: this.startIndex, limit: this.pageSize })
        .then(response => {
          if (response.ok) {
            this.$message({
              message: "Get sucess",
              type: "success"
            });
          }
          return response.json();
        })
        .then(jsonData => {
          this.totalCount = jsonData.metadata.Total;
          this.tableData = jsonData.data;
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => (this.loading = false));
    }
  },
  computed: {
    shownData() {
      return this.tableData.map(item => {
        return Object.assign(item, {
          register_date: moment(item.register_date).format("YYYY-MM-DD"),
          privilege: item.privilege ? "管理员" : "超级管理员"
        });
      });
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    }
  }
};
</script>

<style></style>
