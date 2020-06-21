<template>
    <div>
        <!--查询-->
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="查询专家信息" prop="">
                <el-input v-model="ruleForm.name" placeholder="姓名" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item label="专长" prop="">
                <el-input v-model="ruleForm.specialties" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item label="工作单位" prop="">
                <el-input v-model="ruleForm.work" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" plain @click="submitForm('ruleForm')">查询</el-button>
                <el-button type="info" plain @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
       <!-- //添加按钮-->
        <div>
            <el-button type="success" icon=" el-icon-plus" plain @click="openadds">添加专家</el-button>
            <addExperts :openadd.sync="openadd"></addExperts>
        </div>
        <template>
            <el-table
                    :data="expertspage.list"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="expertsName"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="work"
                        label="工作单位"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="specialties"
                        label="专长"
                        width="110">

                </el-table-column>
                <el-table-column
                        prop="duty"
                        label="职务"
                        width="110">
                </el-table-column>
                <el-table-column
                        width="200"
                        prop="telephone"
                        label="电话">
                </el-table-column>

                <el-table-column label="操作"  >
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-share"
                                @click="handleShow( scope.row)">详情
                        </el-button>
                        <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                @click="handleEdit( scope.row)">编辑
                        </el-button>
                        <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                plain
                                @click="handleDelete( scope.row)">删除
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
                        :page-size="size"
                        layout="total, prev, pager, next,sizes"
                        :total="expertspage.total">
                </el-pagination>
            </div>
        </template>
        <updateExperts :openUpdate.sync="openUpdate"></updateExperts>
        <showExperts :openShow.sync="openShow"></showExperts>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex';
    import qs from "qs";
    import axios from "axios";
    import addExperts from './ExpertsOperation/addExperts.vue'
    import updateExperts from './ExpertsOperation/updateExperts.vue'
    import showExperts from './ExpertsOperation/showExperts.vue'
    export default {
        components:{
            addExperts,
            updateExperts,
            showExperts
        },
        computed: {
            ...mapState('Experts', ["expertspage","open"])
        },
        name: "Experts",
        data() {
            return {
             //   tableData: [{}],
                //控制添加组件是否显示
                openadd:false,
                openUpdate:false,
                openShow:false,
                ruleForm: {
                    name: '',
                    specialties: '',
                    work: '',
                },
                size:4
            }
        },
        created(){
            this.setExperts({currentpage:1,pagesize:4,name:this.ruleForm.name,specialties:this.ruleForm.specialties,work:this.ruleForm.work});
        },
        methods: {
            ...mapActions('Experts',["setExperts","setExp","setshowExperts"]),
            openadds(){
                this.openadd=true;
            },
            tableRowClassName({row, rowIndex}) {
                console.log(this.open)
                console.log(row);
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.setExperts({
                            currentpage:1
                            ,pagesize:this.size,
                            name:this.ruleForm.name,
                            specialties:this.ruleForm.specialties,
                            work:this.ruleForm.work
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleShow( row){
                //详情
                this.setshowExperts(row.id);
                this.openShow=true;
                console.log(row)
            },
             handleEdit( row) {
                this.setExp(row.id);
                this.openUpdate=true;

                console.log(row.id +"===========")

            },
            async handleDelete( row) {
                //删除使用
                console.log(row)

                //先确认
                this.$confirm('此操作将删除该专家, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {


                    await axios({
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        url: "/forest_sys/deleteExperts",
                        method: "post",
                        data: qs.stringify({
                            expertsId:row.id

                        })
                    }).then(
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    )

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });




            },
            handleSizeChange(val) {
                this.size=val;
                this.setExperts({currentpage:1,
                    pagesize:val,
                    name:this.ruleForm.name,
                    specialties:this.ruleForm.specialties,
                    work:this.ruleForm.work
                });
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.setExperts({currentpage:val
                    ,pagesize:this.size,
                    name:this.ruleForm.name,
                    specialties:this.ruleForm.specialties,
                    work:this.ruleForm.work
                });
                console.log(`当前页: ${val}`);
            }
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
</style>