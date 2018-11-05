<template>
<el-card class="box-card">
    <mybread leavel1="权限管理" leavel2="权限列表"></mybread>

    <el-table :data="list" border style="width: 100%" class="ttable">
        <el-table-column type="index" label="#" width="80">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="120">
        </el-table-column>
        <el-table-column prop="level" label="层级">
            <template slot-scope="scope">
                <span v-if="scope.row.level==='0'">一级</span>
                <span v-else-if="scope.row.level==='1'">二级</span>
                <span v-else-if="scope.row.level==='2'">三级</span>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getAllrole() {
            const res = await this.$http.get('rights/list')
            // console.log(res)
            this.list = res.data.data
        }
    },
    created() {
        this.getAllrole()
    }
}
</script>

<style>
.box-card {
    height: 100%;
}
.ttable {
    margin-top: 30px;
}
</style>
