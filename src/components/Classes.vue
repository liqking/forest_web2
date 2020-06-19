<template>
    <div>
        <!-- 查询 -->
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="小班名称" prop="name">
                <el-input v-model="ruleForm.name" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="负责区域" prop="areaName">
                <el-input v-model="ruleForm.areaName" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" plain @click="submitForm()">查询</el-button>
                <el-button type="info" plain @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 添加 -->
        <div id="add" style="margin-left: 30px">
            <el-button type="success" icon="el-icon-edit" @click="dialogFormVisible = true">添加小班</el-button>
            <el-dialog title="添加小班" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="form">
                    <el-form-item label="名称" prop="name" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" prop="person" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.person" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话" prop="phone" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="人员数量" prop="num" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.num" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="负责区域" prop="classes" :label-width="formLabelWidth" style="width: 340px">
                        <el-select v-model="form.areaId">
                            <el-option v-for="item in areas" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
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
                        label="小班名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="person"
                        label="负责人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="负责人电话"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="areaBean.name"
                        label="负责区域"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="purpose"
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <el-button @click="show(scope.row)" type="text">查看</el-button>
                            <el-button @click="update(scope.row)" type="text">编辑</el-button>
                        </template>
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

        <!-- 查看小班详情 -->
        <div id="add" style="margin-left: 30px">
            <el-dialog title="查看小班信息" :visible.sync="classesInfo" width="800px">
                <el-form :model="classesform" ref="form">
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">
                            <el-form-item label="名称" prop="name" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesform.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="负责人" prop="person" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesform.person" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="负责人电话" prop="phone" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesform.phone" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="人员数量" prop="num" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesform.num" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="负责区域" prop="area" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesform.area" autocomplete="off"></el-input>
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">
                            <el-form-item label="林种" prop="tree" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesform.tree" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="地类" prop="type" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesform.type" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="优势林种" prop="goodTree" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesform.goodTree" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="创建时间" prop="creat" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesform.creat" autocomplete="off"></el-input>
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="classesInfo = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 修改小班 -->
        <div id="add" style="margin-left: 30px">
            <el-dialog title="查看小班信息" :visible.sync="classesupdate" width="800px">
                <el-form :model="classesupdateform" ref="form">
                    <el-input v-show="false" v-model="classesupdateform.id" autocomplete="off"></el-input>
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">
                            <el-form-item label="名称" prop="name" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled="true" v-model="classesupdateform.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="负责人" prop="person" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesupdateform.person" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="负责人电话" prop="phone" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="classesupdateform.phone" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="人员数量" prop="num" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled="true" v-model="classesupdateform.num" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="负责区域" prop="area" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled="true" v-model="classesupdateform.area" autocomplete="off"></el-input>
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">
                            <el-form-item label="林种" prop="tree" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled="true" v-model="classesupdateform.tree" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="地类" prop="type" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled="true" v-model="classesupdateform.type" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="优势林种" prop="goodTree" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled="true" v-model="classesupdateform.goodTree" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="创建时间" prop="creat" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled="true" v-model="classesupdateform.creat" autocomplete="off"></el-input>
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="classesupdate = false">取 消</el-button>
                    <el-button type="primary" @click="updateClass('classesupdateform')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import axios from "axios";
    export default {
        name: "Classes",
        data() {
            return {
                classesupdate:false,
                classesInfo:false,
                ruleForm:{
                    name:'',
                    areaName:'',
                },
                form:{
                    name:'',
                    person:'',
                    phone:'',
                    num:'',
                    areaId:''
                },
                classesform:{
                    name:'',
                    person:'',
                    phone:'',
                    num:'',
                    area:'',
                    tree:'',
                    type:'',
                    goodTree:'',
                    creat:''
                },
                classesupdateform:{
                    id:'',
                    name:'',
                    person:'',
                    phone:'',
                    num:'',
                    area:'',
                    tree:'',
                    type:'',
                    goodTree:'',
                    creat:''
                },
                areas:"",
                dialogFormVisible:false,
                formLabelWidth: '120px',
                tableData:[],
            }
        },
        mounted: function() {
            this.tableInfo();
            this.getArea();
        },
        methods:{
            updateClass(){
                axios({
                    url: '/forest_sys/updateClasses',
                    method: 'get',
                    params: {
                        id:this.classesupdateform.id,
                        person:this.classesupdateform.person,
                        phone:this.classesupdateform.phone,
                    }
                })
                this.classesupdate = false
            },
            add(){
                axios({
                    url: '/forest_sys/addClasses',
                    method: 'get',
                    params: {
                        name:this.form.name,
                        person:this.form.person,
                        phone:this.form.phone,
                        num:this.form.num,
                        areaId:this.form.areaId
                    }
                })
                this.dialogFormVisible = false
            }, 
            async getArea(){
                let response = await axios({
                    method: "get",
                    url: "/forest_sys/getAllArea",
                });
                this.areas = response.data;
                console.log(this.areas);
            },
            // 初始化表格
            async tableInfo() {
                let response = await axios({
                    url: '/forest_sys/getAllClasses',
                    method: 'get',
                })
                this.tableData = response.data;
                console.log(response.data);
            },
            async submitForm() {    //查询
                let response = await axios({
                    url: '/forest_sys/getClassesItem',
                    method: 'get',
                    params: {
                        name: this.ruleForm.name,
                        area: this.ruleForm.areaName,
                    }
                });
                console.log(response);
                this.tableData =  response.data;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            show(item){
                this.classesInfo = true;
                console.log(item)
                this.classesform.name = item.name
                this.classesform.person = item.person
                this.classesform.phone = item.phone
                this.classesform.num = item.num
                this.classesform.area = item.areaBean.name
                this.classesform.tree = item.areaBean.tree
                this.classesform.goodTree = item.areaBean.goodTree
                this.classesform.creat = item.creat
                if(item.areaBean.type == 1){
                    this.classesform.type = "林地"
                }
                if(item.areaBean.type == 2){
                    this.classesform.type = "疏林地"
                }
                if(item.areaBean.type == 3){
                    this.classesform.type = "灌木林"
                }
                if(item.areaBean.type == 4){
                    this.classesform.type = "苗圃地"
                }
            },
            update(item){
                this.classesupdate = true
                this.classesupdateform.id = item.classId
                this.classesupdateform.name = item.name
                this.classesupdateform.person = item.person
                this.classesupdateform.phone = item.phone
                this.classesupdateform.num = item.num
                this.classesupdateform.area = item.areaBean.name
                this.classesupdateform.tree = item.areaBean.tree
                this.classesupdateform.goodTree = item.areaBean.goodTree
                this.classesupdateform.creat = item.creat
                if(item.areaBean.type == 1){
                    this.classesupdateform.type = "林地"
                }
                if(item.areaBean.type == 2){
                    this.classesupdateform.type = "疏林地"
                }
                if(item.areaBean.type == 3){
                    this.classesupdateform.type = "灌木林"
                }
                if(item.areaBean.type == 4){
                    this.classesupdateform.type = "苗圃地"
                }
                console.log(item)

            }
        }
    }
</script>

<style scoped>

</style>