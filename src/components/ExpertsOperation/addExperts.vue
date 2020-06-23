<template>
    <div>
       <!-- <el-button type="text" @click="dialogFormVisible = true"></el-button>-->

        <el-dialog title="添加专家" :visible.sync="openadd" :before-close="dialogClose">
            <el-form
                    :model="form"
                    :rules="rules"
                    ref="form">
                <!--右边-->
                <div class="left1">
                    <el-form-item label="姓名" :label-width="formLabelWidth" prop="expertsName">
                        <el-input @change="selectName" v-model="form.expertsName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" :label-width="formLabelWidth" prop="date">
                        <div class="block">
                           <!-- <span class="demonstration">默认</span>-->
                            <el-date-picker
                                    v-model="form.date"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="专长" :label-width="formLabelWidth" prop="specialties">
                        <el-select v-model="form.specialties" placeholder="请选择擅长领域">
                            <el-option label="虫害防治" value="1"></el-option>
                            <el-option label="病害防治" value="2"></el-option>
                            <el-option label="鼠害防治" value="3"></el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="form.telephone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="通讯地址" :label-width="formLabelWidth">
                        <el-input v-model="form.site" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" :label-width="formLabelWidth">
                        <el-radio v-model="form.sex" label="男">男</el-radio>
                        <el-radio v-model="form.sex" label="女">女</el-radio>
                    </el-form-item>

                </div>
                <!--左边-->
                <div class="right1">
                    <el-form-item label="照片" :label-width="formLabelWidth">
                        <!--头像上传-->
                        <el-upload
                                class="avatar-uploader "
                                action="forest_sys/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.head" :src="form.head" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="职务" :label-width="formLabelWidth">
                        <el-input v-model="form.duty" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工作单位" :label-width="formLabelWidth">
                        <el-input v-model="form.work" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input v-model="form.mailbox" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <!--  dialogFormVisible = false-->
                <el-button @click="$emit('update:openadd',false)">取 消</el-button>
                <el-button type="primary" @click="submitEdit('form');">添 加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    import {mapState,mapActions} from 'vuex';
    export default {
        name: "addExperts",
        props:["openadd"],
        computed: {
            ...mapState('Experts', ["pageNumber","number","search"])
        },
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    expertsName: '',
                    date: '',
                    //专长
                    specialties:'',
                    //通讯地址
                    site: '',
                    //职务
                    duty: '',
                    sex:'男',
                    telephone:'',
                    head: '',
                    work:'',
                    //邮箱
                    mailbox:'',
                    delivery: false,
                },
                formLabelWidth: '80px',
                rules: {
                    expertsName: [
                        {required: true, message: '请输入姓名'}
                    ],
                    specialties: [
                        { required: true, message: '请选择擅长领域', trigger: 'change' }
                    ],
                    date: [
                        { required: true, message: '选择出生日期', trigger: 'change' }
                        ]

                }
            };
        },
        methods: {
            ...mapActions('Experts',["setExperts"]),
          async  selectName(){
                //验证名字
                console.log(21);

                let response = await axios({
                    url:'/forest_sys/queryName',
                    method:'get',
                    params:{
                        expertsName:this.form.expertsName
                    }
                });
                console.log(response)
                if (response.data=="1"){
                    this.$message({
                        message: '该专家已经存在请重新输入',
                        type: 'warning'
                    });
                    this.form.expertsName="";
                }





            },
            submitEdit(form){
                console.log(this.$refs[form]);
                this.$emit('update:openadd',false);
                //添加

                this.$refs[form].validate(async (valid) => {
                    if (valid) {


                        let response = await  axios({

                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            url:'/forest_sys/addExperts',
                            method:'post',
                            data:qs.stringify({
                                expertsName:this.form.expertsName,
                                date:this.form.date,
                                sex:this.form.sex,
                                specialties:this.form.specialties,
                                telephone:this.form.telephone,
                                site:this.form.site,
                                duty:this.form.duty,
                                work:this.form.work,
                                mailbox:this.form.mailbox,
                                head:this.form.head
                            })
                        }).then(()=>{

                            this.setExperts({
                                currentpage:this.pageNumber
                                ,pagesize:this.number,
                                name:this.search.name,
                                specialties:this.search.specialties,
                                work:this.search.work
                            });
                            console.log(response);
                            this.$message({
                                message: '添加成功成功',
                                type: 'success'
                            });

                        })





                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });






            },
            dialogClose(){
                this.$emit('update:openadd',false)
            },
            handleAvatarSuccess(res, file) {
                console.log(res);
                this.form.head="/forest_sys"+res;
              //  this.form.head = URL.createObjectURL(file.raw);
                console.log(file);
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
    .left1{
        width: 50%;
        float: left;
    }
    .right1{
        width: 50%;
        float: right;
    }
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
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
    .avatar {
        width: 150px;
        height: 150px;
        display: block;
    }
</style>