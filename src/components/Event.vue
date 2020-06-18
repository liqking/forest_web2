<template>
    <div>
        <!-- 查询 -->
        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="事件名称" prop="name">
                <el-input v-model="ruleForm.name" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state" label-width="50px">
                <el-select v-model="ruleForm.state">
                    <el-option label="已经得到控制" value="1"></el-option>
                    <el-option label="防治中" value="2"></el-option>
                    <el-option label="无法解决，申请专家会商" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发生位置" prop="areaName">
                <el-input v-model="ruleForm.areaName" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" plain @click="submitForm()">查询</el-button>
                <el-button type="info" plain @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 添加 -->
        <div id="add" style="margin-left: 30px">
            <el-button type="success" icon="el-icon-edit" @click="dialogFormVisible = true">添加事件</el-button>
            <el-dialog title="添加事件" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="form">
                    <el-form-item label="名称" prop="name" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="时间" prop="date" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.date" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
                        <el-select v-model="form.state">
                            <el-option label="已经得到控制" value="1"></el-option>
                            <el-option label="防治中" value="2"></el-option>
                            <el-option label="无法解决，申请专家会商" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="灾情描述" prop="goodTree" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.goodTree" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="发生位置" prop="state" :label-width="formLabelWidth">
                        <el-select v-model="form.state">
                            <el-option label="已经得到控制" value="1"></el-option>
                            <el-option label="防治中" value="2"></el-option>
                            <el-option label="无法解决，申请专家会商" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在小班" prop="goodTree" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.goodTree" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="初步损失" prop="goodTree" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.goodTree" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="影响面积" prop="goodTree" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.goodTree" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="防止方案" prop="goodTree" :label-width="formLabelWidth" style="width: 340px">
                        <el-input v-model="form.goodTree" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="灾害类型" prop="state" :label-width="formLabelWidth">
                        <el-select v-model="form.state">
                            <el-option label="虫害" value="1"></el-option>
                            <el-option label="鼠害" value="2"></el-option>
                            <el-option label="病害" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发现途径" prop="state" :label-width="formLabelWidth">
                        <el-select v-model="form.state">
                            <el-option label="小班巡查发现" value="1"></el-option>
                            <el-option label="公众发现" value="2"></el-option>
                            <el-option label="上级部门通报" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="事件照片" prop="state" :label-width="formLabelWidth">
                        <el-upload class="avatar-uploader" action="forest_sys/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
                        label="事件名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="日期"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="areaBean.name"
                        label="发生位置"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="describe"
                        label="防治方案"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="灾情状态"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="purpose"
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <el-button @click="show(scope.row)" type="text">查看</el-button>
                            <el-button @click="update(scope.row)" type="text">编辑</el-button>
                            <el-button @click="update(scope.row)" type="text">申请会商</el-button>
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


    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: "Event",
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
                    type:'',
                    imageUrl:''
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
            async tableInfo() {
                let response = await axios({
                    url: '/forest_sys/getAllEvent',
                    method: 'get',
                })
                this.tableData = response.data;
                this.tableData.forEach(element => {
                    if(element.state == 1){
                        element.state = "已经得到控制"
                    }
                    if(element.state == 2){
                        element.state = "防治中"
                    }
                    if(element.state == 3){
                        element.state = "无法解决，申请专家会商"
                    }
                });
                console.log(response.data);
            },
            async submitForm() {    //查询
                let response = await axios({
                    url: '/forest_sys/getEventItem',
                    method: 'get',
                    params: {
                        name: this.ruleForm.name,
                        state: this.ruleForm.state,
                        areaName: this.ruleForm.areaName,
                    }
                });
                this.tableData = response.data;
                this.tableData.forEach(element => {
                    if(element.state == 1){
                        element.state = "已经得到控制"
                    }
                    if(element.state == 2){
                        element.state = "防治中"
                    }
                    if(element.state == 3){
                        element.state = "无法解决，申请专家会商"
                    }
                });
                console.log(response.data);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res) {
                this.imageUrl = "/forest_sys"+res;
                console.log(this.imageUrl)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>