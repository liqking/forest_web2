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
            <el-dialog title="添加事件" :visible.sync="dialogFormVisible" width="800px">
                <el-form :model="form" ref="form">
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">
                            <el-form-item label="名称" prop="name" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="form.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="时间" prop="date" :label-width="formLabelWidth" style="width: 340px">
                                <!-- <el-date-picker v-model="form.date" type="date" placeholder="选择日期"> </el-date-picker> -->
                                <el-input v-model="form.date" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
                                <el-select v-model="form.state">
                                    <el-option label="已经得到控制" value="1"></el-option>
                                    <el-option label="防治中" value="2"></el-option>
                                    <el-option label="无法解决，申请专家会商" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="灾情描述" prop="describe" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="form.describe" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="发生位置" prop="areaBean" :label-width="formLabelWidth">
                                <el-select v-model="form.areaBean">
                                    <el-option v-for="item in areaList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="初步损失" prop="loss" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="form.loss" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="影响面积" prop="area" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="form.area" autocomplete="off"></el-input>
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">
                            <el-form-item label="防止方案" prop="prevention" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="form.prevention" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="灾害类型" prop="disasterType" :label-width="formLabelWidth">
                                <el-select v-model="form.disasterType">
                                    <el-option label="虫害" value="1"></el-option>
                                    <el-option label="鼠害" value="2"></el-option>
                                    <el-option label="病害" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="发现途径" prop="pathWay" :label-width="formLabelWidth">
                                <el-select v-model="form.pathWay">
                                    <el-option label="小班巡查发现" value="1"></el-option>
                                    <el-option label="公众发现" value="2"></el-option>
                                    <el-option label="上级部门通报" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="事件照片" prop="imageUrl" :label-width="formLabelWidth">
                                <el-upload class="avatar-uploader" action="forest_sys/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add(form)">确 定</el-button>
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
                            <el-button @click="updateType(scope.row)" type="text">申请会商</el-button>
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

        <!-- 查看详情 -->
        <div id="info" style="margin-left: 30px">
            <el-dialog title="事件详情" :visible.sync="eventInfo" width="800px">
                <el-form :model="eventform" ref="form">
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">
                            <el-form-item label="名称" prop="name" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="时间" prop="date" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.date" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="状态" prop="state" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.state" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="灾情描述" prop="describe" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.describe" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="发生位置" prop="areaBean" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.areaBean" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="所在小班" prop="classes" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.classes" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="初步损失" prop="loss" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.loss" autocomplete="off"></el-input>
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">
                            <el-form-item label="影响面积" prop="area" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.area" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="防止方案" prop="prevention" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.prevention" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="灾害类型" prop="disasterType" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.disasterType" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="发现途径" prop="pathWay" :label-width="formLabelWidth" style="width: 340px">
                                <el-input v-model="eventform.pathWay" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="事件照片" prop="imageUrl" :label-width="formLabelWidth" style="width: 340px">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                </el-form>
                <template style="margin-left: 80px">
                    <h1>会商纪录</h1>
                    <el-table
                            :data="eventDiscussTable"
                            style="width: 100%">
                        <el-table-column
                                prop="discussdate"
                                label="日期">
                        </el-table-column>
                        <el-table-column
                                prop="personnel"
                                label="会商人员">
                        </el-table-column>
                        <el-table-column
                                prop="resultTxt"
                                label="会商结果">
                        </el-table-column>
                    </el-table>
                </template>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="eventInfo = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 修改 -->
        <div id="info" style="margin-left: 30px">
            <el-dialog title="修改事件" :visible.sync="eventUpdate" width="800px">
                <el-form :model="updateform" ref="form">
                    <el-row>
                        <el-input v-show="false" v-model="updateform.id" autocomplete="off"></el-input>
                        <el-col :span="12"><div class="grid-content bg-purple">
                            <el-form-item label="名称" prop="name" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled  v-model="updateform.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="时间" prop="date" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled v-model="updateform.date" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="状态" prop="state" :label-width="formLabelWidth" style="width: 340px">
                                <el-select v-model="updateform.state">
                                    <el-option label="已经得到控制" value="1"></el-option>
                                    <el-option label="防治中" value="2"></el-option>
                                    <el-option label="无法解决，申请专家会商" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="灾情描述" prop="describe" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled v-model="updateform.describe" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="发生位置" prop="areaBean" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled v-model="updateform.areaBean" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="所在小班" prop="classes" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled v-model="updateform.classes" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="初步损失" prop="loss" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled v-model="updateform.loss" autocomplete="off"></el-input>
                            </el-form-item>
                        </div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">
                            <el-form-item label="影响面积" prop="area" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled v-model="updateform.area" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="防止方案" prop="prevention" :label-width="formLabelWidth" style="width: 340px">
                                <el-input  v-model="updateform.prevention" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="灾害类型" prop="disasterType" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled v-model="updateform.disasterType" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="发现途径" prop="pathWay" :label-width="formLabelWidth" style="width: 340px">
                                <el-input disabled v-model="updateform.pathWay" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="事件照片" prop="imageUrl" :label-width="formLabelWidth" style="width: 340px">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            </el-form-item>
                        </div></el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="eventUpdate = false">取 消</el-button>
                    <el-button type="primary" @click="updateEvent(updateform)">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: "Event",
        data() {
            return {
                areaList:[],
                areaClasses:'',
                updateform:{
                    id:'',
                    name:'',
                    date:'',
                    state:'',
                    describe:'',
                    areaBean:'',
                    classes:'',
                    loss:'',
                    area:'',
                    prevention:'',
                    disasterType:'',
                    pathWay:'',
                },
                eventUpdate:false,
                eventDiscussTable:[],
                eventInfo:false,
                ruleForm:{
                    name:'',
                    state:'',
                    areaName:''
                },
                form:{
                    name:'',
                    date:'',
                    state:'',
                    describe:'',
                    areaBean:'',
                    classes:'',
                    loss:'',
                    area:'',
                    prevention:'',
                    disasterType:'',
                    pathWay:'',
                },
                eventform:{
                    name:'',
                    date:'',
                    state:'',
                    describe:'',
                    areaBean:'',
                    classes:'',
                    loss:'',
                    area:'',
                    prevention:'',
                    disasterType:'',
                    pathWay:'',
                },
                imageUrl:'',
                dialogFormVisible:false,
                formLabelWidth: '120px',
                tableData:[],
            }
        },
        mounted: function() {
            this.tableInfo();
            this.getAllArea();
        },
        methods:{
            add(item){
                axios({
                    url: '/forest_sys/addEvent',
                    method: 'get',
                    params:{
                        name:item.name,
                        date : item.date,
                        state: item.state,
                        describe: item.describe,
                        areaBean: item.areaBean,
                        loss: item.loss,
                        area: item.area,
                        prevention: item.prevention,
                        disasterType: item.disasterType,
                        pathWay: item.pathWay,
                        picture : this.imageUrl,
                    }
                })
            },
            async getAllArea(){
                let response = await axios({
                    url: '/forest_sys/getAllArea',
                    method: 'get',
                })
                this.areaList = response.data
                console.log(this.areaList)
            },
            updateEvent(item){
                console.log(item)
                axios({
                    url: '/forest_sys/updateEvent',
                    method: 'get',
                    params:{
                        id: item.id,
                        state: item.state,
                        prevention: item.prevention,
                    }
                })
                this.eventUpdate = false
            },
            update(item){
                this.eventUpdate = true
                this.updateform.id = item.eventId
                this.updateform.name = item.name;
                this.updateform.date = item.date;
                this.updateform.state = item.state;
                this.updateform.describe = item.describe;
                this.updateform.areaBean = item.areaBean.name;
                this.updateform.classes = item.areaBean.classesBeans[0].name;
                this.updateform.loss = item.loss;
                this.updateform.area = item.area;
                this.updateform.prevention = item.prevention;
                if(item.disasterType == 1){
                    this.updateform.disasterType = "鼠害"
                }
                if(item.disasterType == 2){
                    this.updateform.disasterType = "病害"
                }
                if(item.disasterType == 3){
                    this.updateform.disasterType = "虫害"
                }
                if(item.disasterType == 1){
                    this.updateform.pathWay = "小班巡查发现";
                }
                if(item.disasterType == 2){
                    this.updateform.pathWay = "公众发现";
                }
                if(item.disasterType == 3){
                    this.updateform.pathWay = "上级部门通报";
                }
                this.imageUrl = item.picture;
            },
            updateType(item){
                console.log(item);
                axios({
                    url: '/forest_sys/updateEventType',
                    method: 'get',
                    params:{
                        id: item.eventId,
                        type : 1
                    }
                })
            },
            show(item){
                this.eventInfo = true
                this.eventform.name = item.name;
                this.eventform.date = item.date;
                this.eventform.state = item.state;
                this.eventform.describe = item.describe;
                this.eventform.areaBean = item.areaBean.name;
                this.eventform.classes = item.areaBean.classesBeans[0].name;
                this.eventform.loss = item.loss;
                this.eventform.area = item.area;
                this.eventform.prevention = item.prevention;
                if(item.disasterType == 1){
                    this.eventform.disasterType = "鼠害"
                }
                if(item.disasterType == 2){
                    this.eventform.disasterType = "病害"
                }
                if(item.disasterType == 3){
                    this.eventform.disasterType = "虫害"
                }
                if(item.disasterType == 1){
                    this.eventform.pathWay = "小班巡查发现";
                }
                if(item.disasterType == 2){
                    this.eventform.pathWay = "公众发现";
                }
                if(item.disasterType == 3){
                    this.eventform.pathWay = "上级部门通报";
                }
                this.imageUrl = item.picture;
                this.eventDiscussTable = item.list
                console.log(this.eventDiscussTable)
                console.log(item)
            },
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
                console.log(this.tableData)
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
                    this.$message.error('上传图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
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