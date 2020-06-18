<template>
    <div>

        <!-- 查询 -->
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="区域名称" prop="name">
                <el-input v-model="ruleForm.name" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="林种" prop="tree">
                <el-input v-model="ruleForm.tree" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="负责小班" prop="classes">
                <el-input v-model="ruleForm.classes" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" plain @click="submitForm()">查询</el-button>
                <el-button type="info" plain @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 添加 -->
        <div id="add" style="margin-left: 30px">
            <el-button type="success" icon="el-icon-edit" @click="dialogFormVisible = true">添加区域</el-button>
            <el-dialog title="添加区域" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="form">
                    <el-form-item label="名称" prop="name" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="林种" prop="tree" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.tree" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="优势林种" prop="goodTree" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.goodTree" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地类" prop="type" :label-width="formLabelWidth" style="width: 340px">
                        <el-select v-model="form.type">
                            <el-option label="林地" value="1"></el-option>
                            <el-option label="疏木林" value="2"></el-option>
                            <el-option label="灌木林" value="3"></el-option>
                            <el-option label="苗圃地" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 表格显示 -->
        <template style="margin-left: 30px">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="区域名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="tree"
                        label="林种"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="地类"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="goodTree"
                        label="优势树种"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="classesBeans[0].name"
                        label="负责小班"
                        width="180">
                </el-table-column>
            </el-table>
        </template>

        <!-- <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page=currentPage
                    :page-sizes="[3, 5, 10]"
                    :page-size=pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=totalPage>
            </el-pagination>
        </div> -->


    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: "Area",
        data() {
            return {
                ruleForm:{
                    name:'',
                    tree:'',
                    classes:''
                },
                form:{
                    name:'',
                    tree:'',
                    goodTree:'',
                    type:''
                },
                dialogFormVisible:false,
                formLabelWidth: '120px',
                tableData:[],
            }
        },
        mounted: function() {
            this.tableInfo();
        },

        methods:{
            // 添加区域
            add(){
                axios({
                    url: '/forest_sys/addArea',
                    method: 'get',
                    params: {
                        name: this.form.name,
                        tree: this.form.tree,
                        goodTree: this.form.goodTree,
                        type: this.form.type,
                    }
                })
                this.dialogFormVisible = false
            }, 
            // 初始化表格
            async tableInfo() {
                let response = await axios({
                    url: '/forest_sys/getAllArea',
                    method: 'get',
                })
                this.tableData = response.data;
                this.tableData.forEach(element => {
                    if(element.type == 1){
                        element.type = "林地"
                    }
                    if(element.type == 2){
                        element.type = "疏林地"
                    }
                    if(element.type == 3){
                        element.type = "灌木林"
                    }
                    if(element.type == 4){
                        element.type = "苗圃地"
                    }
                });
                console.log(response.data);
            },
            async submitForm() {    //查询
                let response = await axios({
                    url: '/forest_sys/getAreaItem',
                    method: 'get',
                    params: {
                        name: this.ruleForm.name,
                        tree: this.ruleForm.tree,
                        classes: this.ruleForm.classes,
                    }
                });
                this.tableData = response.data
                console.log(response)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            
        }
    }
</script>

<style scoped>

</style>