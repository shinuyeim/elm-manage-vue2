<template>
  <el-row :gutter="20" style="margin-top: 200px;">
    <el-col :span="12" :offset="6">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
          <el-form :model="form" status-icon :rules="formRules" ref="form">
            <!-- el-form-item 绑定表单样式，label 表单的名称，formLabelWidth 设置 label 的宽度, 设置 prop 来进行规则校验 -->
            <el-form-item label="用户名" prop="user_name">
              <el-input v-model="form.user_name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input v-model="form.checkPass" type="password" show-password></el-input>
            </el-form-item>
            <el-button type="primary" @click="toLogin">登录</el-button>
            <el-button type="primary" @click="onSubmit">注册</el-button>
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { formValidatePassword, formValidateUsername } from "@/utils/validator";
import * as api from "@/api/index.js";

// 下面是 Vue 组件
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.form.checkPass !== "") {
        this.$refs.form.validateField("checkPass");
      }
      callback();
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        user_name: "",
        password: "",
        checkPass: ""
      }, // 用作表单绑定的内容
      formRules: {
        user_name: [
          { required: true, validator: formValidateUsername, trigger: "blur" }
        ],
        password: [
          { required: true, validator: formValidatePassword, trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "change" },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitRegister(item = {}) {
      api
        .adminRegister(item)
        .then(async response => {
          if (201 === response.status) {
            this.$message({
              message: "Register success",
              type: "success"
            });
            // 跳转到里页
            this.$router.push({ name: "Login" });
          } else {
            const err = await response.json();
            throw err;
          }
        })
        .catch(error => {
          console.error(error);
          this.$message({
            message: "Register failed",
            type: "error"
          });
        });
    },
    // 提交新增/修改表单
    onSubmit() {
      //   校验表单
      //   Element 表单校验规则配置，请查看https://element.eleme.cn/#/zh-CN/component/form
      this.$refs["form"].validate(valid => {
        if (valid) {
          // 校验通过
          // 设置用户名
          this.submitRegister(this.form);
        } else {
          // 校验失败
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style>
</style>
