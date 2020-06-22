<template>
    <div>
        <!--出库-->

        <h1 id="title">日志信息</h1>
        <!--查询-->
        <el-form :model="form" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="日期范围">
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="起始日期" v-model="form.startDate" value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align: right">——</el-col>
                <el-col :span="8" style="margin-left: 12px">
                    <el-date-picker type="date" placeholder="结束日期" v-model="form.endDate" value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-button type="success" icon="el-icon-search" plain @click="query()">查询</el-button>
        </el-form>


        <!--初始化-->
        <template>
            <el-table
                    :data="tableData"
                    @row-click="tableClick"
                    :cell-style="tableStyle"
                    :row-class-name="tableRowClassName"
                    style="width: 800px;height: 357px;left: 50px">
                <el-table-column prop="loginfo" label="日志类容" width="180"></el-table-column>
                <el-table-column prop="logdata" label="日期" width="180"></el-table-column>

            </el-table>
        </template>

        <!--主页面分页-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page=currentPage
                    :page-sizes="[3, 5, 10]"
                    :page-size=pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=totalPage>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapMutations, mapState} from 'vuex';

    export default {
        name: "log",
        data() {
            return {
                form: {
                    loginfo: '',
                    logdata: '',
                    className: '',
                },
                tableData: [],
                currentPage: 1,
                pageSize: 3,
                totalPage: 0,
                loginfo: '',    //日志类容
                logdata: '', //日期
            }
        },
        methods: {
            async query() {    //查询
                let response = await axios({
                    url: '/forest_sys/seeklog',
                    method: 'get',
                    params: {
                        startDate: this.form.startDate,
                        endDate: this.form.endDate,
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                });
                this.tableData = this.formattingDate(response.data.list);
                this.currentPage = response.data.pageNum,
                    this.pageSize = response.data.pageSize,
                    this.totalPage = response.data.total
            },
            formattingDate(arr) {   //格式化时间
                for (let i = 0; i < arr.length; i++) {
                    arr[i].date = arr[i].date.substring(0, arr[i].date.indexOf(" "));
                }
                return arr;
            },
            async tableInit(currentPage = 1, pageSize = 3) {    //初始化表格
                let response = await axios({
                    url: '/forest_sys/showlog',
                    method: 'get',
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize
                    }
                });
                // console.log(response)
                this.tableData = this.formattingDate(response.data.list);
                this.currentPage = response.data.pageNum;
                this.pageSize = response.data.pageSize;
                this.totalPage = response.data.total
            },
        },


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