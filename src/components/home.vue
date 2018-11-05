<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <img src="@/assets/logo.png" alt="">
            </el-col>
                <el-col :span="16">
                    <h2 class="middle">电商后台管理系统</h2>
                </el-col>
                <el-col :span="4">
                    <a href="#" class="logout" @click.prevent="logout()">退出</a>
                </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <el-menu default-active="users" class="el-menu-vertical-demo" :unique-opened="true" :router="true">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="users"><i class="el-icon-menu"></i>用户列表</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="roles"><i class="el-icon-menu"></i>角色列表</el-menu-item>
                    <el-menu-item index="rights"><i class="el-icon-menu"></i>权限列表</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="3-1"><i class="el-icon-menu"></i>选项1</el-menu-item>
                    <el-menu-item index="3-2"><i class="el-icon-menu"></i>选项2</el-menu-item>
                    <el-menu-item index="3-3"><i class="el-icon-menu"></i>选项3</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="4-1"><i class="el-icon-menu"></i>选项1</el-menu-item>
                    <el-menu-item index="4-2"><i class="el-icon-menu"></i>选项2</el-menu-item>
                    <el-menu-item index="4-3"><i class="el-icon-menu"></i>选项3</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="5-1"><i class="el-icon-menu"></i>选项1</el-menu-item>
                    <el-menu-item index="5-2"><i class="el-icon-menu"></i>选项2</el-menu-item>
                    <el-menu-item index="5-3"><i class="el-icon-menu"></i>选项3</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-main class="main" id="main">
            <!-- 卡片 -->
            <el-card class="box-card">
                <router-view></router-view>
            </el-card>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    // 判断用户登录
    mounted() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            this.$router.push('/login');
            this.$message.warning('请先登录')
        } else {
            this.$message.success('登录成功')
            this.$router.push('/')
        }
    },
    methods: {
        logout() {
            sessionStorage.clear();
            this.$router.push('/login')
            this.$message.success('退出成功')
        }
    }
}
</script>

<style>
.container {
    /* width: 100%; */
    height: 100%
}

.header {
    background-color: #b3c0d1;
    /* text-align: center; */
    overflow: hidden;
}

.header .middle {
    color: #fff;
    text-align: center;
    line-height: 20px;
}

.header .logout {
    text-decoration: none;
    line-height: 60px;
    padding-left: 190px;
}

.aside {
    background-color: #d3dce6;
    height:100%
}

.main {
    background-color: #e9eef3;
    height: 100%;
    /* text-align: center; */
}

#main {
    height: 100%;
}

.box-card {
    height: 100%;
}
</style>
