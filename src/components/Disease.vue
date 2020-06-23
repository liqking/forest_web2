<template>
    <div>
        <h1>病害一览</h1>
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
            <el-form-item label="病害名称">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="form.condition1"
                        class="myinput"
                ></el-input>
            </el-form-item>
            <el-form-item label="发病症状">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="form.condition2"
                        class="myinput"
                ></el-input>
            </el-form-item>
            <el-form-item class="myBtn" style="margin-left: 30px">
                <el-button type="success" plain icon="el-icon-plus" @click="showDiseaseData">查询</el-button>
            </el-form-item>
        </el-form>

        <el-button type="success" icon="el-icon-plus" @click="setAdd">添加新病害</el-button>
        <el-button type="success" icon="el-icon-info" @click="setDetail">查看详细信息</el-button>
        <br>
        <br>
        <el-table :data="diseaseData" height="350" border style="width: 100%"
                  @row-click="rowClick" :cell-style="rowStyleChange">
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column prop="harm" label="主要危害" width="180"></el-table-column>
            <el-table-column prop="pattern" label="发病症状"></el-table-column>
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

        <AddDisease :vis="addIsVisbale" @closeAdd="setAddClose" @updateData="showDiseaseData"></AddDisease>

        <DiseaseDetail :selectedDetail="selectedRow" :detailVisble="detailIsVisible" @closeDetail="setDetailClose"></DiseaseDetail>
    </div>
</template>

<script>
    import AddDisease from './AddDisease'
    import axios from 'axios'
    import DiseaseDetail from './DiseaseDetail'
    // import qs from 'qs'

    export default {
        components: {
            AddDisease,
            DiseaseDetail
        },
        data() {
            return {
                selectedRow:{},

                addIsVisbale:false,
                detailIsVisible:false,
                diseaseData: [],
                pageSize: 5,
                total: 0,
                currentPage: 1,
                form: {
                    condition1: "",
                    condition2: ""
                },
            };
        },
        methods: {
            setDetail(){

                if(this.selectedRow.id!=null){
                    this.detailIsVisible=true;
                }else {
                    alert("请先选择一行")
                }

            },
            setDetailClose(){
                this.detailIsVisible=false;
            },
            rowClick(row){
                this.selectedRow=row;

            },
            rowStyleChange({row}){

                if(this.selectedRow.id==row.id){
                    return "backgroundColor: #d5ff7e"
                }

            },
            setAdd(){
                this.addIsVisbale=true;
            },
            setAddClose(){
                this.addIsVisbale=false;
            },
            async showDiseaseData() {
                let response = await axios({
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    url: '/forest_sys/searchDisease',
                    method: "post",
                    // data: qs.stringify({
                    //     curPage: this.currentPage,
                    //     pageSize: this.pageSize,
                    //     condition_name: this.form.condition1,
                    //     condition_host: this.form.condition2
                    // })
                    params: {
                        curPage: this.currentPage,
                        pageSize: this.pageSize,
                        condition_Name: this.form.condition1,
                        condition_Host: this.form.condition2
                    }
                });

                this.currentPage = response.data.pageNum
                this.total = response.data.total;
                this.pageSize = response.data.pageSize;
                this.diseaseData = response.data.list;


            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.showDiseaseData()
            },
            handleCurrentChange(val) {

                this.currentPage = val
                this.showDiseaseData()
            },

        },
        mounted: function () {
            this.showDiseaseData();

        }

    };
</script>

<style scoped>

</style>