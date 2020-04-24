<template>
  <el-row :gutter="20" style="margin-top: 200px;">
    <el-col :span="12" :offset="6">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
          <el-form :model="form" :rules="formRules" ref="form">
            <!-- el-form-item 绑定表单样式，label 表单的名称，formLabelWidth 设置 label 的宽度, 设置 prop 来进行规则校验 -->
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
              <el-button type="primary">注册</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import {setGlobalData} from 'utils/globalData';
import * as api from "@/api/index.js";
import elmManageStorage from "@/utils/localStorage";

// 下面是 Vue 组件
export default {
  data() {
    return {
      form: {}, // 用作表单绑定的内容
      formRules: {
        user_name: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { max: 16, message: "最大长度为16", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitLogin(item = {}) {
      api
        .adminLogin(item)
        .then(async response => {
          if (response.ok) {
            // 保存Token
            const token = await response.text();
            elmManageStorage.save({ token: token });
            // 跳转到里页
            this.$router.push({ name: "Home" });
          } else {
            const err = await response.json();
            throw err;
          }
        })
        .catch(error => {
          console.error(error);
          this.$message({
            message: "Login failed",
            type: "error"
          });
        });
    },
    // 提交新增/修改表单
    onSubmit() {
      // 校验表单
      // Element 表单校验规则配置，请查看https://element.eleme.cn/#/zh-CN/component/form
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 校验通过
          // 设置用户名
          this.submitLogin(this.form);
        } else {
          // 校验失败
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
