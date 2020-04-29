<template>
    <div>
        <section v-loading="loading" element-loading-text="Loading...">
            <el-row>
                <el-col :span="24">
                    <!-- 删除过程中，不允许其他操作 -->
                    <el-button
                        v-if="!showDeleteCheckbox"
                        @click="
                            dialogFormNewVisible = true;
                            form = {};
                        "
                        type="primary"
                        >新增</el-button
                    >
                    <el-button
                        v-if="!showDeleteCheckbox"
                        @click="showDeleteCheckbox = true"
                        type="danger"
                        >删除</el-button
                    >
                    <!-- 删除过程中，只出现确认删除按钮 -->
                    <el-button
                        v-if="showDeleteCheckbox"
                        @click="
                            deleteTableItem(chosenItem);
                            showDeleteCheckbox = false;
                            chosenItem = [];
                        "
                        type="danger"
                        >确认删除</el-button
                    >
                    <el-button
                        v-if="showDeleteCheckbox"
                        @click="showDeleteCheckbox = false"
                        >取消</el-button
                    >
                </el-col>
            </el-row>
            <el-table
                stripe
                :data="shownData"
                style="width:100%"
                :default-sort="{ prop: 'register_date', order: 'descending' }"
            >
                <!-- <el-table-column prop="_id" label="id" width="100" sortable></el-table-column> -->
                <el-table-column
                    fixed
                    prop="name"
                    label="店铺名称"
                    min-width="100"
                    sortable
                >
                    <template slot-scope="scope">
                        <!-- el-checkbox 多选框，checked 绑定是否选中，click 绑定点击事件 -->
                        <el-checkbox
                            v-if="showDeleteCheckbox"
                            :checked="chosenItem.indexOf(scope.row._id) > -1"
                            @change="toggleChosenItem(scope.row._id)"
                            style="margin-right: 5px;"
                        ></el-checkbox>
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="register_date"
                    label="注册日期"
                    min-width="100"
                    sortable
                ></el-table-column>
                <el-table-column
                    prop="phone"
                    label="联系电话"
                    min-width="100"
                ></el-table-column>
                <el-table-column label="店铺介绍" min-width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top" width="500">
                            <p>店铺名称: {{ scope.row.name }}</p>
                            <p>店铺地址: {{ scope.row.address }}</p>
                            <p>店铺介绍: {{ scope.row.introduction }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{
                                    scope.row.name
                                }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="delivery_cost"
                    label="配送费"
                    min-width="100"
                ></el-table-column>
                <el-table-column
                    prop="min_delivery_price"
                    label="最小配送费"
                    min-width="100"
                ></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <!-- 删除过程中，禁用其他操作 -->
                        <el-button
                            :disabled="showDeleteCheckbox"
                            @click="
                                form = { ...scope.row };
                                dialogFormUpdateVisible = true;
                            "
                            type="info"
                            size="small"
                            >编辑</el-button
                        >
                        <el-button
                            :disabled="showDeleteCheckbox"
                            @click="deleteTableItem([scope.row._id])"
                            type="danger"
                            size="small"
                            >删除</el-button
                        >
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
        <el-dialog title="新增" :visible.sync="dialogFormNewVisible">
            <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
            <el-form :model="form" status-icon :rules="formNewRules" ref="form">
                <el-form-item
                    label="用户名"
                    :label-width="formLabelWidth"
                    prop="user_name"
                >
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    :label-width="formLabelWidth"
                    prop="password"
                >
                    <el-input
                        v-model="form.password"
                        type="password"
                        show-password
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="确认密码"
                    :label-width="formLabelWidth"
                    prop="checkPass"
                >
                    <el-input
                        v-model="form.checkPass"
                        type="password"
                        show-password
                    ></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <!-- 点击取消的时候，设置弹窗不可见 -->
                <el-button @click="dialogFormNewVisible = false"
                    >取 消</el-button
                >
                <!-- 点击确定的时候，设置弹窗不可见，同时添加一项内容 -->
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="dialogFormUpdateVisible">
            <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
            <el-form
                :model="form"
                status-icon
                :rules="formUpdateRules"
                ref="form"
            >
                <!-- el-form-item 绑定表单样式，label 表单的名称，formLabelWidth 设置 label 的宽度, 设置 prop 来进行规则校验 -->
                <el-form-item
                    label="日期"
                    :label-width="formLabelWidth"
                    prop="register_date"
                >
                    <!-- 里面装载表单元素，这里装了个选择日期的组件，v-model 绑定选择值，value-format设置绑定值的格式，type 设置选择的范围，这里 date 表示到天 -->
                    <el-date-picker
                        v-model="form.register_date"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="注册日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item
                    label="店铺名称"
                    :label-width="formLabelWidth"
                    prop="name"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="联系电话"
                    :label-width="formLabelWidth"
                    prop="phone"
                >
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item
                    label="店铺介绍"
                    :label-width="formLabelWidth"
                    prop="introduction"
                >
                    <el-input v-model="form.introduction"></el-input>
                </el-form-item>
                <el-form-item
                    label="店铺地址"
                    :label-width="formLabelWidth"
                    prop="address"
                >
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item
                    label="配送费"
                    :label-width="formLabelWidth"
                    prop="delivery_cost"
                >
                    <el-input v-model="form.delivery_cost"></el-input>
                </el-form-item>
                <el-form-item
                    label="最小配送费"
                    :label-width="formLabelWidth"
                    prop="min_delivery_price"
                >
                    <el-input v-model="form.min_delivery_price"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <!-- 点击取消的时候，设置弹窗不可见 -->
                <el-button @click="dialogFormUpdateVisible = false"
                    >取 消</el-button
                >
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
import eachLimit from "async/eachLimit";
import { formValidatePassword, formValidateUsername } from "@/utils/validator";

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
            formNewRules: {
                user_name: [
                    {
                        required: true,
                        validator: formValidateUsername,
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        validator: formValidatePassword,
                        trigger: "blur"
                    },
                    { validator: validatePass, trigger: "blur" }
                ],
                checkPass: [
                    {
                        required: true,
                        message: "请再次输入密码",
                        trigger: "change"
                    },
                    { validator: validatePass2, trigger: "blur" }
                ]
            },
            loading: true,
            tableData: [],
            totalCount: 0,
            dialogFormNewVisible: false, // 弹窗是否出现
            dialogFormUpdateVisible: false, // 弹窗是否出现
            currentPage: 1,
            pageSize: 20,
            formLabelWidth: "120px", // 表单 label 的宽度
            showDeleteCheckbox: false, // 是否批量删除
            chosenItem: [], // 选中的选项
            formUpdateRules: {
                register_date: [
                    {
                        type: "string",
                        required: true,
                        message: "请选择注册日期",
                        trigger: "change"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "请输入店铺名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在 2 到 20 个字",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入联系电话",
                        trigger: "blur"
                    }
                ],
                introduction: [
                    {
                        required: true,
                        message: "请输入店铺介绍",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        required: true,
                        message: "请输入店铺地址",
                        trigger: "blur"
                    }
                ],
                delivery_cost: [
                    {
                        message: "配送费",
                        trigger: "blur"
                    }
                ],
                min_delivery_price: [
                    {
                        message: "最小配送费",
                        trigger: "blur"
                    }
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
            if (undefined !== item._id) {
                const id = item._id;
                delete item._id;
                api.updataMerchantById(id, item)
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
                api.createMerchant(item)
                    .then(async response => {
                        if (response.ok) {
                            this.$message({
                                message: "Create success",
                                type: "success"
                            });
                        } else {
                            const err = await response.json();
                            throw err;
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        this.$message({
                            message: "Create failed",
                            type: "error"
                        });
                    })
                    .finally(() => {
                        this.getMerchant();
                    });
            }
        },
        // 删除数据
        deleteTableItem(idArr) {
            // async.eachLimit(arr, limit, iterator, callback)
            eachLimit(
                idArr,
                3,
                (idItem, cb) => {
                    api.deleteMerchantById(idItem)
                        .then(async response => {
                            if (response.ok) {
                                this.$message({
                                    message: "Delete sucess",
                                    type: "success"
                                });
                            } else {
                                const err = await response.json();
                                throw err;
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            this.$message({
                                message: "Delete failed",
                                type: "error"
                            });
                        })
                        .finally(cb);
                },
                this.getMerchant()
            );
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
            api.getMerchantList({
                offset: this.startIndex,
                limit: this.pageSize
            })
                .then(async response => {
                    const respData = await response.json();
                    if (response.ok) {
                        this.$message({
                            message: "Get sucess",
                            type: "success"
                        });
                        return respData;
                    } else {
                        throw respData;
                    }
                })
                .then(jsonData => {
                    this.totalCount = jsonData.metadata.Total;
                    this.tableData = jsonData.data;
                })
                .catch(error => {
                    console.error(error);
                    this.$message({
                        message: "Get failed",
                        type: "error"
                    });
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
                    register_date: moment(item.register_date).format(
                        "YYYY-MM-DD"
                    )
                });
            });
        }
    }
};
</script>

<style></style>
