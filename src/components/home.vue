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
                    <a href="#" class="logout">退出</a>
                </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <!-- 左侧边栏 -->
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
           </el-submenu>
        </el-aside>
        <el-main class="main">Main</el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

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
    line-height: 25px;
}

.header .logout {
    text-decoration: none;
    line-height: 60px;
    padding-left: 190px;
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
    height: 100%;
    /* text-align: center; */
}
</style>
