<template>
<el-card class="box-card">
    <mybread leavel1="权限管理" leavel2="角色列表"></mybread>
    <el-row>
        <el-col :span="24">
            <el-button class="solebutton" type="primary" plain>添加角色</el-button>
        </el-col>
    </el-row>

    <el-table :data="list" style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-row v-for="(item,index) in scope.row.children" :key="index">
                    <el-col :span="4">
                        <el-tag @close="deleterole(scope.row,item.id)" closable type="success">{{item.authName}}</el-tag>
                        <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                        <el-row class="ys" v-for="(item2,index) in item.children" :key="index">
                            <el-col :span="4">
                                <el-tag @close="deleterole(scope.row,item2.id)" closable>{{item2.authName}}</el-tag>
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                            <el-col :span="20">
                                <el-tag @close="deleterole(scope.row,item3.id)" class="ys2" type="warning" closable v-for="(item3,index) in item2.children" :key="index">{{item3.authName}}</el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-ro v-if="scope.row.children.length===0">
                    未分配任何权限
                </el-ro>
            </template>
        </el-table-column>
        <el-table-column label="#" type="index" width="80">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc">
        </el-table-column>
        <el-table-column label="操作" prop="desc">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle plain></el-button>
                <el-button type="danger" icon="el-icon-delete" circle plain></el-button>
                <el-button type="success" icon="el-icon-check" circle plain @click="setrole(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="40%">
        <template slot-scope="scopr">
            <!-- 树型结构 -->
            <el-tree ref="checkkey" :data="treelist" :props="defaultProps" show-checkbox node-key="id" :default-checked-keys="checkedArr" :default-expanded-keys="expandedArr"></el-tree>
        </template>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="setright()">确 定</el-button>
  </span>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            dialogVisible: false,
            treelist: [],
            // 树状选中的节点id
            checkedArr: [],
            //树状展开节点的id数组
            expandedArr: [],
            defaultProps: {
                // children 和 authName 是treelist数组中要用的数据的key名
                children: 'children',
                label: 'authName',
                //角色ID
                roleId: -1

            }

        }
    },
    methods: {
        async getAllroles() {
            const res = await this.$http.get('roles')
            // console.log(res)
            this.list = res.data.data
        },
        // 删除权限
        async deleterole(useri, rightId) {
            const res = await this.$http.delete(`roles/${useri.id}/rights/${rightId}`)
            // console.log(useri)
            // console.log(res)
            const {
                meta: {
                    msg,
                    status
                }
            } = res.data
            //roles/:roleId/rights/:rightId
            // roleID角色ID  scope.row.id
            // rightID权限ID scope.row.children.id
            if (status === 200) {
                this.$message.success(msg)
                // this.getAllroles()
                // 一删除成功只是更新当前的children -》 scope.row
                // 返回的响应中有当前角色剩余的权限
                useri.children = res.data.data

            }
        },
        // 分配权限的弹出窗口 + 请求权限列表数据
        async setrole(role) {
            // 给roleId赋值
            this.roleId = role.id
            // 弹出对话框
            this.dialogVisible = true
            const res = await this.$http.get('rights/tree')
            // console.log(res)
            this.treelist = res.data.data
            //expandedArr赋值
            const arr = res.data.data
            const newarr = []
            arr.forEach(item1 => {
                newarr.push(item1.id)
                item1.children.forEach(item2 => {
                    newarr.push(item2.id)
                    item2.children.forEach(item3 => {
                        newarr.push(item3.id)
                    })
                })
            });
            // console.log(newarr)
            // 默认展开的数组
            this.expandedArr = newarr
            // 默认选中的数组
            //this.checkedArr
            // console.log(role)
            const newarr2 = []
            role.children.forEach(item1 => {
                // newarr2.push(item1.id)
                item1.children.forEach(item2 => {
                    // newarr2.push(item2.id)
                    item2.children.forEach(item3 => {
                        newarr2.push(item3.id)
                    })
                })
            })
            // console.log(newarr2)
            this.checkedArr = newarr2

        },
        // 修改权限 - 发送修改权限的请求
        async setright() {
            this.dialogVisible = false;
            //roles/:roleId/rights  :roleId	角色 ID	不能为空携带在url中
            //rids	权限 ID 列表	以 , 分割的权限 ID 列表
            // const res = await 
            //getCheckedKeys() 获取选中节点的ID值方法
            //getHalfCheckedKeys() 获取半选中节点的ID值方法
            const arrcheck = this.$refs.checkkey.getCheckedKeys()
            const arrhalfcheck = this.$refs.checkkey.getHalfCheckedKeys()
            // 合并两个数组
            const arraylt = [...arrcheck, ...arrhalfcheck]

            const res = await this.$http.post(`roles/${this.roleId}/rights`, {
                rids: arraylt.join(',')
            })
            // console.log(res)
            const {
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 200) {
                this.$message.success(msg)
                // 刷新页面
                this.getAllroles()
            }
        }
    },
    created() {
        this.getAllroles()
    }

}
</script>

<style>
.box-card {
    height: 100%;
}

.solebutton {
    margin-top: 20px;
}

.ys {
    margin-bottom: 8px;
}

.ys2 {
    margin-right: 6px;
    margin-bottom: 4px;
}
</style>
