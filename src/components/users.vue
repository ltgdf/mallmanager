<template>
<div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchval">
            <el-button slot="append" icon="el-icon-search" @click="checkUser()"></el-button>
        </el-input>
        <el-button type="success" plain @click="showAdduserbox()">添加用户</el-button>
    </div>

    <el-table :data="list" style="width: 100%" v-loading="loading">
        <el-table-column label="#" width="100" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="140">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">
                {{scope.row.create_time|dategs}}
            </template>
            <!-- 日期格式处理
                dategs
                过滤器可以用在两个地方：插值表达式和v-bind表达式
             -->
        </el-table-column>
        <el-table-column label="用户状态">
            <!-- 单元格中的内容不是字符串时，如果是其他组件比如开关，需要在这些组件外加个容器template 
            scope就是表格标签中的list数据
            scope.row就是list中的每个元素，这里是{}
            scope.row.mg_state就是开关要绑定的数据"
            -->
            <template slot-scope="scope">
                <!-- slot-scope用来传值的
                "scope"是随便的命名 -->
                <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.mg_state" @change="changeMgstate(scope.row)">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle plain @click="editUser(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle plain @click="deleteUser(scope.row)"></el-button>
                <el-button type="success" icon="el-icon-check" circle plain @click="showrolebox(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdduser">
        <el-form :model="formdata">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formdata.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="formdata.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formdata.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdduser = false">取 消</el-button>
            <el-button type="primary" @click="adduser()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdituse">
        <el-form :model="formdata">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="formdata.username" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="formdata.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdituse = false">取 消</el-button>
            <el-button type="primary" @click="editUsersss()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分配用户权限的对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisiblerolebox">
        <el-form :model="formdata">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                {{currenusername}}
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <!-- el-select的v-model绑定的值如果和el-option的value值 一样
                    就显示当前el-option的label
                    currRoleId 数值类型
                 -->
                <el-select v-model="currRoleId">
                    <!-- 请选择 -->
                    <el-option :value="-1" label="请选择" :disabled="true">

                    </el-option>
                    <!-- 遍历数组 -->
                    <el-option v-for="(item,index) in roles" :key="index" :label="item.roleName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisiblerolebox = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            loading: false,
            // 当前页的数据
            currentPage: 1,
            // 总数
            total: 0,
            //每页显示条数
            pagesize: 4,
            //当前页面
            pagenum: 1,
            // 查询关键字
            searchval: '',
            // 添加用户的对话框数据
            dialogFormVisibleAdduser: false,
            // 添加用户的表单数据
            formdata: {
                username: '',
                password: '',
                email: '',
                mobile: ''

            },
            // 添加用户的表单的宽度
            formLabelWidth: '120',
            // 编辑用户对话框
            dialogFormVisibleEdituse: false,
            // 分配用户权限对象框
            dialogFormVisiblerolebox: false,
            // 当前用户名
            currenusername: '',
            // 所有角色
            roles: [],
            // 当前角色id
            currRoleId: -1,
            // 用户ID
            userID: -1

        }
    },
    methods: {
        async loadTableDate() {
            // 请求之前加载动画开始
            this.loading = true;
            // 除了登录功能，其他功能的接口都需要加入token 才能请求
            const AUTH_TOKEN = sessionStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
            const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchval}`)
            // console.log(res)
            this.total = res.data.data.total
            const {
                meta: {
                    msg,
                    status
                },
                data: {
                    users
                }
            } = res.data
            if (status === 200) {
                // 请求到数据关闭加载动画
                this.loading = false;
                // console.log(users)
                this.list = users
                this.pagenum = 1;
                this.currentPage = 1;
            }
        },
        // 分页相关的方法
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.loadTableDate();
        },
        handleCurrentChange(val) {
            this.pagenum = val;
            this.loadTableDate();
            // console.log(`当前页: ${val}`);
        },
        //   查询用户方法
        checkUser() {
            this.loadTableDate();
        },
        // 改变用户状态     开关事件
        async changeMgstate(user) {
            const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
            const {
                meta: {
                    status,
                    msg
                }
            } = res.data
            if (status === 200) {
                // 提示框
                this.$message.success(msg)
            } else {}

        },
        // 删除用户
        deleteUser(user) {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`users/${user.id}`)
                // console.log(res)
                const {
                    msg,
                    status
                } = res.data.meta
                if (status === 200) {
                    //刷新表格
                    this.loadTableDate();
                    this.$message({
                        type: 'success',
                        message: msg
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: msg
                });
            });
        },
        // 添加用户（对话框显示）
        showAdduserbox() {
            // 显示添加用户的对话框
            this.dialogFormVisibleAdduser = true
        },
        // 编辑用户对话框显示
        async editUser(userid) {
            this.dialogFormVisibleEdituse = true
            const res = await this.$http.get(`users/${userid}`)
            // console.log(res)
            // console.log(res.data.data)
            this.formdata = res.data.data
            // console.log(this.formdata)

        },
        // 编辑用户发送请求
        async editUsersss() {

            const res = await this.$http.put(`users/${this.formdata.id}`, this.formdata)
            // console.log(res)
            const {
                msg,
                status
            } = res.data.meta;
            if (status === 200) {
                this.dialogFormVisibleEdituse = false;
                this.loadTableDate()
                this.$message.success(msg)
            }
        },
        // 分配角色权限对话框
        async showrolebox(user) {
            this.userID = user.id
            this.currenusername = user.username
            this.dialogFormVisiblerolebox = true
            const res = await this.$http.get('roles')
            // console.log(res)
            this.roles = res.data.data
            // console.log(this.roles)

            // 给当前的角色ID赋值
            const res2 = await this.$http.get(`users/${user.id}`)
            this.currRoleId = res2.data.data.rid

        },
        // 分配权限功能的发送请求
        async setRole() {
            const res = await this.$http.put(`users/${this.userID}/role`, {
                rid: this.currRoleId
            })
            // console.log(res)
            const {
                msg,
                status
            } = res.data.meta
            if (status === 200) {
                this.$message.success(msg)
                this.dialogFormVisiblerolebox = false;
                // 重置角色id   
                this.currRoleId = -1

            }
            //users/:id/role
        },
        // async deleteUser(user) {
        //     // console.log(user)
        //     const res = await this.$http.delete(`users/${user.id}`)
        //     console.log(res)
        //     // this.loadTableDate();
        //     const {
        //         msg,
        //         status
        //     } = res.data.meta
        //     console.log(status)
        //     if (status === 200) {

        //     }

        // }
        async adduser() {
            this.dialogFormVisibleAdduser = false
            const res = await this.$http.post('users', this.formdata)
            // console.log(res)
            const {
                msg,
                status
            } = res.data.meta
            if (status === 201) {
                // 刷新视图
                this.loadTableDate();
                // 提示消息
                this.$message.success(msg)
                // 清空表单  这两种方法都可以
                // this.formdata = {};
                for (const key in this.formdata) {
                    if (this.formdata.hasOwnProperty(key)) {
                        this.formdata[key] = ''
                    }
                }
            }
        },
    },

    created() {
        this.loadTableDate();
    }
}
</script>

<style>
.search {
    margin-top: 20px;
    margin-bottom: 10pxl
}

.input-with-select {
    width: 350px;
}
</style>
