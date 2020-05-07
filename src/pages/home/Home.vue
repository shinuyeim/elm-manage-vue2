<template>
    <el-container style="border: 1px solid #eee; min-height: 100%;">
        <el-aside style="background-color: #545c64;width:auto;">
            <!-- 使用 Menu 组件，传入变量 isMenuCollapse -->
            <Menu :isMenuCollapse="isMenuCollapse" />
        </el-aside>

        <el-container>
            <el-header>
                <!-- 点击切换收起左侧菜单 -->
                <el-button
                    @click="isMenuCollapse = !isMenuCollapse"
                    style="font-size: 24px;padding: 5px 8px;"
                >
                    <i
                        :class="
                            isMenuCollapse
                                ? 'el-icon-s-unfold'
                                : 'el-icon-s-fold'
                        "
                    ></i>
                </el-button>
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px">
                        <span>欢迎回来，{{ user_name }}</span>
                    </i>
                    <el-dropdown-menu slot="dropdown">
                        <!-- 点击退出登录，el-dropdown-item 中需要加 .native 才能获取到点击事件 -->
                        <el-dropdown-item width="100" @click.native="logout()"
                            >退出</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>

            <el-main>
                <!-- 子路由界面 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Menu from "../../components/Menu.vue";
import elmManageStorage from "@/utils/localStorage";

export default {
    name: "app",
    data: () => {
        return {
            user_name: "",
            isMenuCollapse: true // 是否收起左侧菜单
        };
    },
    mounted() {
        this.user_name = elmManageStorage.fetch("name");
    },
    components: {
        Menu
    },
    methods: {
        logout() {
            elmManageStorage.clear();
            this.$router.push({ name: "Login" });
        }
    }
};
</script>

<style scoped>
body {
    margin: 0;
}
.el-header {
    color: #333;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: right;
    font-size: 12px;
    background-color: #ededed;
}
</style>
