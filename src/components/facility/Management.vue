<template>
    <div>
        <!--出库-->

        <h1 id="title">药剂/机械出库管理</h1>
        <!--查询-->
        <el-form :model="form" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="日期范围">
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="起始日期" v-model="form.startDate" value-format="yyyy-MM-dd"   style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align: right">——</el-col>
                <el-col :span="8" style="margin-left: 12px">
                    <el-date-picker type="date" placeholder="结束日期" v-model="form.endDate" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="领用小班" style="margin-left: -140px">
                <el-input v-model="form.className"></el-input>
            </el-form-item>
            <el-button type="success" icon="el-icon-edit" @click="query()">查询</el-button>
        </el-form>

        <!--查看出库信息-->
        <el-button type="success" icon="el-icon-edit" @click="dialogTableVisible = true">查看出库信息</el-button>
        <el-dialog title="查看出库信息" :visible.sync="dialogTableVisible" style="text-align: center">
            <div style="margin-bottom: 50px">
                <p class="titleSub">领用小班：<label></label></p>
                <p class="titleSub">出库人：<label></label></p>
                <p class="titleSub">领用日期：<label></label></p>
            </div>

            <el-table :data="gridData">
                <el-table-column property="date" label="物品名称" width="150"></el-table-column>
                <el-table-column property="name" label="类型" width="150"></el-table-column>
                <el-table-column property="date" label="防治类型" width="150"></el-table-column>
                <el-table-column property="name" label="领用数量" width="150"></el-table-column>
            </el-table>
        </el-dialog>

        <!--初始化-->
        <template>
            <el-table
                    :data="tableData"
                    style="width: 800px;height: 357px;left: 50px">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="classeName"
                        label="领用小班"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="出库人"
                        width="180">
                </el-table-column>
            </el-table>
        </template>

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
    export default {
        name: "Management",
        data() {
            return {
                form: {
                    startDate: '',
                    endDate: '',
                    className:'',
                },
                tableData:[],
                currentPage :1,
                pageSize :3,
                totalPage :0,
                dialogFormVisible:false,
                gridData: [],   //出库信息
                dialogTableVisible:false

            }
        },
        methods: {
            handleSizeChange(val) { //改变显示条数
                this.tableInfo(this.currentPage, val)
            },
            handleCurrentChange(val) {  //改变页数
                this.tableInfo(val, this.pageSize)
            },
            async query() {    //查询
                // console.log(this.form)
                let response = await axios({
                    url: '/forest_sys/deliveryrecordByCondition',
                    method: 'get',
                    params: {
                        startDate: this.form.startDate,
                        endDate: this.form.endDate,
                        className: this.form.className,
                        currentPage:this.currentPage,
                        pageSize:this.pageSize
                    }
                });

                this.tableData = this.formattingDate(response.data.list);
                this.currentPage = response.data.pageNum,
                this.pageSize = response.data.pageSize,
                this.totalPage= response.data.total
            },
            formattingDate(arr){   //格式化时间
                for (let i = 0; i < arr.length ; i++) {
                    arr[i].date = arr[i].date.substring(0,arr[i].date.indexOf(" "));
                }
                return arr;
            },
            async tableInit(currentPage = 1, pageSize = 3) {    //初始化表格
                let response = await axios({
                    url: '/forest_sys/DeliveryRecordInfo',
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
                this.totalPage= response.data.total

            }
        },
        mounted() { //挂载后，初始化
            this.tableInit(this.currentPage,this.pagesize);
        }
    }
</script>

<style scoped>
    #title {
        font-size: 28px;
        text-align: center;
        margin-bottom: 25px;
    }
    .titleSub{
        margin-right: 150px;
        display: inline;
    }

</style>