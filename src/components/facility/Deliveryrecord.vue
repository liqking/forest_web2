<template>
    <div>
        <!--设备管理-->

        <h1 id="title">药剂/机械一览</h1>
        <!--查询-->
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="药剂名称" prop="name">
                <el-input v-model="ruleForm.name" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="防治类型" prop="genre">
                <el-select v-model="ruleForm.genre" style="width: 150px">
                    <el-option label="鼠害" value="1"></el-option>
                    <el-option label="虫害" value="2"></el-option>
                    <el-option label="病害" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类别" prop="type">
                <el-select v-model="ruleForm.type" style="width: 150px">
                    <el-option label="药剂" value="1"></el-option>
                    <el-option label="器械" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="success" plain @click="submitForm()">查询</el-button>
                <el-button type="info" plain @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <!--添加药剂/器械-->
        <div id="add" style="margin-left: 30px">
            <el-button type="success" icon="el-icon-edit" @click="dialogFormVisible = true">添加药剂</el-button>
            <el-dialog title="添加药剂/器械" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-form-item label="名称" prop="name" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="防治类型" prop="genre" :label-width="formLabelWidth">
                        <el-select v-model="form.genre">
                            <el-option label="鼠害" value="1"></el-option>
                            <el-option label="虫害" value="2"></el-option>
                            <el-option label="病害" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类别" prop="type" :label-width="formLabelWidth">
                        <el-select v-model="form.type">
                            <el-option label="药剂" value="1"></el-option>
                            <el-option label="器械" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="数量" prop="num" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.num" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="主要用途" prop="textarea" :label-width="formLabelWidth">
                        <el-input
                                type="textarea"
                                :rows="5"
                                placeholder="请输入内容"
                                v-model="form.textarea" style="width: 350px">
                        </el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!--初始化-->
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%;height: 357px">
                <el-table-column
                        prop="name"
                        label="名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="genre"
                        label="防治类型"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类别"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="purpose"
                        label="主要用途">
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
        name: "Deliveryrecord",
        data() {
            var checkNum = (rule, value, callback) => {
                //非负浮点数
                var regPos = /^\d+(\.\d+)?$/;
                //负浮点数
                var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
                setTimeout(() => {
                    if (!value) {
                        return callback(new Error('年龄不能为空'));
                    }
                    if (!(regPos.test(value) || regNeg.test(value))) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 0) {
                            callback(new Error('必须大于0'));
                        }
                        if (value.indexOf(".") > -1) {
                            callback(new Error('请输入正整数'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                tableData: [],
                currentPage: 1,
                totalPage: 0,
                pageSize: 5,

                ruleForm: {
                    name: '',
                    genre: '',
                    type: '',
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    genre: '',
                    type: '',
                    textarea: '',
                    num: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入设备名称', trigger: 'blur'},
                    ],
                    genre: [
                        {required: true, message: '请选择防治类型', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择类别', trigger: 'blur'},
                    ],
                    num: [
                        {validator: checkNum, required: true, trigger: 'blur'},
                    ],
                    textarea: [
                        {required: true, message: '请输入简要说明用途', trigger: 'blur'},
                    ]
                },
                formLabelWidth: '120px',


            }
        },
        methods: {
            async tableInfo(currentPage = 1, pageSize = 3) {
                let response = await axios({
                    url: '/forest_sys/showEquipmentInfo',
                    method: 'get',
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize
                    }
                })
                this.currentPage = response.data.pageNum;
                this.totalPage = response.data.total;
                this.pageSize = response.data.pageSize;
                let arr = response.data.list;
                this.tableData = this.filter(arr);

            },
            handleSizeChange(val) { //改变显示条数
                this.tableInfo(this.currentPage, val)
            },
            handleCurrentChange(val) {  //改变页数
                this.tableInfo(val, this.pageSize)
            },
            async submitForm() {    //查询
                let response = await axios({
                    url: '/forest_sys/equipmentByCondition',
                    method: 'get',
                    params: {
                        name: this.ruleForm.name,
                        genre: this.ruleForm.genre,
                        type: this.ruleForm.type,
                        //分页
                        currentPage: this.currentPage,
                        pageSize: this.pageSize,
                    }
                });
                console.log(response)
                this.currentPage = response.data.pageNum;
                this.pageSize = response.data.pageSize;
                this.totalPage = response.data.total;
                this.tableData = this.filter(response.data.list);


            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //提交添加
            add(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        //发送axios
                        let response = await axios({
                            url: '/forest_sys/AddEquipmentInfo',
                            method: 'get',
                            params: {
                                name: this.form.name,
                                genre: this.form.genre,
                                type: this.form.type,
                                num: this.form.num,
                                purpose: this.form.textarea
                            }
                        });
                        if (response.data > 0) {
                            this.tableInfo(this.currentPage,this.pageSize);
                            this.success();
                            this.dialogFormVisible = false;
                        } else {
                            this.error();
                        }
                    } else {
                        this.error();
                        return false;
                    }
                });
            },
            error() {
                this.$message({
                    showClose: true,
                    message: '添加失败！',
                    type: 'error'
                });
            },
            success() {
                this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                });
                this.from.name ="";
                this.from.genre ="";
                this.from.type ="";
                this.from.textarea ="";
                this.from.num ="";
            },
            filter(arr){
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].genre == 1) {
                        arr[i].genre = '鼠害'
                    }
                    if (arr[i].genre == 2) {
                        arr[i].genre = '虫害'
                    }
                    if (arr[i].genre == 3) {
                        arr[i].genre = '病害'
                    }
                    if (arr[i].type == 1) {
                        arr[i].type = '药剂'
                    }
                    if (arr[i].type == 2) {
                        arr[i].type = '器械'
                    }
                }
                return arr;
            }
        },
        mounted() {
            this.tableInfo();
        }
    }
</script>

<style scoped>
    #title{
       font-size: 28px;
        text-align: center;
        margin-bottom: 25px;
    }
</style>