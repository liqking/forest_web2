<template>
    <div>
        <template>
            <el-table
                    :data="expertsTalks.list"
                    style="width: 100%"
            >
                <el-table-column
                        prop="name"
                        label="事件名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="areaBean.name"
                        label="发生位置">
                </el-table-column>
                <el-table-column
                        prop="prevention"
                        label="防治方案">
                </el-table-column>
                <el-table-column
                        width="200"
                        prop=""
                        label="灾情状态" >
                    <!--state-->无法解决,申请会商
                </el-table-column>
                <el-table-column label="操作" width="240">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="mini"
                                @click="handleEdit( scope.row)">会商
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--会商弹框-->
        <el-dialog
                title="专家会商"
                :visible.sync="dialogVisible"
                width="50%"

                :before-close="handleClose">
            <el-form :model="eventBean">
                <!--右边-->
                <div class="left1">
                    <el-form-item label="事件名称:" :label-width="formLabelWidth">
                        {{eventBean.name}}
                    </el-form-item>
                    <el-form-item label="时间:" :label-width="formLabelWidth">
                        {{eventBean.date}}
                    </el-form-item>
                    <el-form-item label="发生位置:" :label-width="formLabelWidth" v-if="eventBean.areaBean">
                     {{eventBean.areaBean.name}}
                    </el-form-item>
                    <el-form-item label="灾情描述:" :label-width="formLabelWidth">
                        {{eventBean.describe}}
                    </el-form-item>




                </div>
                <!--左边-->
                <div class="right1">
                    <el-form-item label="灾区图片:" :label-width="formLabelWidth">
                        <img v-if="eventBean.picture" :src="eventBean.picture" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-form-item>
                    <el-form-item label="影响面积:" :label-width="formLabelWidth">
                        {{eventBean.area}}
                    </el-form-item>

                </div>
            </el-form>
            <el-form :model="ruleForm">

            <el-form-item label="会商结果:">
                <el-input type="textarea" v-model="ruleForm.txt" style="width: 200px;"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--穿梭框-->
                <el-button type="success" plain @click="dialogVisibles = true;" style="z-index:12;">添加会商专家</el-button>

                <el-button @click="goBack">返 回</el-button>
                <el-button type="primary" @click="add">添加会商信息</el-button>
            </div>
            <!--会谈结果显示-->
            <div>
                <el-table
                        :data="eventBean.list"
                        style="width: 100%"
                >
                    <el-table-column
                            prop="discussdate"
                            label="日期"
                            width="180">
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


            </div>
        </el-dialog>


        <!--添加会商专家-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisibles"
                width="50%"
        >
            <el-transfer v-model="value" :data="expertsList" :titles="['专家', '已选择']"></el-transfer>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisibles = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisibles = false">确 定</el-button>
                      </span>
        </el-dialog>


        <template>
            <!--分页-->
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[2,4,6]"
                        :page-size="size"
                        layout="total, prev, pager, next,sizes"
                        :total="expertsTalks.total">
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import axios from 'axios'

    export default {
        name: "ExpertsTalks",
        data() {

            return {

                value: [],
                ruleForm: {
                    txt: ''
                },
                formLabelWidth: '80px',
                dialogVisible: false,
                dialogVisibles: false,
                size: 4,
                pageNumber:1
            }
        },
        computed: {
            ...mapState('Experts', ["expertsTalks", "eventBean","expertsList"])
        },
        created() {
            this.setExpertsTalksPage({currentpage: this.pageNumber, pagesize: this.size});

        },
        methods: {
            ...mapActions('Experts', ["setExpertsTalksPage", "setEventBean","setExpertsList"]),
            handleEdit(row) {
                /*会商*/
                this.setEventBean(row.eventId);

                this.setExpertsList(row.disasterType);
                this.dialogVisible = true;
                console.log(row.disasterType);

            },
            handleSizeChange(val) {
                this.size = val;
                this.setExpertsTalksPage({currentpage: this.pageNumber, pagesize: val});
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNumber=val;
                this.setExpertsTalksPage({currentpage: val, pagesize: this.size});
                console.log(`当前页: ${val}`);
            },
            handleClose() {
                this.dialogVisible = false;
            },
            goBack(){
                //返回，并刷新专家要商谈的事件
                this.dialogVisible = false;
                this.setExpertsTalksPage({currentpage: this.pageNumber, pagesize: this.size});
            },
           async add(){
               if(this.value.length==0){
                   this.$message({
                       message: '请选择参会专家',
                       type: 'success'
                   });
               }else{
                  // 获得专家的名字
                 var expNames="";
                 console.log(this.value)
                   console.log(this.expertsList)
                   for(let i of this.value){
                       for(let ele of this.expertsList) {
                           if (i==ele.key){
                               expNames+=ele.label+",";
                           }

                       }
                   }
                   console.log(expNames);
                   //发送添加请求
                   let response = await axios({
                       url:'/forest_sys/addTalks',
                       method:'get',
                       params:{
                            expNames:expNames,
                           experts:this.value.toString(),
                           talksTxt:this.ruleForm.txt,
                             expertsId:this.eventBean.eventId
                       }
                   });
                  console.log( response.data);
                 //将页面数据设置为空， 刷新当前页面
                  this.value=[];
                  this.ruleForm.txt='';
                   this.setEventBean(this.eventBean.eventId);

               }
            }
        }
    }
</script>

<style scoped>
    .left1 {
        width: 50%;
        float: left;
    }

    .right1 {
        width: 50%;
        float: right;
        margin-bottom: 30px;
    }

    div.demo .el-transfer {
        width: 100px;
        height: 80px;
    }
    .avatar{
        width: 150px;
        height: 150px;
        display: block;
    }

</style>