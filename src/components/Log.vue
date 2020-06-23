<template>
    <div>
        <!--查询-->
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="日期范围">
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="起始日期" v-model="ruleForm.startDate" value-format="yyyy-MM-dd"   style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align: right">——</el-col>
                <el-col :span="8" style="margin-left: 12px">
                    <el-date-picker type="date" placeholder="结束日期" v-model="ruleForm.endDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="success" plain @click="submitForm()">查询</el-button>
            </el-form-item>
        </el-form>
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        prop="loginfo"
                        label="日志"
                        width="350">
                </el-table-column>
                <el-table-column
                        prop="logdata"
                        label="日期"
                        width="150">
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
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    // import qs from "qs";
    import axios from "axios";
    export default {
        components: {
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
                startDate:1,
                endDate:1
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
            },

            async showPestData() {
                let response = await axios({
                    url: '/forest_sys/showlog',
                    method: "get",
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                    }
                });
                console.log(response.data)
                // this.currentPage1 = response.data.pageNum
                this.total = response.data.total;
                this.pageSize = response.data.pageSize;
                this.tableData = response.data.list;


            },

            async submitForm() {

                this.currentPage = 1
                let response = await axios({
                    url: '/forest_sys/seeklog',
                    method: "get",
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                        startDate: this.ruleForm.startDate,
                        endDate:this.ruleForm.endDate
                    }
                });
                console.log(response.data)
                // this.currentPage1 = response.data.pageNum
                this.total = response.data.total;
                this.pageSize = response.data.pageSize;
                this.tableData = response.data.list;
            },

            async handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                let response = await axios({
                    url: '/forest_sys/showlog',
                    method: "get",
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                    }
                });
                console.log(response.data)
                this.currentPage1 = response.data.pageNum
                this.total = response.data.total;
                this.pageSize = response.data.pageSize;
                this.tableData = response.data.list;
            },
            async handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                let response = await axios({
                    url: '/forest_sys/showlog',
                    method: "get",
                    params: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                    }
                });
                console.log(response.data)
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
    #title {
        font-size: 28px;
        text-align: center;
        margin-bottom: 25px;
    }

    .titleSub {
        margin-right: 120px;
        display: inline;
    }


</style>