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
                <el-button type="success" plain @click="submitForm()">查询</el-button>
                <el-button type="info" plain @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="date"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="工作单位"
                        width="240">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="专长">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="职务">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="电话">
                </el-table-column>

                <el-table-column label="操作" width="240" >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                type="text"
                                size="mini"

                                @click="handleDelete(scope.$index, scope.row)">删除
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
                        :page-size="4"
                        layout="total, prev, pager, next,sizes"
                        :total="10">
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import qs from "qs";
    import axios from "axios";
    export default {
        computed: {
            ...mapState('Experts', ["open"])
        },
        name: "Experts",
        data() {
            return {
                tableData: [{}],
                ruleForm: {
                    name: '',
                    specialties: '',
                    work: '',
                },
                currentPage1: 5,
            }
        },
        methods: {
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
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleEdit(index, row) {

                console.log(row,index)

            },
            async handleDelete(index, row) {
                console.log(index,row)
                await axios({
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    url: "",
                    method: "post",
                    data: qs.stringify({


                    })
                });

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
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