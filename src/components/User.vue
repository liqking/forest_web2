<template>
    <div>
        <!--查询-->
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-select v-model="ruleForm.usergrade" placeholder="所有用户">
                <el-option label="所有用户" value="所有用户"></el-option>
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="资料管理员" value="资料管理员"></el-option>
                <el-option label="灾情管理员" value="灾情管理员"></el-option>
                <el-option label="专家管理员" value="专家管理员"></el-option>
                <el-option label="库房管理员" value="库房管理员"></el-option>
            </el-select>
            <el-form-item>
                <el-button type="success" plain @click="submitForm()">查询</el-button>
                <el-button type="success" icon=" el-icon-plus" plain @click="openadds">添加用户</el-button>
                <addUser :openadd.sync="openadd"></addUser>

            </el-form-item>
        </el-form>
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="username"
                        label="用户名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="userpwd"
                        label="密码"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="usergrade"
                        label="等级">
                </el-table-column>
                <el-table-column
                        prop="userrealname"
                        label="真实姓名">
                </el-table-column>


                <el-table-column label="操作" width="240" >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                type="text"
                                size="mini"
                                @click="myconfirm( scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template>
            <!--分页-->
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[2,4,6]"
                        :page-size="pageSize"
                        layout="total, prev, pager, next,sizes"
                        :total="total">
                </el-pagination>
            </div>
        </template>
        <updateUser :openupdate.sync="openupdate"></updateUser>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    // import qs from "qs";
    import axios from "axios";
    import addUser from "./ExpertsOperation/addUser";
    import updateUser from "./ExpertsOperation/updateUser";
    export default {
        components: {
            addUser,
            updateUser
        },
        provide(){
            return{
                submitForm:this.submitForm
            }
        },
        computed: {
            ...mapState('Experts', ["open"])
        },
        name: "User",
        data() {
            return {
                openadd :false,
                openupdate:false,
                tableData: [{}],
                ruleForm: {
                    usergrade: '',
                },
                pageSize: 4,
                currentPage:1,
                total: 0,
                // currentPage1: 5,
            }
        },
        methods: {

            tableRowClassName({ rowIndex}) {
                // console.log(this.open)
                // console.log(row);
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            openadds() {
                this.openadd = true;
                // this.submitForm()
            },

            async showPestData() {
                let response = await axios({
                    url: '/forest_sys/seekuser',
                    method: "get",
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        usergrade: this.ruleForm.usergrade
                    }
                });
                console.log(response.data.size)
                if(response.data.size==1){
                    this.currentPage -=1;
                }
                // this.currentPage1 = response.data.pageNum
                this.total = response.data.total;
                this.pageSize = response.data.pageSize;
                this.tableData = response.data.list;
            },

            async submitForm() {

                this.currentPage = 1
                let response = await axios({
                    url: '/forest_sys/seekuser',
                    method: "get",
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        usergrade: this.ruleForm.usergrade
                    }
                });
                console.log(response.data)
                // this.currentPage1 = response.data.pageNum
                this.total = response.data.total;
                this.pageSize = response.data.pageSize;
                this.tableData = response.data.list;
            },
            //编辑
            async handleEdit(row) {
                let response = await axios({
                    url: '/forest_sys/showuserinfo',
                    method: "get",
                    params: {
                        username: row.username
                    }
                });
                console.log(response.data)
                this.$store.commit('set_thisname', response.data.username)
                this.$store.commit('set_userrealname',response.data.userrealname)
                this.$store.commit('set_thisusergrade',response.data.usergrade)
                this.openupdate = true;
            },
            myconfirm (row) {
                if(confirm('确定要删除吗')==true){
                    this.handleDelete(row)
                }
            },
            //删除

            async handleDelete(row) {
                console.log(row.username)
                await axios({
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    url: "/forest_sys/removeuser",
                    method: "get",
                    params: {
                        username: row.username,
                    }
                });

                this.showPestData()
            },
            async handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                let response = await axios({
                    url: '/forest_sys/seekuser',
                    method: "get",
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        usergrade: this.ruleForm.usergrade
                    }
                });
                console.log(response.data)
                this.currentPage1 = response.data.pageNum
                this.total = response.data.total;
                this.pageSize = response.data.pageSize;
                this.tableData = response.data.list;
            },
            async handleCurrentChange(val) {
                this.currentPage = val
                let response = await axios({
                    url: '/forest_sys/seekuser',
                    method: "get",
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        usergrade: this.ruleForm.usergrade
                    }
                });
                this.currentPage1 = response.data.pageNum
                this.total = response.data.total;
                this.pageSize = response.data.pageSize;
                this.tableData = response.data.list;
            }
        },
        mounted: function () {
            this.showPestData();
            // this.$on("closeAdd",this.setAddClose())
        }
    }
</script>

<style scoped>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>