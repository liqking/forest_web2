<template>
    <div>
        <el-dialog title="添加新病害" :visible.sync="vis" width="50%" :before-close="dialogclose">
            <el-form ref="form" :model="form" label-width="80px" :inline="true">
                <el-form-item label="名称">
                    <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="病原">
                    <el-input v-model="form.cause" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="发病症状">
                    <el-input v-model="form.symptom" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="发病规律">
                    <el-input v-model="form.pattern" placeholder="请输入内容"></el-input>
                </el-form-item>

                <el-form-item label="防治措施">
                    <el-input type="textarea" v-model="form.measure" :rows="5"
                              placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="主要危害" style="margin-left: 18px">
                    <el-input type="textarea" v-model="form.harm" :rows="5"
                              placeholder="请输入内容"></el-input>
                </el-form-item>
                <!--上传图片-->
                <el-form-item label="图片" style="margin-left: 18px">
                    <el-input type="text" v-model="form.img"
                              placeholder=""></el-input>
                    <el-upload
                            class="upload-demo"
                            action="/forest_sys/upload"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess2"
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
            <el-button type="success" @click="onSubmit">确认</el-button>
            <el-button type="success" @click="dialogclose">取消</el-button>
        </el-dialog>

    </div>
</template>

<script>
    import axios from 'axios'
    import qs from "qs";

    export default {

        name: "AddDisease",
        props:["vis"],
        data() {
            return {

                fileList: [],

                form: {
                    name: '',
                    cause: '',
                    symptom: '',
                    measure: '',
                    harm: '',
                    pattern:'',
                    img:'',
                },


            }

        },

        methods: {
            clearForm() {
                this.form.name = "",
                    this.form.cause = "",
                    this.form.pattern = "",

                    this.form.measure = "",
                    this.form.harm = "",
                    this.form.symptom = "",
                    this.form.img = "",
                    this.fileList = []

            },
            dialogclose() {
                this.$emit("closeAdd")
            },
            async onSubmit() {

                let response = await axios({
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "post",
                    url: '/forest_sys/addDisease',
                    data: qs.stringify({
                        diseaseName: this.form.name,
                        diseaseCause: this.form.cause,
                        diseaseSymptom: this.form.symptom,
                        diseasePattern: this.form.pattern,
                        diseaseMeasure: this.form.measure,
                        diseaseHarm: this.form.harm,
                        diseaseImg:this.form.img
                    })
                });

                if(response.data>0){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogclose();
                    this.clearForm();
                    this.$emit("updateData")
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
            uploadSuccess2(response, file, fileList) {
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