<template>
  <div>
    <section v-loading="loading" element-loading-text="Loading...">
      <el-row>
        <el-col :span="24">
          <!-- 删除过程中，不允许其他操作 -->
          <el-button
            v-if="!showDeleteCheckbox"
            @click="dialogFormVisible = true;form = {};"
            type="primary"
          >新增</el-button>
          <el-button v-if="!showDeleteCheckbox" @click="showDeleteCheckbox = true;" type="danger">删除</el-button>
          <!-- 删除过程中，只出现确认删除按钮 -->
          <el-button
            v-if="showDeleteCheckbox"
            @click="deleteTableItem(chosenItem);showDeleteCheckbox = false;chosenItem = [];"
            type="danger"
          >确认删除</el-button>
          <el-button v-if="showDeleteCheckbox" @click="showDeleteCheckbox = false;">取消</el-button>
        </el-col>
      </el-row>
      <el-table
        stripe
        :data="shownData"
        style="width:100%"
        :default-sort="{prop: 'register_date', order: 'descending'}"
      >
        <!-- <el-table-column prop="_id" label="id" width="100" sortable></el-table-column> -->
        <el-table-column fixed prop="shop_name" label="店铺名称" min-width="100" sortable>
          <template slot-scope="scope">
            <!-- el-checkbox 多选框，checked 绑定是否选中，click 绑定点击事件 -->
            <el-checkbox
              v-if="showDeleteCheckbox"
              :checked="chosenItem.indexOf(scope.row._id) > -1"
              @change="toggleChosenItem(scope.row._id)"
              style="margin-right: 5px;"
            ></el-checkbox>
            <span>{{scope.row.shop_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="register_date" label="注册日期" min-width="100" sortable></el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="100"></el-table-column>
        <el-table-column label="店铺介绍" min-width="100">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" width="500">
              <p>店铺名称: {{ scope.row.shop_name }}</p>
              <p>店铺地址: {{ scope.row.address }}</p>
              <p>店铺介绍: {{ scope.row.introduction }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.shop_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <!-- 删除过程中，禁用其他操作 -->
            <el-button
              :disabled="showDeleteCheckbox"
              @click="form = {...scope.row};dialogFormVisible = true;"
              type="info"
              size="small"
            >编辑</el-button>
            <el-button
              :disabled="showDeleteCheckbox"
              @click="deleteTableItem([scope.row._id])"
              type="danger"
              size="small"
            >删除</el-button>
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
    <!-- Form -->
    <!-- el-dialog 是弹窗样式，title 绑定弹窗的标题内容，visible 绑定弹窗是否展示 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
      <el-form :model="form" :rules="formRules" ref="form">
        <!-- el-form-item 绑定表单样式，label 表单的名称，formLabelWidth 设置 label 的宽度, 设置 prop 来进行规则校验 -->
        <el-form-item label="日期" :label-width="formLabelWidth" prop="register_date">
          <!-- 里面装载表单元素，这里装了个选择日期的组件，v-model 绑定选择值，value-format设置绑定值的格式，type 设置选择的范围，这里 date 表示到天 -->
          <el-date-picker
            v-model="form.register_date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="注册日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="店铺名称" :label-width="formLabelWidth" prop="shop_name">
          <el-input v-model="form.shop_name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺介绍" :label-width="formLabelWidth" prop="introduction">
          <el-input v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 点击取消的时候，设置弹窗不可见 -->
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- 点击确定的时候，设置弹窗不可见，同时添加一项内容 -->
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import tableData from "./merchantData.js";
import * as api from "@/api/index.js";
import moment from "moment";
// 下面是 Vue 组件
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      totalCount: 0,
      dialogFormVisible: false, // 弹窗是否出现
      currentPage: 1,
      pageSize: 20,
      form: {}, // 用作表单绑定的内容
      formLabelWidth: "120px", // 表单 label 的宽度
      showDeleteCheckbox: false, // 是否批量删除
      chosenItem: [], // 选中的选项
      formRules: {
        register_date: [
          {
            type: "string",
            required: true,
            message: "请选择注册日期",
            trigger: "change"
          }
        ],
        shop_name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        introduction: [
          { required: true, message: "请输入店铺介绍", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入店铺地址", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getMerchant();
  },
  methods: {
    // 新增/修改一个数据
    updateTableItem(item = {}) {
      // 检查是否有 id，有则更新，没有则新增
      if (item._id !== undefined) {
        const id = item._id;
        delete item._id;
        api
          .updataMerchantById(id, item)
          .then(response => {
            if (response.ok) {
              this.$message({
                message: "Update sucess",
                type: "success"
              });
            } else {
              this.$message({
                message: "Update failed",
                type: "error"
              });
            }
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            this.getMerchant();
          });
      } else {
        api
          .createMerchant(item)
          .then(response => {
            if (response.ok) {
              this.$message({
                message: "Create sucess",
                type: "success"
              });
            } else {
              this.$message({
                message: "Create failed",
                type: "error"
              });
            }
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            this.getMerchant();
          });
      }
    },
    // 删除一个数据
    deleteTableItem(id) {
      api
        .deleteMerchantById(id)
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
          this.getMerchant();
        });
    },
    // 切换选中的选项
    toggleChosenItem(id) {
      const index = this.chosenItem.findIndex(x => x.id === id);
      if (index > -1) {
        // 有该选项则删除
        this.chosenItem.splice(index, 1);
      } else {
        // 无该选项则添加
        this.chosenItem.push(id);
      }
    },
    // 提交新增/修改表单
    submitForm() {
      // 校验表单
      // Element 表单校验规则配置，请查看https://element.eleme.cn/#/zh-CN/component/form
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 校验通过
          this.dialogFormVisible = false;
          this.updateTableItem(this.form);
        } else {
          // 校验失败
          return false;
        }
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getMerchant();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getMerchant();
    },
    getMerchant() {
      this.loading = true;
      api
        .getMerchantList({ offset: this.startIndex, limit: this.pageSize })
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
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    shownData() {
      return this.tableData.map(item => {
        return Object.assign(item, {
          register_date: moment(item.register_date).format("YYYY-MM-DD")
        });
      });
    }
  }
};
</script>

<style>
</style>
