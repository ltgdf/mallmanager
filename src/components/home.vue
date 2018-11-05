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
                <!-- ：index期待字符串类型的索引 -->
                <el-submenu :index="index +''" v-for="(item,index) in leftmenusArr" :key="index">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item :index="item2.path" v-for="(item2,index) in item.children" :key="index"><i class="el-icon-menu"></i>{{item2.authName}}</el-menu-item>
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
    data(){
        return {
            leftmenusArr:[]
        }
    },
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
        },
        // 左侧菜单权限
        async leftmenus(){
            const res = await this.$http.get('menus')
            console.log(res)
            const {data} = res.data
            this.leftmenusArr = data
        }
    },
    created(){
        this.leftmenus();
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
