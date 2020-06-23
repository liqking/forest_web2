<template>
    <div>
        <el-dialog title="添加新鼠害" :visible.sync="vis" width="50%" :before-close="dialogclose">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="食物" prop="food">
                    <el-input v-model="form.food" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="繁殖" prop="breed">
                    <el-input v-model="form.breed" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="天敌" prop="enemy">
                    <el-input v-model="form.enemy" placeholder="请输入内容"></el-input>
                </el-form-item>

                <el-form-item label="防治措施" prop="measure">
                    <el-input type="textarea" v-model="form.measure" :rows="5"
                              placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="主要危害" prop="harm"  style="margin-left: 18px" >
                    <el-input type="textarea" v-model="form.harm" :rows="5"
                              placeholder="请输入内容"></el-input>
                </el-form-item>
                <!--上传图片-->
                <el-form-item label="图片" prop="img" style="margin-left: 18px">
                    <el-input type="text" v-model="form.img"
                              placeholder=""></el-input>
                    <el-upload
                            class="upload-demo"
                            action="/forest_sys/upload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess1"
                            :file-list="fileList"
                            list-type="picture"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :before-upload="ifCanUpload">
                        <el-button size="small" type="success">上传图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

                    </el-upload>
                </el-form-item>
                <br>

            </el-form>
            <el-button type="success" @click="commitForm('form')">确认</el-button>
            <el-button type="success" @click="dialogclose">取消</el-button>
        </el-dialog>

    </div>
</template>

<script>
    import axios from 'axios'
    import qs from "qs";

    export default {

        name: "AddRats",
        props:["vis"],
        data() {
            return {

                fileList: [],

                form: {
                    name: '',
                    food: '',
                    breed: '',
                    measure: '',
                    harm: '',
                    enemy:'',
                    img:'',
                },
                rules:{
                    name:[{ required: true, message: '请输入名称', trigger: 'change' }] ,
                    food:[{ required: true, message: '请输入食物', trigger: 'change' }] ,
                    breed: [{ required: true, message: '请输入繁殖规律', trigger: 'change' }],
                    measure:[{ required: true, message: '请输入防治措施', trigger: 'change' }],
                    harm: [{ required: true, message: '请输入主要危害', trigger: 'change' }],
                    enemy:[{ required: true, message: '请输入天敌', trigger: 'change' }],
                    img:[{ required: true, message: '请选择图片', trigger: 'change' }],
                }

            }

        },

        methods: {
            clearForm() {
                this.form.name = "",
                    this.form.food="",
                    this.form.breed = "",
                    this.form.enemy = "",
                    this.form.measure = "",
                    this.form.harm = "",
                    this.form.img = "",
                    this.fileList = []

            },
            dialogclose() {
                this.$emit("closeAdd")
            },
            commitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.onSubmit()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            async onSubmit() {

                let response = await axios({
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: '/forest_sys/addRats',
                    data: qs.stringify({
                        ratsName: this.form.name,
                        ratsFood: this.form.food,
                        ratsBreed: this.form.breed,
                        ratsEnemy: this.form.enemy,
                        ratsMeasure: this.form.measure,
                        ratsHarm: this.form.harm,
                        ratsImg:this.form.img,
                    })
                });

                if(response.data>0){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogclose();
                    this.clearForm();
                    this.$emit("updateData");
                }else{
                    this.$message.error('添加失败！');
                }
            },
            //以下是上传头像的方法
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(){
                alert("只能选择一张图片")
            },
            uploadSuccess1(response, file, fileList) {
                console.log(response);
                this.form.img = response
                console.log(file);
                console.log(fileList);
            },
            ifCanUpload(file) {
                console.log(file)
                if (file.type !== "image/jpeg") {
                    console.log("只能上传image/jpeg格式的文件")
                    return false
                }
                if (file.size > 1024 * 500) {
                    console.log("文件大于500KB，无法上传")
                    return false
                }
            }
        }
    }
</script>

<style scoped>

</style>