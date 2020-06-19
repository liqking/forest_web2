<template>
    <div>
        <h1>虫害一览</h1>
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
            <el-form-item label="害虫名">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="form.input1"
                        class="myinput"
                ></el-input>
            </el-form-item>
            <el-form-item label="寄主">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="form.input2"
                        class="myinput"
                ></el-input>
            </el-form-item>
            <el-form-item class="myBtn" style="margin-left: 30px">
                <el-button type="success" icon="el-icon-plus" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>

        <el-button type="success" icon="el-icon-plus" @click="handleAdd">添加新虫害</el-button>
        <el-button type="success" icon="el-icon-info">查看详细信息</el-button>
        <br>
        <br>
        <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column prop="host" label="宿主" width="180"></el-table-column>
            <el-table-column prop="harm" label="主要危害"></el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[5, 15, 20, 25]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="total"
        ></el-pagination>

        <AddPest></AddPest>


    </div>
</template>

<script>
    import axios from 'axios'
    import AddPest from './AddPest.vue'
    import {mapMutations} from 'vuex'

    export default {
        components: {
            AddPest
        },
        data() {
            return {
                pageSize: 5,
                total: 0,
                currentPage: 1,
                form: {
                    input1: "",
                    input2: ""
                },
                tableData: [],

            };
        },
        methods: {
            handleAdd(){
                this.setVis(true);
            },
            ...mapMutations('Pest', ['setVis']),
            async showData() {

                let response = await axios({
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    url: "/forest_sys/showPest",
                    method: "post",
                    params: {
                        curPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                });
                this.total = response.data.total
                this.pageSize = response.data.pageSize
                this.tableData = response.data.list
                //   this.pages.isLastPage=response.data.isLastPage;

            },
            onSubmit() {
                console.log("submit!");
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.showData();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.showData();
            }
        },
        mounted: function () {
            this.showData()
            // this.$on("showTable",this.showData())

        }
    };
</script>

<style>
    h1 {
        font-size: 28px;
        text-align: center;
        margin-bottom: 25px;
    }

    .myinput {
        width: 150px;
    }
</style>